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
            <button id="logout-button" onClick={logoutHandler}>
                logout
            </button>
        </div>
    );
};

export default UserInfo;
