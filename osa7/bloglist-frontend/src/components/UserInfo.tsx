import { useAppDispatch } from "../hooks";
import { logout } from "../reducers/userReducer";

const UserInfo = ({ name }: { name: string }) => {
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
