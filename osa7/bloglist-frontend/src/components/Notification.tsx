import { Alert } from "react-bootstrap";
import { useAppSelector } from "../hooks";

const Notification = () => {
    const { message, type } = useAppSelector((state) => state.notification);

    return <> {message && <Alert variant={type}>{message}</Alert>}</>;
};

export default Notification;
