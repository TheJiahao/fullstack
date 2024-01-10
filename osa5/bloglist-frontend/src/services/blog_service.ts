import axios, { AxiosRequestConfig } from "axios";
import { BlogProps } from "../components/Blog";
const baseUrl = "/api/blogs";

let token: string | null = null;

const setToken = (newToken: string): void => {
  token = `Bearer ${newToken}`;
};

const getAll = () => {
  const request = axios.get(baseUrl);
  return request.then((response) => response.data);
};

const create = async (
  title: string,
  author: string,
  url: string
): Promise<BlogProps> => {
  const config: AxiosRequestConfig = {
    headers: {
      Authorization: token,
    },
  };

  const response = await axios.post(baseUrl, { title, author, url }, config);

  return response.data;
};

export default { setToken, getAll, create };
