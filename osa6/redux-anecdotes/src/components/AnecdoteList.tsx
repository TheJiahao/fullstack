import { useDispatch, useSelector } from "react-redux";
import Anecdote, { AnecdoteProps } from "./Anecdote";
import { voteAnecdote } from "../reducers/anecdoteReducer";

const AnecdoteList = () => {
    const anecdotes: AnecdoteProps[] = useSelector((state) => state);
    const dispatch = useDispatch();

    const handleVote = (id: string) => () => {
        dispatch(voteAnecdote(id));
        console.log("Voted", id);
    };

    return (
        <div>
            <h2>Anecdotes</h2>
            {anecdotes.map((anecdote) => (
                <Anecdote
                    key={anecdote.id}
                    anecdote={anecdote}
                    handleVote={handleVote(anecdote.id)}
                />
            ))}
        </div>
    );
};

export default AnecdoteList;
