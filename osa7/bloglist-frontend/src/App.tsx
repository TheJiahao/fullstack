import { useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import BlogList from "./components/BlogList";
import CreateBlogForm from "./components/CreateBlogForm";
import LoginForm from "./components/LoginForm";
import Notification from "./components/Notification";
import User from "./components/User";
import UserInfo from "./components/UserInfo";
import UserTable from "./components/UserTable";
import { useAppDispatch, useAppSelector } from "./hooks";
import { initializeBlogs } from "./reducers/blogReducer";
import { initializeUsers } from "./reducers/userReducer";
import Blog from "./components/Blog";

const App = () => {
    const dispatch = useAppDispatch();

    const loggedUser = useAppSelector((state) => state.loggedUser);

    useEffect(() => {
        dispatch(initializeBlogs());
        dispatch(initializeUsers());
    }, [dispatch]);

    return (
        <div>
            <Notification />

            {loggedUser ? (
                <>
                    <h2>blogs</h2>
                    <UserInfo />

                    <Routes>
                        <Route
                            path="/"
                            element={
                                <>
                                    <CreateBlogForm />
                                    <BlogList />
                                </>
                            }
                        />
                        <Route path="/users" element={<UserTable />} />
                        <Route path="/users/:id" element={<User />} />
                        <Route path="blogs/:id" element={<Blog />} />
                    </Routes>
                </>
            ) : (
                <LoginForm />
            )}
        </div>
    );
};

export default App;
