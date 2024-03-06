import { useEffect, useRef } from "react";
import BlogList from "./components/BlogList";
import CreateBlogForm from "./components/CreateBlogForm";
import LoginForm from "./components/LoginForm";
import Notification from "./components/Notification";
import Toggable from "./components/Toggable";
import UserInfo from "./components/UserInfo";
import { useAppDispatch, useAppSelector } from "./hooks";
import { initializeBlogs } from "./reducers/blogReducer";

const App = () => {
    const user = useAppSelector((state) => state.user);

    const dispatch = useAppDispatch();
    const createBlogFormRef = useRef({ toggleVisibility: () => {} });

    useEffect(() => {
        dispatch(initializeBlogs());
    }, [dispatch]);

    return (
        <div>
            <Notification />
            {!user && <LoginForm />}

            {user && (
                <>
                    <h2>blogs</h2>
                    <UserInfo />

                    <Toggable buttonLabel="new blog" ref={createBlogFormRef}>
                        <CreateBlogForm />
                    </Toggable>

                    <BlogList />
                </>
            )}
        </div>
    );
};

export default App;
