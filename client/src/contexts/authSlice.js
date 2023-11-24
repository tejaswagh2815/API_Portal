import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  userData: {
    name: "",
    email: "",
    role: 0,
    type: 0,
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
      state.userData = null;
    },
  },
});

export const { verifyUser, logout } = authSlice.actions;

export default authSlice.reducer;
