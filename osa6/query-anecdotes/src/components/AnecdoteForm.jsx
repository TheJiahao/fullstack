import { useQueryClient, useMutation } from "@tanstack/react-query";
import { createAnecdote } from "../requests";
import { useNotificationDispatch } from "../NotificationContext";

const AnecdoteForm = () => {
    const queryClient = useQueryClient();
    const notificationDispatch = useNotificationDispatch();

    const newAnecdoteMutation = useMutation({
        mutationFn: createAnecdote,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["anecdotes"] });
        },
    });

    const onCreate = (event) => {
        event.preventDefault();

        const content = event.target.anecdote.value;
        event.target.anecdote.value = "";

        newAnecdoteMutation.mutate({ content, votes: 0 });
        console.log("new anecdote added", content);

        notificationDispatch({
            type: "SET_NOTIFICATION",
            payload: `added "${content}"`,
        });

        setTimeout(() => {
            notificationDispatch({
                type: "SET_NOTIFICATION",
                payload: "",
            });
        }, 5000);
    };

    return (
        <div>
            <h3>create new</h3>
            <form onSubmit={onCreate}>
                <input name="anecdote" />
                <button type="submit">create</button>
            </form>
        </div>
    );
};

export default AnecdoteForm;
