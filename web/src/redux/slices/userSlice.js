/** @format */
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  email: "",
  name: "",
  membership: "",
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    functionLogin: (state, action) => {
      return {
        ...state,
        ...action.payload,
      };
    },
    functionLogout: (state) => {
      localStorage.removeItem("user");
      return initialState;
    },
  },
});

export const { functionLogin, functionLogout } = userSlice.actions;
export default userSlice.reducer;
