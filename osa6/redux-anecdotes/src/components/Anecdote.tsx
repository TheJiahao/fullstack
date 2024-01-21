import { MouseEventHandler } from "react";

export interface AnecdoteProps {
    id: string;
    content: string;
    votes: number;
}

const Anecdote = ({
    anecdote,
    handleVote,
}: {
    anecdote: AnecdoteProps;
    handleVote: MouseEventHandler<HTMLButtonElement>;
}) => {
    return (
        <>
            <div>{anecdote.content}</div>
            <div>
                has {anecdote.votes}
                <button onClick={handleVote}>vote</button>
            </div>
        </>
    );
};

export default Anecdote;
