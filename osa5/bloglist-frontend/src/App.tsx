import { useEffect, useState } from "react";
import { BlogProps } from "./components/Blog";
import BlogList from "./components/BlogList";
import LoginForm from "./components/LoginForm";
import UserInfo from "./components/UserInfo";
import handleLogin from "./handlers/handle_login";
import handleLogout from "./handlers/handle_logout";
import User from "./interfaces/user";
import blogService from "./services/blog_service";

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
      blogService.setToken(user.token);
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
          handleLogin={handleLogin(
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
            logoutHandler={handleLogout(setUser)}
          />

          <BlogList blogs={blogs} />
        </>
      )}
    </div>
  );
};

export default App;
