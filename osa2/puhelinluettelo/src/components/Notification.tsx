import "../css/notification.css"

const Notification = ({
  message,
  type,
}: {
  message: string | null;
  type?: string;
}) => {
  if (message === null) {
    return null;
  }

  return <div className={type}>{message}</div>;
};

export default Notification;
