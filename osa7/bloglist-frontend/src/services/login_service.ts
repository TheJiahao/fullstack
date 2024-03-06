import axios from "axios";
import User from "../interfaces/user";
const baseUrl = "/api/login";

const login = async (username: string, password: string): Promise<User> => {
    const response = await axios.post(baseUrl, { username, password });
    return response.data;
};

export default { login };
