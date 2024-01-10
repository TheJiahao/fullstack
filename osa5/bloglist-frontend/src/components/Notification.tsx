const Notification = ({ message }: { message: string | null }) => {
  if (!message) {
    return null;
  }

  return <div>{message}</div>;
};

export default Notification;
