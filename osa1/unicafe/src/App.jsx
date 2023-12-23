import { useState } from "react";

const Button = ({ handleClick, text }) => {
  return <button onClick={handleClick}>{text}</button>;
};

const StatisticLine = ({ text, value }) => {
  return (
    <p>
      {text} {value}
    </p>
  );
};

const Statistics = ({ good, neutral, bad }) => {
  const total = good + neutral + bad;
  const average = (good * 1 + neutral * 0 + bad * -1) / total;
  const positive = good / total;

  let content = <>No feedback given</>;

  if (total > 0) {
    content = (
      <>
        {" "}
        <StatisticLine text="good" value={good}></StatisticLine>
        <StatisticLine text="neutral" value={neutral}></StatisticLine>
        <StatisticLine text="bad" value={bad}></StatisticLine>
        <p>all {total}</p>
        <p>average {average}</p>
        <p>positive {positive}</p>
      </>
    );
  }

  return (
    <div>
      <h1>Statistics</h1>
      {content}
    </div>
  );
};

const App = () => {
  // tallenna napit omaan tilaansa
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  const handleClick = (counter, setCounter) => {
    const handler = () => {
      console.log("counter before:", counter);
      let updatedCounter = counter + 1;
      console.log("counter after:", updatedCounter);
      setCounter(updatedCounter);
    };

    return handler;
  };

  return (
    <div>
      <h1>Give feedback</h1>

      <Button handleClick={handleClick(good, setGood)} text="good"></Button>
      <Button
        handleClick={handleClick(neutral, setNeutral)}
        text="neutral"
      ></Button>
      <Button handleClick={handleClick(bad, setBad)} text="bad"></Button>

      <Statistics good={good} neutral={neutral} bad={bad}></Statistics>
    </div>
  );
};

export default App;
