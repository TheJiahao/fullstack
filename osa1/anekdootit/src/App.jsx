import { useState } from "react";

function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min) + min);
}

const MostVotedAnecdote = ({ anecdotes, votes }) => {
  let mostVoted = 0;

  for (const i of anecdotes.keys()) {
    if (votes[i] > votes[mostVoted]) {
      mostVoted = i;
    }
  }

  console.log("most voted:", mostVoted);

  return (
    <div>
      <h1>Anecdote with most votes</h1>
      <p>{anecdotes[mostVoted]}</p>
    </div>
  );
};

const AnecdoteOfTheDay = ({ anecdote }) => {
  console.log("anecdote:", anecdote);

  return (
    <div>
      <h1>Anecdote of the day</h1>
      <p>{anecdote}</p>
    </div>
  );
};

const App = () => {
  const anecdotes = [
    "If it hurts, do it more often.",
    "Adding manpower to a late software project makes it later!",
    "The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.",
    "Any fool can write code that a computer can understand. Good programmers write code that humans can understand.",
    "Premature optimization is the root of all evil.",
    "Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.",
    "Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when dianosing patients.",
    "The only way to go fast, is to go well.",
  ];

  const [selected, setSelected] = useState(0);
  const [votes, setVotes] = useState(new Uint32Array(anecdotes.length));

  console.log("votes:", votes);

  const handleNext = () => {
    const next = getRandomInt(0, anecdotes.length);
    console.log("next index:", next);

    setSelected(next);
  };

  const handleVote = () => {
    console.log("voted:", selected);
    console.log("votes before:", votes);

    const votes_copy = [...votes];
    votes_copy[selected] += 1;

    console.log("votes after:", votes_copy);

    setVotes(votes_copy);
  };

  return (
    <div>
      <AnecdoteOfTheDay anecdote={anecdotes[selected]}></AnecdoteOfTheDay>

      <button onClick={handleVote}>vote</button>
      <button onClick={handleNext}>next</button>

      <MostVotedAnecdote
        anecdotes={anecdotes}
        votes={votes}
      ></MostVotedAnecdote>
    </div>
  );
};

export default App;
