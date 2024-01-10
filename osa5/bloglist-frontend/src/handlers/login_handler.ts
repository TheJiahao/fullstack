import { Dispatch, FormEvent, SetStateAction } from "react";
import User from "../interfaces/user";
import loginService from "../services/login_service";
import logger from "../utils/logger";

const loginHandler = (
  username: string,
  password: string,
  setUsername: Dispatch<SetStateAction<string>>,
  setPassword: Dispatch<SetStateAction<string>>,
  setUser: Dispatch<SetStateAction<User | null>>
) => {
  return async (event: FormEvent) => {
    event.preventDefault();

    try {
      const user = await loginService.login(username, password);
      logger.info("Logged in", user);
      window.localStorage.setItem("loggedUser", JSON.stringify(user));
      logger.info("Saved user to local storage");

      setUser(user);
      setUsername("");
      setPassword("");
    } catch (error) {
      logger.error(error instanceof Error ? error.message : error);
    }
  };
};

export default loginHandler;
