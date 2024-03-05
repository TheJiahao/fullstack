import { Dispatch, PayloadAction, createSlice } from "@reduxjs/toolkit";

const notificationSlice = createSlice({
    name: "notification",
    initialState: "",
    reducers: {
        setNotification(state: string, action: PayloadAction<string>) {
            return action.payload;
        },
        resetNotification() {
            return "";
        },
    },
});

const setNotification = (notification: string, time: number = 5) => {
    return (dispatch: Dispatch) => {
        dispatch(notificationSlice.actions.setNotification(notification));
        setTimeout(() => dispatch(resetNotification()), time * 1000);
    };
};

export const { resetNotification } = notificationSlice.actions;
export { setNotification };
export default notificationSlice.reducer;
