import { ReactNode, createContext, useContext, useReducer } from "react";

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

const useNotificationValue = () => {
    return useContext(NotificationContext)[0];
};

const useNotificationDispatch = () => {
    return useContext(NotificationContext)[1];
};

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

export {
    NotificationContextProvider,
    useNotificationDispatch,
    useNotificationValue,
};
export default NotificationContext;
