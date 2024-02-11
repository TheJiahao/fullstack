import { useSelector } from "react-redux";
import { useAppDispatch } from "../hooks";
import { voteAnecdote } from "../reducers/anecdoteReducer";
import { setNotification } from "../reducers/notificationReducer";
import Anecdote, { AnecdoteProps } from "./Anecdote";

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
    const dispatch = useAppDispatch();

    const handleVote = (anecdote: AnecdoteProps) => () => {
        dispatch(voteAnecdote(anecdote.id));
        dispatch(setNotification(`You voted "${anecdote.content}"`, 5));
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
