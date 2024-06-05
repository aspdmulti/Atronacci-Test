"use client";
import { useFormik } from "formik";
import { useRouter } from "next/navigation";
import * as Yup from "yup";
import Swal from "sweetalert2";
import { axiosInstance } from "@/axios/axios";
import YupPassword from "yup-password";
import Toast from "react-bootstrap/Toast";
import { useEffect, useState } from "react";
import Link from "next/link";

function Page() {
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const router = useRouter();
  const initialValues = {
    email: "",
    name: "",
    password: "",
    confirmPassword: "",
  };

  YupPassword(Yup);

  const inputFormik = () => {
    formik.setValues({
      email: (document.getElementById("email") as HTMLInputElement).value,
      name: (document.getElementById("name") as HTMLInputElement).value,
      password: (document.getElementById("password") as HTMLInputElement).value,
      confirmPassword: (
        document.getElementById("confirmPassword") as HTMLInputElement
      ).value,
    });
  };
  const formik = useFormik({
    initialValues,
    validationSchema: Yup.object().shape({
      email: Yup.string().required().email(),
      name: Yup.string().required().min(4),
      password: Yup.string().min(5).minNumbers(1).required().minUppercase(1),
      confirmPassword: Yup.string()
        .required()
        .oneOf([Yup.ref("password")], "password does not match"),
    }),
    async onSubmit(values) {
      try {
        const { email, name, password } = values;
        const res = await axiosInstance().post("/user/", {
          email,
          name,
          password,
        });
        Swal.fire({
          title: "Success!",
          text: res.data.message,
          icon: "success",
          timer: 3000,
          showConfirmButton: false,
        }).then(function () {
          router.push("/auth/login");
        });
      } catch (error: any) {
        setToastMessage(error.response?.data?.message || "An error occurred");
        setShowToast(true);
      }
    },
  });
  useEffect(() => {
    const { email, password, confirmPassword, name } = formik.values;
    if (email && password && confirmPassword && name) formik.handleSubmit();
  }, [formik.values]);
  return (
    <div
      className="flex justify-center items-center min-h-screen 
       text-sm"
    >
      <form>
        <div className="flex flex-col w-96 max-w-screen">
          <h1 className=" text-3xl font-semibold">Register</h1>
          <div className=" font-bold mt-5">Name</div>
          <input
            className=" p-3 bg-[#F3F4F6] rounded-lg "
            id="name"
            type="text"
          ></input>
          <small className="text-red-600">{formik.errors.name}</small>
          <div className=" font-bold mt-5">Email</div>
          <input
            className=" p-3 bg-[#F3F4F6] rounded-lg "
            id="email"
            type="email"
          ></input>
          <small className=" text-red-600">{formik.errors.email}</small>
          <div className=" font-bold mt-5">Password</div>
          <input
            className=" p-3 bg-[#F3F4F6] rounded-lg "
            id="password"
            type="password"
          ></input>
          <small className=" text-red-600">{formik.errors.password}</small>
          <div className=" font-bold mt-5">Confirm Password</div>
          <input
            className=" p-3 bg-[#F3F4F6] rounded-lg "
            id="confirmPassword"
            type="password"
          ></input>
          <small className=" text-red-600">
            {formik.errors.confirmPassword}
          </small>
          <div className=" mt-4 text-xs ">
            Have an account?{" "}
            <Link href="/auth/login" className="text-[#4F46E5] font-bold">
              Login
            </Link>
          </div>
          <button
            type="button"
            className="  rounded my-2 text-white bg-rose-500 hover:bg-rose-700 py-3 font-bold"
            onClick={inputFormik}
          >
            <i className="bi bi-file-text mr-2"></i>
            Register
          </button>
        </div>
      </form>
    </div>
  );
}
export default Page;
