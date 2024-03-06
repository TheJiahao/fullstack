import { useAppDispatch, useAppSelector } from "../hooks";
import { logout } from "../reducers/loggedUserReducer";

const UserInfo = () => {
    const name = useAppSelector((state) => state.loggedUser?.name);
    const dispatch = useAppDispatch();

    const logoutHandler = () => {
        dispatch(logout());
    };

    return (
        <div>
            <p>{name} logged in</p>
            <button id="logout-button" onClick={logoutHandler}>
                logout
            </button>
        </div>
    );
};

export default UserInfo;
