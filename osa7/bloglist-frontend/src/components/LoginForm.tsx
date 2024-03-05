import { Dispatch, FormEvent, SetStateAction, useState } from "react";
import { useAppDispatch } from "../hooks";
import User from "../interfaces/user";
import { setNotification } from "../reducers/notificationReducer";
import blogService from "../services/blog_service";
import loginService from "../services/login_service";
import logger from "../utils/logger";

const LoginForm = ({
    setUser,
}: {
    setUser: Dispatch<SetStateAction<User | null>>;
}) => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const dispatch = useAppDispatch();

    const handleLogin = () => {
        return async (event: FormEvent) => {
            event.preventDefault();

            try {
                const user = await loginService.login(username, password);
                dispatch(setNotification("Logged in"));
                logger.info("Logged in", user);

                window.localStorage.setItem("loggedUser", JSON.stringify(user));
                logger.info("Saved user to local storage");

                blogService.setToken(user.token);

                setUser(user);
                setUsername("");
                setPassword("");
            } catch (error) {
                const message = "Invalid credentials";

                dispatch(setNotification(message));
                logger.error(message);
            }
        };
    };

    return (
        <div>
            <h2>Login</h2>
            <form onSubmit={handleLogin()}>
                <div>
                    username{" "}
                    <input
                        id="username-input"
                        type="text"
                        value={username}
                        name="Username"
                        onChange={({ target }) => setUsername(target.value)}
                    />
                </div>
                <div>
                    password{" "}
                    <input
                        id="password-input"
                        type="password"
                        value={password}
                        name="Password"
                        onChange={({ target }) => setPassword(target.value)}
                    />
                </div>
                <button id="login-button" type="submit">
                    login
                </button>
            </form>
        </div>
    );
};

export default LoginForm;
