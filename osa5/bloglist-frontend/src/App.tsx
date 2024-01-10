import { useEffect, useState } from "react";
import { BlogProps } from "./components/Blog";
import BlogList from "./components/BlogList";
import CreateBlogForm from "./components/CreateBlogForm";
import LoginForm from "./components/LoginForm";
import Notification from "./components/Notification";
import UserInfo from "./components/UserInfo";
import handleLogout from "./handlers/handle_logout";
import User from "./interfaces/user";
import blogService from "./services/blog_service";
import handleNotification from "./handlers/handle_notification";

const App = () => {
  const [user, setUser] = useState<User | null>(null);
  const [blogs, setBlogs] = useState<BlogProps[]>([]);
  const [message, setMessage] = useState<string | null>(null);

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
      <Notification message={message} />
      {!user && (
        <LoginForm
          setUser={setUser}
          handleNotification={handleNotification(setMessage)}
        />
      )}

      {user && (
        <>
          <h2>blogs</h2>
          <UserInfo
            username={user.username}
            logoutHandler={handleLogout(setUser)}
          />
          <CreateBlogForm blogs={blogs} setBlogs={setBlogs} />
          <BlogList blogs={blogs} />
        </>
      )}
    </div>
  );
};

export default App;
