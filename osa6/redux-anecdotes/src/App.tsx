import { FormEvent } from "react";
import AnecdoteForm from "./components/AnecdoteForm";
import AnecdoteList from "./components/AnecdoteList";
import { createAnecdote } from "./reducers/anecdoteReducer";
import { useDispatch } from "react-redux";

const App = () => {
    const dispatch = useDispatch();
    const addAnecdote = (event: FormEvent) => {
        event.preventDefault();

        const content = event.target.anecdote.value;
        event.target.anecdote.value = "";

        dispatch(createAnecdote(content));
    };

    return (
        <div>
            <AnecdoteList />
            <AnecdoteForm addAnecdote={addAnecdote} />
        </div>
    );
};

export default App;
