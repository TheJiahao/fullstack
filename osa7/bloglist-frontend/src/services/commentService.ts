import axios from "axios";
import Comment from "../interfaces/comment";

const baseUrl = "/api/blogs";

const create = async (id: string, content: string): Promise<Comment> => {
    const response = await axios.post(`${baseUrl}/${id}/comments`, { content });
    return response.data;
};

export default { create };
