import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  userData: {
    name: "",
    email: "",
    user_role: null,
    user_type: null,
  },
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    verifyUser: (state, action) => {
      state.userData = action.payload;
    },
    logout: (state, action) => {
      state.userData = {
        name: "",
        email: "",
        user_role: null,
        user_type: null,
      };
    },
  },
});

export const { verifyUser, logout } = authSlice.actions;

export default authSlice.reducer;
