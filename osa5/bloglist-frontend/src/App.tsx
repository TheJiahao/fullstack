import { useEffect, useRef, useState } from "react";
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
import Toggable from "./components/Toggable";
import handleCreateBlog from "./handlers/handle_create_blog";

const App = () => {
  const [user, setUser] = useState<User | null>(null);
  const [blogs, setBlogs] = useState<BlogProps[]>([]);
  const [message, setMessage] = useState<string | null>(null);

  const createBlogFormRef = useRef({ toggleVisibility: () => {} });

  useEffect(() => {
    blogService
      .getAll()
      .then((blogs: BlogProps[]) =>
        setBlogs(blogs.sort((a, b) => b.likes - a.likes))
      );
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
          <UserInfo name={user.name} logoutHandler={handleLogout(setUser)} />

          <Toggable buttonLabel="new blog" ref={createBlogFormRef}>
            <CreateBlogForm
              handleCreateBlog={handleCreateBlog(
                blogs,
                setBlogs,
                handleNotification(setMessage),
                createBlogFormRef
              )}
            />
          </Toggable>

          <BlogList
            blogs={blogs}
            setBlogs={setBlogs}
            username={user.username}
          />
        </>
      )}
    </div>
  );
};

export default App;
