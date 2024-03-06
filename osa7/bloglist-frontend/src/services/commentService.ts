import axios from "axios";
const baseUrl = "/api/blogs";

const create = async (id: string, content: string) => {
    const response = await axios.post(`${baseUrl}/${id}/comments`, { content });
    return response.data;
};

export default { create };
