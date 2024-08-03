/* eslint-disable no-unused-vars */
import { createSlice } from "@reduxjs/toolkit";
import httpClient from "../api/http";

export const fetchRequests = () => async (dispatch) => {
  dispatch(fetchRequestsPending());
  try {
    const { data } = await httpClient.get("/requests");
    dispatch(fetchRequestsFulfilled(data));

    return data;
  } catch (error) {
    dispatch(fetchRequestsRejected(error));
    console.log(error);
  }
};


const initialState = {
  items: [],
  isLoading: false,
  error: false,
};

const requestSlice = createSlice({
  name: "requests",
  initialState,
  reducers: {
    fetchRequestsPending: (state, action) => {
      state.isLoading = true;
      state.error = false;
    },
    fetchRequestsFulfilled: (state, action) => {
      state.items = action.payload;
      state.isLoading = false;
      state.error = false;
    },
    fetchRequestsRejected: (state, action) => {
      state.error = true;
      state.isLoading = false;
    }
  },
});

const {
  fetchRequestsFulfilled,
  fetchRequestsPending,
  fetchRequestsRejected,
} = requestSlice.actions;

export const selectRequests = (state) => state.requests.items;
export const selectLoadingState = (state) => state.requests.isLoading;
export const selectErrorState = (state) => state.requests.error;

export default requestSlice.reducer;
