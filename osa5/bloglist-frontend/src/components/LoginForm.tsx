import { Dispatch, SetStateAction, useState } from "react";
import handleLogin from "../handlers/handle_login";
import User from "../interfaces/user";
import type { notificationHandler } from "../handlers/handle_notification";

const LoginForm = ({
  setUser,
  handleNotification,
}: {
  setUser: Dispatch<SetStateAction<User | null>>;
  handleNotification: notificationHandler;
}) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  return (
    <div>
      <h2>Login</h2>
      <form
        onSubmit={handleLogin(
          username,
          password,
          setUsername,
          setPassword,
          setUser,
          handleNotification
        )}
      >
        <div>
          username{" "}
          <input
            type="text"
            value={username}
            name="Username"
            onChange={({ target }) => setUsername(target.value)}
          />
        </div>
        <div>
          password{" "}
          <input
            type="password"
            value={password}
            name="Password"
            onChange={({ target }) => setPassword(target.value)}
          />
        </div>
        <button type="submit">login</button>
      </form>
    </div>
  );
};

export default LoginForm;
