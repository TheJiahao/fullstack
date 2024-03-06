import axios from "axios";
import User from "../interfaces/user";
const baseUrl = "/api/users";

const getAll = async (): Promise<User[]> => {
    const response = await axios.get(baseUrl);
    return response.data;
};

export default { getAll };
