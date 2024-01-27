import AnecdoteForm from "./components/AnecdoteForm";
import AnecdoteList from "./components/AnecdoteList";

const App = () => {
    const addAnecdote = () => {};

    return (
        <div>
            <AnecdoteList />
            <AnecdoteForm addAnecdote={addAnecdote} />
        </div>
    );
};

export default App;
