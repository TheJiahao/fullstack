interface AnecdoteProps {
    content: string;
    author: string;
    info: string;
    votes: number;
    id: number;
}

const Anecdote = ({ anecdote }: { anecdote?: AnecdoteProps }) => {
    if (!anecdote) {
        return null;
    }

    return (
        <div>
            <h2>
                {anecdote.content} by {anecdote.author}
            </h2>
            <p>has {anecdote.votes} votes</p>
            <p>
                for more info see <a href={anecdote.info}>{anecdote.info}</a>
            </p>
        </div>
    );
};

export type { AnecdoteProps };
export default Anecdote;
