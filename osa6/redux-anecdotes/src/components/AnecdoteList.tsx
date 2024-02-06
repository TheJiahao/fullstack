import { useDispatch, useSelector } from "react-redux";
import { voteAnecdote } from "../reducers/anecdoteReducer";
import Anecdote, { AnecdoteProps } from "./Anecdote";
import { showNotification } from "../services/notificationService";

const AnecdoteList = () => {
    const anecdotes: AnecdoteProps[] = useSelector(
        ({
            anecdotes,
            filter,
        }: {
            anecdotes: AnecdoteProps[];
            filter: string;
        }) =>
            anecdotes.filter((anecdote) => {
                const content = anecdote.content.toLowerCase();

                return content.includes(filter.toLowerCase());
            })
    );
    const dispatch = useDispatch();

    const handleVote = (anecdote: AnecdoteProps) => () => {
        dispatch(voteAnecdote(anecdote.id));
        console.log("Voted", anecdote.id);

        showNotification(`You voted "${anecdote.content}"`);
    };

    return (
        <div>
            {anecdotes.map((anecdote) => (
                <Anecdote
                    key={anecdote.id}
                    anecdote={anecdote}
                    handleVote={handleVote(anecdote)}
                />
            ))}
        </div>
    );
};

export default AnecdoteList;
