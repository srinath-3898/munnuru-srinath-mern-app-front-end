import axios from "axios";

const { createAsyncThunk } = require("@reduxjs/toolkit");

export const getUsers = createAsyncThunk(
  "users/getUsers",
  async ({ size, page }, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `http://localhost:8080/users?page=${page}&size=${size}`
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const searchUsers = createAsyncThunk(
  "users/searchUsers",
  async ({ searchString }, { rejectWithValue }) => {
    try {
      const response = await axios.post(`http://localhost:8080/users`, {
        searchString,
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);
