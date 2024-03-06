import { useEffect } from "react";
import { Route, Routes, useMatch } from "react-router-dom";
import BlogList from "./components/BlogList";
import CreateBlogForm from "./components/CreateBlogForm";
import LoginForm from "./components/LoginForm";
import Notification from "./components/Notification";
import UserInfo from "./components/UserInfo";
import UserTable from "./components/UserTable";
import { useAppDispatch, useAppSelector } from "./hooks";
import { initializeBlogs } from "./reducers/blogReducer";
import { initializeUsers } from "./reducers/userReducer";

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
                    </Routes>
                </>
            ) : (
                <LoginForm />
            )}
        </div>
    );
};

export default App;
