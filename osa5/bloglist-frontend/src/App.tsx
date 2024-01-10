import { useEffect, useState } from "react";
import { BlogProps } from "./components/Blog";
import BlogList from "./components/BlogList";
import CreateBlogForm from "./components/CreateBlogForm";
import LoginForm from "./components/LoginForm";
import UserInfo from "./components/UserInfo";
import handleLogout from "./handlers/handle_logout";
import User from "./interfaces/user";
import blogService from "./services/blog_service";

const App = () => {
  const [user, setUser] = useState<User | null>(null);
  const [blogs, setBlogs] = useState<BlogProps[]>([]);

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
      {!user && <LoginForm setUser={setUser} />}

      {user && (
        <>
          <h2>blogs</h2>
          <UserInfo
            username={user.username}
            logoutHandler={handleLogout(setUser)}
          />
          <CreateBlogForm />
          <BlogList blogs={blogs} />
        </>
      )}
    </div>
  );
};

export default App;
