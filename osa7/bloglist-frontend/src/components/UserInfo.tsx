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
            {name} logged in
            <button id="logout-button" onClick={logoutHandler}>
                logout
            </button>
        </div>
    );
};

export default UserInfo;
