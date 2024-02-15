import { getUsers, searchUsers } from "./usersActions";

const { createSlice } = require("@reduxjs/toolkit");

const usersSlice = createSlice({
  name: "users",
  initialState: {
    loading: false,
    users: null,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getUsers.pending, (state) => {
        state.loading = true;
      })
      .addCase(getUsers.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.users = payload?.data;
        state.error = null;
      })
      .addCase(getUsers.rejected, (state, { payload }) => {
        state.loading = false;
        state.users = null;
        state.error = payload;
      });

    builder
      .addCase(searchUsers.pending, (state) => {
        state.loading = true;
      })
      .addCase(searchUsers.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.users = payload?.data;
        state.error = null;
      })
      .addCase(searchUsers.rejected, (state, { payload }) => {
        console.log(payload);
        state.loading = false;
        state.users = null;
        state.error = payload;
      });
  },
});

export default usersSlice.reducer;
export const {} = usersSlice.actions;
