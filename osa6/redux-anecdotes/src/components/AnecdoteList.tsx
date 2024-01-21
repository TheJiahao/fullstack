import { useDispatch, useSelector } from "react-redux";
import Anecdote, { AnecdoteProps } from "./Anecdote";

const AnecdoteList = () => {
    const anecdotes: AnecdoteProps[] = useSelector((state) => state);
    const dispatch = useDispatch();

    const handleVote = (id: number) => () => {
        dispatch({ type: "VOTE", payload: { id } });
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
