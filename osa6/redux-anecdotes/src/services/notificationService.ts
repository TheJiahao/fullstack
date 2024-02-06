import {
    resetNotification,
    setNotification,
} from "../reducers/notificationReducer";
import store from "../store";

const showNotification = (notification: string) => {
    store.dispatch(setNotification(notification));

    setTimeout(() => store.dispatch(resetNotification()), 5000);
};

export { showNotification };
