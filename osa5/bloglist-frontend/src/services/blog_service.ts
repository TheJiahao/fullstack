import axios, { AxiosRequestConfig } from "axios";
import { BlogProps } from "../components/Blog";
import { NewBlog } from "../components/CreateBlogForm";
const baseUrl = "/api/blogs";

let token: string | null = null;

const setToken = (newToken: string): void => {
  token = `Bearer ${newToken}`;
};

const getAll = () => {
  const request = axios.get(baseUrl);
  return request.then((response) => response.data);
};

const create = async (newBlog: NewBlog): Promise<BlogProps> => {
  const config: AxiosRequestConfig = {
    headers: {
      Authorization: token,
    },
  };

  const response = await axios.post(baseUrl, newBlog, config);

  return response.data;
};

const update = async (blog: BlogProps) => {
  const response = await axios.put(`${baseUrl}/${blog.id}`, blog);

  return response.data;
};

const remove = async (id: string): Promise<BlogProps> => {
  const config: AxiosRequestConfig = {
    headers: {
      Authorization: token,
    },
  };

  const response = await axios.delete(`${baseUrl}/${id}`, config);

  return response.data;
};

export default { setToken, getAll, create, update, remove };
