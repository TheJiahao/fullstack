import axios from "axios";

const baseUrl = "http://localhost:3001/anecdotes";

const getAnecdotes = async () => {
    const response = await axios.get(baseUrl);
    return response.data;
};

const createAnecdote = async (anecdote: { content: string; votes: number }) => {
    const response = await axios.post(baseUrl, anecdote);
    return response.data;
};

const updateAnecdote = async (anecdote: {
    id: string;
    content: string;
    votes: number;
}) => {
    const response = await axios.put(`${baseUrl}/${anecdote.id}`, anecdote);
    return response.data;
};

export { getAnecdotes, createAnecdote, updateAnecdote };
