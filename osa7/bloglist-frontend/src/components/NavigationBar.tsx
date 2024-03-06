import { Link } from "react-router-dom";
import UserInfo from "./UserInfo";
import "../css/NavigationBar.css";

const NavigationBar = () => {
    return (
        <div id="navigation-bar">
            <Link to="/">blogs</Link>
            <Link to="/users">users</Link>
            <UserInfo />
        </div>
    );
};

export default NavigationBar;
