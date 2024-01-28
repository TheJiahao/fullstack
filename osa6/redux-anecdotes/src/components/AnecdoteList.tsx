import { useDispatch, useSelector } from "react-redux";
import { voteAnecdote } from "../reducers/anecdoteReducer";
import Anecdote, { AnecdoteProps } from "./Anecdote";

const AnecdoteList = () => {
    const anecdotes: AnecdoteProps[] = useSelector(
        (state: AnecdoteProps[]) => state
    );
    const dispatch = useDispatch();

    const handleVote = (id: string) => () => {
        dispatch(voteAnecdote(id));
        console.log("Voted", id);
    };

    return (
        <div>
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
