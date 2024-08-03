/* eslint-disable no-empty */
/* eslint-disable no-unused-vars */
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import authService from "../api/authService";

export const signIn = createAsyncThunk("auth/signIn", async (args) => {
  const data = await authService.signIn(args);

  localStorage.setItem("token", data.token);
  return data;
});

export const fetchAuthMe = createAsyncThunk("auth/fetchAuthMe", async () => {
  const  data = await authService.fetchMe();

  return data;
});

const initialState = {
  isAuthenticated: false,
  error: null,
  isLoading: false,
  data: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducer: {
    logout: (state) => {
      state.data = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(signIn.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(signIn.fulfilled, (state, action) => {
        state.data = action.payload;
        state.isAuthenticated = true;
        state.isLoading = false;
      })
      .addCase(signIn.rejected, (state, action) => {
        state.error = action.error.message;
        state.isLoading = false;
      })
      .addCase(fetchAuthMe.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchAuthMe.fulfilled, (state, action) => {
        state.data = action.payload;
        state.isAuthenticated = true;
        state.isLoading = false;
      })
      .addCase(fetchAuthMe.rejected, (state, action) => {
        state.error = action.error.message;
        state.isLoading = false;
      });
  },
});

const { reducer: authReducer, actions } = authSlice;

export const { logout } = actions;

export const selectIsAuth = (state) => Boolean(state.auth.data);

export default authReducer;
