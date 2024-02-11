import { FormEvent } from "react";
import { useAppDispatch } from "../hooks";
import { createAnecdote } from "../reducers/anecdoteReducer";
import { setNotification } from "../reducers/notificationReducer";

const AnecdoteForm = () => {
    const dispatch = useAppDispatch();
    const addAnecdote = async (event: FormEvent) => {
        event.preventDefault();

        const content = event.target.anecdote.value;
        event.target.anecdote.value = "";

        dispatch(createAnecdote(content));
        dispatch(setNotification(`Added anecdote "${content}"`, 5));
    };

    return (
        <div>
            <h2>create new</h2>
            <form onSubmit={addAnecdote}>
                <div>
                    <input name="anecdote" />
                </div>
                <button type="submit">create</button>
            </form>
        </div>
    );
};

export default AnecdoteForm;
