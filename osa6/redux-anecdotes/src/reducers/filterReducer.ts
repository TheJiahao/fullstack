import { PayloadAction, createSlice } from "@reduxjs/toolkit";

const filterSlice = createSlice({
    name: "filter",
    initialState: "",
    reducers: {
        changeFilter(state: string, action: PayloadAction<string>) {
            console.log("state now: ", state);
            console.log("action", action);

            return action.payload;
        },
    },
});

export const { changeFilter } = filterSlice.actions;
export default filterSlice.reducer;
