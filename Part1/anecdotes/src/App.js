import React, { useState } from "react";

const App = () => {
  const anecdotes = [
    "If it hurts, do it more oftern",
    "Adding manpower to a late software project makes it later!",
    "The first 90 percent of the code accounts for the first 10 percent of the development time... The remaining 10 percent of the code accounts for the other 90 percentofthe development time.",
    "Any fool can write code that a computer can understand. Good programmers write code that humans can understand.",
    "Premature optimizationis the root of all evil.",
    "Debugging is twice as hard as writing the code in the first place. Therefore, if youwrite the code as cleverly as possible, you are , by definition, not smart enough to debug it.",
    "Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients",
  ];
  const [selected, setSelected] = useState(0);
  const handleNext = () => {
    setSelected((Math.random() * 6).toFixed(0));
  };
  const [votes, setVotes] = useState([0, 0, 0, 0, 0, 0, 0]);
  const [mostSelect, setMostselect] = useState(0);
  const handleVote = () => {
    const newVotes = [...votes];
    newVotes[selected] = newVotes[selected] + 1;
    setVotes(newVotes);
    let max = Math.max(...newVotes);
    let indexOfmax = newVotes.indexOf(max);
    setMostselect(indexOfmax);
  };
  return (
    <>
      <h1>Anecdote of the day</h1>
      <p>{anecdotes[selected]}</p>
      <p>has {votes[selected]} votes </p>
      <button onClick={handleVote}>vote</button>
      <button onClick={handleNext}>next anecdote</button>
      <h1>Anecdote with most votes</h1>
      <p>{anecdotes[mostSelect]}</p>
      <p>has {votes[mostSelect]} votes </p>
    </>
  );
};

export default App;
