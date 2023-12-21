import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  userData: {
    user_id: null,
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
      console.log(action.payload);
      state.userData = action.payload;
    },
    logout: (state, action) => {
      state.userData = {
        user_id: null,
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
