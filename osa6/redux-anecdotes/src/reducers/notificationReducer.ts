import { PayloadAction, createSlice } from "@reduxjs/toolkit";

const notificationSlice = createSlice({
    name: "notification",
    initialState: "a notification",
    reducers: {
        setNotification(state: string, action: PayloadAction<string>) {
            return action.payload;
        },
    },
});

export const { setNotification } = notificationSlice.actions;
export default notificationSlice.reducer;
