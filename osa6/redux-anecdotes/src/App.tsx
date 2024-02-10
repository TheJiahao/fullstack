import { useEffect } from "react";
import AnecdoteForm from "./components/AnecdoteForm";
import AnecdoteList from "./components/AnecdoteList";
import Filter from "./components/Filter";
import Notification from "./components/Notification";
import anecdoteService from "./services/anecdoteService";
import store from "./store";

import { setAnecdotes } from "./reducers/anecdoteReducer";

const App = () => {
    useEffect(() => {
        anecdoteService
            .getAllAnecdotes()
            .then((anecdotes) => store.dispatch(setAnecdotes(anecdotes)));
    }, []);

    return (
        <div>
            <h2>Anecdotes</h2>
            <Notification />
            <Filter />
            <AnecdoteForm />
            <AnecdoteList />
        </div>
    );
};

export default App;
