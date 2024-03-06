import { BlogProps } from "../components/Blog";

interface User {
    username: string;
    name: string;
    password?: string;
    token: string;
    blogs?: BlogProps[];
}

export default User;
