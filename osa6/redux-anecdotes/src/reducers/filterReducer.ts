import { PayloadAction } from "@reduxjs/toolkit";

const filterReducer = (state: string = "", action: PayloadAction<string>) => {
    console.log("state now: ", state);
    console.log("action", action);

    switch (action.type) {
        case "SET_FILTER":
            return action.payload;

        default:
            return state;
    }
};

const changeFilter = (filter: string): PayloadAction<string> => {
    return {
        type: "SET_FILTER",
        payload: filter,
    };
};

export { changeFilter };
export default filterReducer;
