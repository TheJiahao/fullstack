import { Button } from "react-bootstrap";
import { useAppDispatch, useAppSelector } from "../hooks";
import { logout } from "../reducers/loggedUserReducer";

const UserInfo = () => {
    const name = useAppSelector((state) => state.loggedUser?.name);
    const dispatch = useAppDispatch();

    const style = { display: "flex", gap: "10px" };

    const logoutHandler = () => {
        dispatch(logout());
    };

    return (
        <div style={style}>
            {name} logged in
            <Button
                variant="secondary"
                id="logout-button"
                onClick={logoutHandler}
            >
                logout
            </Button>
        </div>
    );
};

export default UserInfo;
