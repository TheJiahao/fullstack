import { useEffect, useState } from "react";
import { BlogProps } from "./components/Blog";
import BlogList from "./components/BlogList";
import LoginForm from "./components/LoginForm";
import UserInfo from "./components/UserInfo";
import loginHandler from "./handlers/login_handler";
import logoutHandler from "./handlers/logout_handler";
import User from "./interfaces/user";
import blogService from "./services/blogs";

const App = () => {
  const [blogs, setBlogs] = useState<BlogProps[]>([]);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    blogService.getAll().then((blogs) => setBlogs(blogs));
  }, []);

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem("loggedUser");

    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      setUser(user);
    }
  }, []);

  return (
    <div>
      {!user && (
        <LoginForm
          username={username}
          password={password}
          setUsername={setUsername}
          setPassword={setPassword}
          handleLogin={loginHandler(
            username,
            password,
            setUsername,
            setPassword,
            setUser
          )}
        />
      )}

      {user && (
        <>
          <h2>blogs</h2>
          <UserInfo
            username={user.username}
            logoutHandler={logoutHandler(setUser)}
          />

          <BlogList blogs={blogs} />
        </>
      )}
    </div>
  );
};

export default App;
