import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import User from "../interfaces/user";
import blogService from "../services/blogService";
import loginService from "../services/loginService";
import { setNotification } from "./notificationReducer";
import logger from "../utils/logger";

const initializeUser = (): User | null => {
    const loggedUserJSON = window.localStorage.getItem("loggedUser");

    if (!loggedUserJSON) {
        return null;
    }

    const user = JSON.parse(loggedUserJSON);
    blogService.setToken(user.token);

    return user;
};

const login = createAsyncThunk(
    "user/login",
    async (
        { username, password }: { username: string; password: string },
        thunkAPI,
    ) => {
        try {
            const user = await loginService.login(username, password);

            window.localStorage.setItem("loggedUser", JSON.stringify(user));
            blogService.setToken(user.token);

            thunkAPI.dispatch(setNotification("Logged in"));
            logger.info("Logged in", user.username);

            thunkAPI.dispatch(setUser(user));
        } catch (error) {
            const message = "Invalid credentials";

            thunkAPI.dispatch(setNotification(message));
            logger.error(message);
        }
    },
);

const userSlice = createSlice({
    name: "user",
    initialState: initializeUser,
    reducers: {
        setUser(state, action: PayloadAction<User>) {
            return action.payload;
        },
        logout() {
            return null;
        },
    },
});

export default userSlice.reducer;
export const { setUser, logout } = userSlice.actions;
export { login };
