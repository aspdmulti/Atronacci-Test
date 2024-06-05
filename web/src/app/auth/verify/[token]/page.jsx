"use client";
import { axiosInstance } from "@/axios/axios";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import Swal from "sweetalert2";

function Page({ params }) {
  const router = useRouter();
  useEffect(() => {
    const updateUser = async () => {
      try {
        const res = await axiosInstance().patch(
          "/user",
          {},
          {
            headers: {
              Authorization: params.token,
            },
          }
        );
        Swal.fire({
          title: "Success!",
          text: res.data.message,
          icon: "success",
          timer: 3000,
          showConfirmButton: false,
        });
      } catch (error) {
        Swal.fire({
          title: "Error!",
          text: error?.response?.data?.message,
          icon: "error",
          timer: 3000,
          showConfirmButton: false,
        });
      } finally {
        router.push("/auth/login");
      }
    };

    updateUser();
  }, [params.token, router]);

  return <></>;
}
export default Page;
