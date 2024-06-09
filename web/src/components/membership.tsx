"use client";
import { Button, Card } from "react-bootstrap";
import { useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import { axiosInstance } from "@/axios/axios";
import Swal from "sweetalert2";
interface MembershipProps {
  membership: string;
}
interface User {
  email: string;
  name: string;
  membership: string;
}
interface RootState {
  auth: User;
}
const MembershipComponent: React.FC<MembershipProps> = ({ membership }) => {
  const userSelector = useSelector((state: RootState) => state.auth);
  let color = "";
  let availability = "";
  let isButtonDisabled = false;
  if (membership === "FREE") {
    color = "text-success";
    availability = "3";
    isButtonDisabled = true;
  } else if (membership === "ADVANCED") {
    color = "text-warning";
    availability = "10";
    userSelector.membership !== "free" ? (isButtonDisabled = true) : "";
  } else {
    color = "text-danger";
    availability = "Unlimited";
    userSelector.membership === "premium" ? (isButtonDisabled = true) : "";
  }
  const router = useRouter();
  const changeMembership = (membershipChange: string) => {
    axiosInstance()
      .patch("/user/v1", { membershipChange })
      .then((res) => {
        Swal.fire({
          title: "Success!",
          text: res.data.message,
          icon: "success",
          timer: 3000,
          showConfirmButton: false,
        });
      })
      .catch((err) => console.log(err))
      .finally(() => router.push("/"));
  };
  return (
    <Card style={{ width: "18rem" }} className="text-center">
      <Card.Header>
        <Card.Title className={` my-3 ${color}`}>{membership}</Card.Title>
      </Card.Header>
      <Card.Body>
        <Card.Text>Available Articles : {availability}</Card.Text>
        <Card.Text>Available Videos : {availability}</Card.Text>
      </Card.Body>
      <Card.Footer>
        <div className="d-flex justify-content-center">
          <Button
            variant="primary"
            disabled={isButtonDisabled}
            onClick={() => changeMembership(membership.toLowerCase())}
          >
            Upgrade
          </Button>
        </div>
      </Card.Footer>
    </Card>
  );
};
export default MembershipComponent;
