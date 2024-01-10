import { useEffect, useState } from "react";
import Blog, { BlogProps } from "./components/Blog";
import LoginForm from "./components/LoginForm";
import blogService from "./services/blogs";
import User from "./interfaces/user";
import loginHandler from "./handlers/login_handler";

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

      <h2>blogs</h2>
      {blogs.map((blog) => (
        <Blog key={blog.id} blog={blog} />
      ))}
    </div>
  );
};

export default App;
