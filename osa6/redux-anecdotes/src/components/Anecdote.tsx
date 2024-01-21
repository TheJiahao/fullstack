export interface AnecdoteProps {
    id: number;
    content: string;
    votes: number;
}

const vote = (id: number) => {
    console.log("vote", id);
};

const Anecdote = ({ anecdote }: { anecdote: AnecdoteProps }) => {
    return (
        <>
            <div>{anecdote.content}</div>
            <div>
                has {anecdote.votes}
                <button onClick={() => vote(anecdote.id)}>vote</button>
            </div>
        </>
    );
};

export default Anecdote;
