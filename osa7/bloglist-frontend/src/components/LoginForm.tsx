import { FormEvent, useState } from "react";
import { useAppDispatch } from "../hooks";
import { login } from "../reducers/loggedUserReducer";

const LoginForm = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const dispatch = useAppDispatch();

    const handleLogin = async (event: FormEvent) => {
        event.preventDefault();

        dispatch(login({ username, password }));

        setUsername("");
        setPassword("");
    };

    return (
        <div>
            <h2>Login</h2>
            <form onSubmit={handleLogin}>
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
