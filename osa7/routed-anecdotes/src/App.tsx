import { useState } from "react";
import Menu from "./components/Menu";
import About from "./components/About";
import AnecdoteList from "./components/AnecdoteList";
import Footer from "./components/Footer";
import CreateNew from "./components/CreateNew";
import { Route, Routes, useMatch } from "react-router-dom";
import Anecdote, { AnecdoteProps } from "./components/Anecdote";

const App = () => {
    const [anecdotes, setAnecdotes] = useState<Array<AnecdoteProps>>([
        {
            content: "If it hurts, do it more often",
            author: "Jez Humble",
            info: "https://martinfowler.com/bliki/FrequencyReducesDifficulty.html",
            votes: 0,
            id: 1,
        },
        {
            content: "Premature optimization is the root of all evil",
            author: "Donald Knuth",
            info: "http://wiki.c2.com/?PrematureOptimization",
            votes: 0,
            id: 2,
        },
    ]);

    const [notification, setNotification] = useState("");
    const match = useMatch("/anecdotes/:id");

    const addNew = (anecdote: AnecdoteProps) => {
        anecdote.id = Math.round(Math.random() * 10000);
        setAnecdotes(anecdotes.concat(anecdote));
    };

    const anecdoteById = (id: number) => anecdotes.find((a) => a.id === id);

    const vote = (id: number) => {
        const anecdote = anecdoteById(id);

        const voted = {
            ...anecdote,
            votes: anecdote.votes + 1,
        };

        setAnecdotes(anecdotes.map((a) => (a.id === id ? voted : a)));
    };

    const anecdote = match ? anecdoteById(Number(match.params.id)) : undefined;

    return (
        <div>
            <h1>Software anecdotes</h1>
            <Menu />
            <Routes>
                <Route
                    path="/"
                    element={<AnecdoteList anecdotes={anecdotes} />}
                />
                <Route path="/about" element={<About />} />
                <Route path="/create" element={<CreateNew addNew={addNew} />} />
                <Route
                    path="/anecdotes/:id"
                    element={<Anecdote anecdote={anecdote} />}
                />
            </Routes>
            <Footer />
        </div>
    );
};

export default App;
