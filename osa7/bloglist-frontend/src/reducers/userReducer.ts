import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import User from "../interfaces/user";
import blogService from "../services/blog_service";

const initializeUser = (): User | null => {
    const loggedUserJSON = window.localStorage.getItem("loggedUser");

    if (!loggedUserJSON) {
        return null;
    }

    const user = JSON.parse(loggedUserJSON);
    blogService.setToken(user.token);

    return user;
};

const userSlice = createSlice({
    name: "user",
    initialState: initializeUser,
    reducers: {
        setUser(state, action: PayloadAction<User>) {
            return action.payload;
        },
    },
});

export default userSlice.reducer;
export const { setUser } = userSlice.actions;
