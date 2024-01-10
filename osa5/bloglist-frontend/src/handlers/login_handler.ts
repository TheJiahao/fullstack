import { FormEvent } from "react";
import User from "../interfaces/user";
import loginService from "../services/login_service";
import logger from "../utils/logger";

const loginHandler = (
  username: string,
  password: string,
  setUsername: React.Dispatch<React.SetStateAction<string>>,
  setPassword: React.Dispatch<React.SetStateAction<string>>,
  setUser: React.Dispatch<React.SetStateAction<User | null>>
) => {
  return async (event: FormEvent) => {
    event.preventDefault();

    try {
      const user = await loginService.login(username, password);
      logger.info("Logged in", user);

      setUser(user);
      setUsername("");
      setPassword("");
    } catch (error) {
      logger.error(error instanceof Error ? error.message : error);
    }
  };
};

export default loginHandler;
