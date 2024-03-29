import AnecdoteForm from "./components/AnecdoteForm";
import Notification from "./components/Notification";
import { useQuery, useQueryClient, useMutation } from "@tanstack/react-query";
import { getAnecdotes, updateAnecdote } from "./requests";
import { useNotificationDispatch } from "./NotificationContext";

const App = () => {
    const queryClient = useQueryClient();
    const voteAnecdoteMutation = useMutation({
        mutationFn: updateAnecdote,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["anecdotes"] });
        },
    });
    const notificationDispatch = useNotificationDispatch();

    const handleVote = (anecdote) => {
        const newAnecdote = { ...anecdote, votes: anecdote.votes + 1 };

        voteAnecdoteMutation.mutate(newAnecdote);
        console.log("voted", newAnecdote);

        notificationDispatch({
            type: "SET_NOTIFICATION",
            payload: `anecdote "${anecdote.content} voted"`,
        });

        setTimeout(() => {
            notificationDispatch({
                type: "SET_NOTIFICATION",
                payload: "",
            });
        }, 5000);
    };

    const result = useQuery({
        queryKey: ["anecdotes"],
        queryFn: getAnecdotes,
        retry: 1,
        refetchOnWindowFocus: false,
    });
    console.log(JSON.parse(JSON.stringify(result)));

    if (result.isError) {
        return (
            <div>anecdote service not available due to problems in server</div>
        );
    }

    if (result.isLoading) {
        return <div>loading data...</div>;
    }

    const anecdotes = result.data;

    return (
        <div>
            <h3>Anecdote app</h3>

            <Notification />
            <AnecdoteForm />

            {anecdotes.map((anecdote) => (
                <div key={anecdote.id}>
                    <div>{anecdote.content}</div>
                    <div>
                        has {anecdote.votes}
                        <button onClick={() => handleVote(anecdote)}>
                            vote
                        </button>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default App;
