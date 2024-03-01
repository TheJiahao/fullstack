const Notification = ({ message }: { message: string }) => {
    if (!message) {
        return null;
    }

    return <div>{message}</div>;
};

export default Notification;
