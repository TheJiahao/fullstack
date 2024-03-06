import { useMatch } from "react-router-dom";
import { useAppSelector } from "../hooks";
import UserProps from "../interfaces/user";

const User = () => {
    const match = useMatch("/users/:id");
    const users = useAppSelector((state) => state.users);

    const user = match
        ? (users.find((user) => user.id === match.params.id) as UserProps)
        : null;

    if (!user) {
        return null;
    }

    return (
        <div>
            <h2>{user.name}</h2>

            <h3>added blogs</h3>
            <ul>
                {user.blogs!.map((blog) => (
                    <li key={blog.id}>{blog.title}</li>
                ))}
            </ul>
        </div>
    );
};

export default User;
