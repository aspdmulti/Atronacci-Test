/** @format */

import { axiosInstance } from "@/axios/axios";
import { functionLogin, functionLogout } from "../slices/userSlice";
import Swal from "sweetalert2";
import { usePathname } from "next/navigation";

export const userLogin = ({ email, password, name, social }) => {
  return async (dispatch) => {
    try {
      let res = {};
      if (social == "none") {
        res = await axiosInstance().get("/users", {
          params: { email, password },
        });
      } else if (social !== "none") {
        res = await axiosInstance().get("/user/social", {
          params: { email, name },
        });
      }
      if (res.data.result?.email) {
        Swal.fire({
          title: "Success!",
          icon: "success",
          timer: 2000,
          showConfirmButton: false,
          willClose: async () => {
            await dispatch(functionLogin(res.data.result));
          },
        });
        localStorage.setItem("user", res.data.token);
      }
      return;
    } catch (err) {
      localStorage.removeItem("auth");
      Swal.fire({
        title: "Error!",
        text: err.response.data.message,
        icon: "error",
        confirmButtonText: "ok",
      });

      return err.message;
    }
  };
};

export const keepLogin = () => {
  return async (dispatch) => {
    try {
      const token = localStorage.getItem("user");
      const res = await axiosInstance().get("/user/v1", {
        headers: {
          Authorization: token,
        },
      });

      if (res.data.result?.email) {
        dispatch(functionLogin(res.data.result));

        localStorage.setItem("user", res.data.token);
      } else {
        alert("user not found");
        throw Error("user not found");
      }
      return;
    } catch (err) {
      localStorage.removeItem("auth");
      dispatch(functionLogout);
      return err.message;
    }
  };
};
