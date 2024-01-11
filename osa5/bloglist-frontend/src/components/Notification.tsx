import PropTypes from "prop-types";

const Notification = ({ message }: { message: string | null }) => {
  if (!message) {
    return null;
  }

  return <div>{message}</div>;
};

Notification.propTypes = {
  message: PropTypes.string,
};

export default Notification;
