import axios from "axios";
import { AnecdoteProps } from "../components/Anecdote";

const baseUrl = "http://localhost:3001/anecdotes";

const getAllAnecdotes = async () => {
    const response = await axios.get(baseUrl);
    return response.data;
};

const createAnecdote = async (content: string): Promise<AnecdoteProps> => {
    const response = await axios.post(baseUrl, { content, votes: 0 });
    return response.data;
};

const updateAnecdote = async (anecdote: AnecdoteProps) => {
    const response = await axios.put(`${baseUrl}/${anecdote.id}`, anecdote);
    return response.data;
};

export default { getAllAnecdotes, createAnecdote, updateAnecdote };
