import "../css/notification.css";
import Message from "../interfaces/Message";

const Notification = ({ message }: { message: Message }) => {
  if (message === null) {
    return null;
  }

  return <div className={message.type}>{message.message}</div>;
};

export default Notification;
