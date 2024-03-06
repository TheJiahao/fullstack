import { Link } from "react-router-dom";
import UserInfo from "./UserInfo";

import { Nav } from "react-bootstrap";

const NavigationBar = () => {
    return (
        <Nav id="navigation-bar">
            <Nav.Item>
                <Nav.Link as={Link} to="/">
                    blogs
                </Nav.Link>
            </Nav.Item>
            <Nav.Item>
                <Nav.Link as={Link} to="/users">
                    users
                </Nav.Link>
            </Nav.Item>

            <Nav.Item>
                <UserInfo />
            </Nav.Item>
        </Nav>
    );
};

export default NavigationBar;
