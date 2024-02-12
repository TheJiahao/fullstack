import { ReactNode, createContext, useReducer } from "react";

const notificationReducer = (
    state: string,
    action: { type: string; payload: string }
) => {
    switch (action.type) {
        case "SET_NOTIFICATION":
            return action.payload;

        default:
            return state;
    }
};

const NotificationContext = createContext(new Array());

const NotificationContextProvider = ({ children }: { children: ReactNode }) => {
    const [notification, notificationDispatch] = useReducer(
        notificationReducer,
        ""
    );

    return (
        <NotificationContext.Provider
            value={[notification, notificationDispatch]}
        >
            {children}
        </NotificationContext.Provider>
    );
};

export { NotificationContextProvider };
export default NotificationContext;
