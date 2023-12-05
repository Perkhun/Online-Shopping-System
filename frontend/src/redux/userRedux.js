import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "user",
  initialState: {
    currentUser: null,
    isFetching: false,
    error: false,
  },
  reducers: {
    registrationStart: (state) => {
      state.isFetching = true;
      state.error = false
    },
    registrationSuccess: (state, action) => {
      state.isFetching = false;
      state.currentUser = action.payload;
    },
    registrationFailure: (state) => {
      state.isFetching = false;
      state.error = true;
    },
    loginStart: (state) => {
      state.isFetching = true;
    },
    loginSuccess: (state, action) => {
      state.isFetching = false;
      state.currentUser = action.payload;
    },
    loginFailure: (state) => {
      state.isFetching = false;
      state.error = true;
    },
    logout: (state) => {
      /* state.isFetching = false;
      state.currentUser = null;
      state.error = false; */
      state.currentUser = null;
    }
  },
});

export const {
  registrationStart,
  registrationSuccess,
  registrationFailure,
  loginStart,
  loginSuccess,
  loginFailure,
  logout,
  addUserStart, 
  addUserSuccess, 
  addUserFailure
} = userSlice.actions;
export default userSlice.reducer;
