import { useEffect, useState } from "react";
import { BlogProps } from "./components/Blog";
import LoginForm from "./components/LoginForm";
import blogService from "./services/blogs";
import User from "./interfaces/user";
import loginHandler from "./handlers/login_handler";
import BlogList from "./components/BlogList";

const App = () => {
  const [blogs, setBlogs] = useState<BlogProps[]>([]);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    blogService.getAll().then((blogs) => setBlogs(blogs));
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

      {user && <BlogList blogs={blogs} />}
    </div>
  );
};

export default App;
