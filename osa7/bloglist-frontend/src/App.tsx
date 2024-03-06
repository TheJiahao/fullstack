import { useEffect } from "react";
import BlogList from "./components/BlogList";
import CreateBlogForm from "./components/CreateBlogForm";
import LoginForm from "./components/LoginForm";
import Notification from "./components/Notification";
import UserInfo from "./components/UserInfo";
import { useAppDispatch, useAppSelector } from "./hooks";
import { initializeBlogs } from "./reducers/blogReducer";

const App = () => {
    const user = useAppSelector((state) => state.loggedUser);

    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(initializeBlogs());
    }, [dispatch]);

    return (
        <div>
            <Notification />
            {user ? (
                <>
                    <h2>blogs</h2>
                    <UserInfo />
                    <CreateBlogForm />
                    <BlogList />
                </>
            ) : (
                <LoginForm />
            )}
        </div>
    );
};

export default App;
