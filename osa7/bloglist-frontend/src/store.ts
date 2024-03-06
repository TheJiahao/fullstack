import { ThunkAction, UnknownAction, configureStore } from "@reduxjs/toolkit";
import blogReducer from "./reducers/blogReducer";
import notificationSlice from "./reducers/notificationReducer";
import loggedUserReducer from "./reducers/loggedUserReducer";

export const store = configureStore({
    reducer: {
        notification: notificationSlice,
        blogs: blogReducer,
        loggedUser: loggedUserReducer,
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
