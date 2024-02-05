import { PayloadAction } from "@reduxjs/toolkit";
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

const anecdoteReducer = (
    state: AnecdoteProps[] = initialState,
    action: PayloadAction<{ id: string } | AnecdoteProps>
) => {
    console.log("state now: ", state);
    console.log("action", action);

    let newState = state;

    switch (action.type) {
        case "VOTE": {
            const id = action.payload.id;

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

            break;
        }

        case "NEW_ANECDOTE": {
            const anecdote = action.payload;
            console.log("anecdote to be added", anecdote);

            newState = state.concat(anecdote);

            break;
        }
    }

    return newState.sort((a, b) => b.votes - a.votes);
};

export const createAnecdote = (content: string) => {
    return {
        type: "NEW_ANECDOTE",
        payload: asObject(content),
    };
};

export const voteAnecdote = (id: string) => {
    return { type: "VOTE", payload: { id } };
};

export default anecdoteReducer;
