import MembershipComponent from "@/components/membership";
function Page() {
  return (
    <div className=" flex flex-col md:flex-row gap-5 items-center justify-center lg:h-96 my-3">
      <MembershipComponent membership="FREE" />
      <MembershipComponent membership="ADVANCED" />
      <MembershipComponent membership="PREMIUM" />
    </div>
  );
}
export default Page;
