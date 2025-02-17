/** @format */
"use client";
import { userLogin } from "@/redux/middleware/user";
import Link from "next/link";
import { useDispatch } from "react-redux";
import {
  signInWithFb,
  signInWithGoogle,
} from "../../../redux/middleware/social";
import { store } from "@/redux/store";
interface UserLoginPayload {
  email: string;
  password: string;
  name: string;
  social: string;
}
type AppDispatch = typeof store.dispatch;
function Page() {
  const dispatch: AppDispatch = useDispatch();
  const login = () => {
    const email = (document.getElementById("email") as HTMLInputElement).value;
    const password = (document.getElementById("password") as HTMLInputElement)
      .value;
    const name = "";
    const social = "none";
    dispatch(userLogin({ email, password, name, social } as UserLoginPayload));
  };
  const googleLogin = () => {
    signInWithGoogle(dispatch);
  };

  const fbLogin = () => {
    signInWithFb(dispatch);
  };
  return (
    <>
      <div
        className="flex justify-center items-center min-h-screen 
       text-sm p-3"
      >
        <div className="flex flex-col w-96 max-w-screen">
          <h1 className=" text-3xl font-semibold">Login</h1>
          <div className=" font-bold mt-5">Email</div>
          <input
            className=" p-3 bg-[#F3F4F6] rounded-lg "
            placeholder="chairin@mail.com"
            id="email"
            type="email"
          ></input>

          <div className=" font-bold mt-5">Password</div>
          <input
            className=" p-3 bg-[#F3F4F6] rounded-lg "
            placeholder="******"
            id="password"
            type="password"
          ></input>
          <div className=" my-2 text-xs ">
            Create an account?{" "}
            <Link href="/auth/register" className="text-[#4F46E5] font-bold">
              Register
            </Link>
          </div>
          <button
            className="  rounded my-2 text-white bg-rose-500 hover:bg-rose-700 py-3 font-bold"
            onClick={login}
          >
            <i className="bi bi-box-arrow-in-right mr-2"></i>
            Login
          </button>
          <button
            onClick={googleLogin}
            className="bg-red-500 hover:bg-red-700 text-white font-bold py-3 px-4 rounded flex justify-center items-center mb-2"
          >
            <i className="bi bi-google mr-2"></i>
            Sign in with Google
          </button>
          <button
            onClick={fbLogin}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-3 px-4 rounded flex justify-center items-center"
          >
            <i className="bi bi-facebook mr-2"></i>
            Sign in with Facebook
          </button>
        </div>
      </div>
    </>
  );
}
export default Page;
