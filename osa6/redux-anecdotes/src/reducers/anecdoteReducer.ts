import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { AnecdoteProps } from "../components/Anecdote";
import anecdoteService from "../services/anecdoteService";

const getId = () => (100000 * Math.random()).toFixed(0);

const asObject = (anecdote: string): AnecdoteProps => {
    return {
        content: anecdote,
        id: getId(),
        votes: 0,
    };
};

const initializeAnecdotes = createAsyncThunk(
    "anecdotes/initializeAnecdotes",
    async () => {
        return await anecdoteService.getAllAnecdotes();
    }
);

const createAnecdote = createAsyncThunk(
    "anecdotes/createAnecdote",
    async (content: string) => await anecdoteService.createAnecdote(content)
);

const anecdoteSlice = createSlice({
    name: "anecdotes",
    initialState: new Array<AnecdoteProps>(),
    reducers: {
        voteAnecdote(state: AnecdoteProps[], action: PayloadAction<string>) {
            console.log("state now: ", state);
            console.log("action", action);

            let newState = state;
            const id = action.payload;

            const anecdoteToChange = state.find(
                (anecdote) => anecdote.id === id
            ) as AnecdoteProps;

            const changedAnecdote = {
                ...anecdoteToChange,
                votes: anecdoteToChange.votes + 1,
            };

            newState = state.map((anecdote) =>
                anecdote.id === id ? changedAnecdote : anecdote
            );
            return newState.sort((a, b) => b.votes - a.votes);
        },
        setAnecdotes(state, action: PayloadAction<AnecdoteProps[]>) {
            return action.payload;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(initializeAnecdotes.fulfilled, (state, action) => {
                return action.payload;
            })
            .addCase(createAnecdote.fulfilled, (state, action) => {
                const anecdote = action.payload;
                console.log("anecdote to be added", anecdote);

                return state.concat(anecdote).sort((a, b) => b.votes - a.votes);
            });
    },
});

export const { voteAnecdote, setAnecdotes } = anecdoteSlice.actions;
export { initializeAnecdotes, createAnecdote };
export default anecdoteSlice.reducer;
