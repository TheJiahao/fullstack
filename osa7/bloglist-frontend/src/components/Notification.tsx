import { useAppSelector } from "../hooks";

const Notification = () => {
    const message = useAppSelector((state) => state.notification);

    if (!message) {
        return null;
    }

    return <div>{message}</div>;
};

export default Notification;
