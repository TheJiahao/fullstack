import { Dispatch, PayloadAction, createSlice } from "@reduxjs/toolkit";
import Notification from "../interfaces/notification";

const initialState: Notification = { message: "" };

const notificationSlice = createSlice({
    name: "notification",
    initialState,
    reducers: {
        setNotification(state, action: PayloadAction<Notification>) {
            return action.payload;
        },
        resetNotification() {
            return initialState;
        },
    },
});

const setNotification = (
    message: string,
    type: string = "success",
    time: number = 5,
) => {
    return (dispatch: Dispatch) => {
        dispatch(notificationSlice.actions.setNotification({ message, type }));
        setTimeout(() => dispatch(resetNotification()), time * 1000);
    };
};

export const { resetNotification } = notificationSlice.actions;
export { setNotification };
export default notificationSlice.reducer;
