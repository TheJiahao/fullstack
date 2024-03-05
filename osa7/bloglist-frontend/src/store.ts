import { configureStore } from "@reduxjs/toolkit";
import notificationSlice from "./reducers/notificationReducer";
import blogReducer from "./reducers/blogReducer";

export const store = configureStore({
    reducer: {
        notification: notificationSlice,
        blogs: blogReducer,
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
