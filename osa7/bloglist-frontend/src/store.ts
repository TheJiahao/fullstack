import { ThunkAction, UnknownAction, configureStore } from "@reduxjs/toolkit";
import blogReducer from "./reducers/blogReducer";
import notificationSlice from "./reducers/notificationReducer";

export const store = configureStore({
    reducer: {
        notification: notificationSlice,
        blogs: blogReducer,
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export type AppThunk<ReturnType = void> = ThunkAction<
    ReturnType,
    RootState,
    unknown,
    UnknownAction
>;
