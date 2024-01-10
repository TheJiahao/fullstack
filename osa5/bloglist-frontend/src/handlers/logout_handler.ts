import { Dispatch, SetStateAction } from "react";
import User from "../interfaces/user";
import logger from "../utils/logger";

const logoutHandler =
  (setUser: Dispatch<SetStateAction<User | null>>) => () => {
    setUser(null);
    logger.info("Logged out");

    window.localStorage.clear();
    logger.info("Cleared local storage");
  };

export default logoutHandler;
