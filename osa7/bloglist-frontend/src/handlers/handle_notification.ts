import { Dispatch, SetStateAction } from "react";

const handleNotification =
    (setMessage: Dispatch<SetStateAction<string | null>>) =>
    (message: string) => {
        setMessage(message);

        setTimeout(() => {
            setMessage(null);
        }, 5000);
    };

type notificationHandler = (message: string) => void;

export type { notificationHandler };
export default handleNotification;
