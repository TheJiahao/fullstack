import { useEffect } from "react";
import AnecdoteForm from "./components/AnecdoteForm";
import AnecdoteList from "./components/AnecdoteList";
import Filter from "./components/Filter";
import Notification from "./components/Notification";

import { useAppDispatch } from "./hooks";
import { initializeAnecdotes } from "./reducers/anecdoteReducer";

const App = () => {
    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(initializeAnecdotes());
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
