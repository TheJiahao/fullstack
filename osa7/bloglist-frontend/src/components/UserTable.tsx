import { Link } from "react-router-dom";
import { useAppSelector } from "../hooks";

const UserTable = () => {
    const users = useAppSelector((state) => state.users);

    return (
        <div>
            <h2>Users</h2>

            <table>
                <tbody>
                    <tr>
                        <th></th>
                        <th>blogs created</th>
                    </tr>
                    {users
                        .toSorted((a, b) => b.blogs!.length - a.blogs!.length)
                        .map((user) => (
                            <tr key={user.username}>
                                <td>
                                    <Link to={user.id!}>{user.name}</Link>
                                </td>
                                <td>{user.blogs?.length}</td>
                            </tr>
                        ))}
                </tbody>
            </table>
        </div>
    );
};

export default UserTable;
