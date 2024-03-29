import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { AnecdoteProps } from "../components/Anecdote";
import anecdoteService from "../services/anecdoteService";
import { RootState } from "../store";

const initializeAnecdotes = createAsyncThunk(
    "anecdotes/initializeAnecdotes",
    async (): Promise<AnecdoteProps[]> => {
        return await anecdoteService.getAllAnecdotes();
    }
);

const createAnecdote = createAsyncThunk(
    "anecdotes/createAnecdote",
    async (content: string) => await anecdoteService.createAnecdote(content)
);

const voteAnecdote = createAsyncThunk(
    "anecdotes/voteAnecdote",
    async (id: string, thunkApi) => {
        const { anecdotes } = thunkApi.getState() as RootState;

        const anecdote = anecdotes.find(
            (anecdote) => anecdote.id === id
        ) as AnecdoteProps;

        return await anecdoteService.updateAnecdote({
            ...anecdote,
            votes: anecdote.votes + 1,
        });
    }
);

const sortByVotes = (a: AnecdoteProps, b: AnecdoteProps) => b.votes - a.votes;

const anecdoteSlice = createSlice({
    name: "anecdotes",
    initialState: new Array<AnecdoteProps>(),
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(initializeAnecdotes.fulfilled, (state, action) => {
                return action.payload.sort(sortByVotes);
            })
            .addCase(createAnecdote.fulfilled, (state, action) => {
                const anecdote = action.payload;
                console.log("anecdote to be added", anecdote);

                return state.concat(anecdote).sort(sortByVotes);
            })
            .addCase(voteAnecdote.fulfilled, (state, action) => {
                const changedAnecdote = action.payload;

                return state
                    .map((anecdote) =>
                        anecdote.id === changedAnecdote.id
                            ? changedAnecdote
                            : anecdote
                    )
                    .sort(sortByVotes);
            });
    },
});

export { createAnecdote, initializeAnecdotes, voteAnecdote };
export default anecdoteSlice.reducer;
