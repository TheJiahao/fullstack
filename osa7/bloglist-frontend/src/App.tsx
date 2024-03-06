import { useEffect } from "react";
import BlogList from "./components/BlogList";
import CreateBlogForm from "./components/CreateBlogForm";
import LoginForm from "./components/LoginForm";
import Notification from "./components/Notification";
import UserInfo from "./components/UserInfo";
import { useAppDispatch, useAppSelector } from "./hooks";
import { initializeBlogs } from "./reducers/blogReducer";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import UserTable from "./components/UserTable";
import { initializeUsers } from "./reducers/userReducer";

const App = () => {
    const user = useAppSelector((state) => state.loggedUser);

    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(initializeBlogs());
        dispatch(initializeUsers());
    }, [dispatch]);

    return (
        <div>
            <Notification />

            <Router>
                {user ? (
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
                            <Route path="users" element={<UserTable />} />
                        </Routes>
                    </>
                ) : (
                    <LoginForm />
                )}
            </Router>
        </div>
    );
};

export default App;
