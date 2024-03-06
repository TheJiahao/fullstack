import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import User from "../interfaces/user";
import userService from "../services/userService";

const initializeUsers = createAsyncThunk(
    "users/initializeUsers",
    async () => await userService.getAll(),
);

const userSlice = createSlice({
    name: "users",
    initialState: new Array<User>(),
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(initializeUsers.fulfilled, (state, action) => {
            return action.payload;
        });
    },
});

export default userSlice.reducer;
export { initializeUsers };
