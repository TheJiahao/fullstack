import { useEffect, useRef, useState } from "react";
import BlogList from "./components/BlogList";
import CreateBlogForm from "./components/CreateBlogForm";
import LoginForm from "./components/LoginForm";
import Notification from "./components/Notification";
import Toggable from "./components/Toggable";
import UserInfo from "./components/UserInfo";
import handleLogout from "./handlers/handle_logout";
import { useAppDispatch } from "./hooks";
import User from "./interfaces/user";
import { initializeBlogs } from "./reducers/blogReducer";
import blogService from "./services/blog_service";

const App = () => {
    const [user, setUser] = useState<User | null>(null);

    const dispatch = useAppDispatch();
    const createBlogFormRef = useRef({ toggleVisibility: () => {} });

    useEffect(() => {
        dispatch(initializeBlogs());
    }, [dispatch]);

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
            <Notification />
            {!user && <LoginForm setUser={setUser} />}

            {user && (
                <>
                    <h2>blogs</h2>
                    <UserInfo
                        name={user.name}
                        logoutHandler={handleLogout(setUser)}
                    />

                    <Toggable buttonLabel="new blog" ref={createBlogFormRef}>
                        <CreateBlogForm />
                    </Toggable>

                    <BlogList username={user.username} />
                </>
            )}
        </div>
    );
};

export default App;
