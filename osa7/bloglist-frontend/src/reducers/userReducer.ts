import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import User from "../interfaces/user";
import blogService from "../services/blog_service";
import loginService from "../services/login_service";
import { setNotification } from "./notificationReducer";

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

            return user;
        } catch (error) {
            thunkAPI.dispatch(setNotification("Invalid credentials"));
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
        logout(state) {
            return null;
        },
    },
    extraReducers: (builder) =>
        builder.addCase(login.fulfilled, (state, action) => {
            const user = action.payload;

            if (!user) {
                return null;
            }

            return user;
        }),
});

export default userSlice.reducer;
export const { setUser, logout } = userSlice.actions;
export { login };
