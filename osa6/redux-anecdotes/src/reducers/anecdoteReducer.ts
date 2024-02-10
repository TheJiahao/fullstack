import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { AnecdoteProps } from "../components/Anecdote";

const getId = () => (100000 * Math.random()).toFixed(0);

const asObject = (anecdote: string): AnecdoteProps => {
    return {
        content: anecdote,
        id: getId(),
        votes: 0,
    };
};

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
        createAnecdote(state, action: PayloadAction<AnecdoteProps>) {
            const anecdote = action.payload;
            console.log("anecdote to be added", anecdote);

            state.push(action.payload);

            return state.sort((a, b) => b.votes - a.votes);
        },
        setAnecdotes(state, action: PayloadAction<AnecdoteProps[]>) {
            return action.payload;
        },
    },
});

export const { createAnecdote, voteAnecdote, setAnecdotes } =
    anecdoteSlice.actions;
export default anecdoteSlice.reducer;
