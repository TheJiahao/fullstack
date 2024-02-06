import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { AnecdoteProps } from "../components/Anecdote";

const anecdotesAtStart = [
    "If it hurts, do it more often",
    "Adding manpower to a late software project makes it later!",
    "The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.",
    "Any fool can write code that a computer can understand. Good programmers write code that humans can understand.",
    "Premature optimization is the root of all evil.",
    "Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.",
];

const getId = () => (100000 * Math.random()).toFixed(0);

const asObject = (anecdote: string): AnecdoteProps => {
    return {
        content: anecdote,
        id: getId(),
        votes: 0,
    };
};

const initialState = anecdotesAtStart.map(asObject);

const anecdoteSlice = createSlice({
    name: "anecdotes",
    initialState,
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
        createAnecdote(state, action: PayloadAction<string>) {
            let newState = state;
            const anecdote = action.payload;
            console.log("anecdote to be added", anecdote);

            newState = state.concat(asObject(anecdote));
            return newState.sort((a, b) => b.votes - a.votes);
        },
    },
});

export const { createAnecdote, voteAnecdote } = anecdoteSlice.actions;
export default anecdoteSlice.reducer;
