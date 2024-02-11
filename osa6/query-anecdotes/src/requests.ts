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

export { getAnecdotes, createAnecdote };
