import { useState } from "react";

const Button = ({ handleClick, text }) => {
  return <button onClick={handleClick}>{text}</button>;
};

const App = () => {
  // tallenna napit omaan tilaansa
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  return (
    <div>
      <h1>Give feedback</h1>

      <Button handleClick={setGood} text="good"></Button>
      <Button handleClick={setNeutral} text="neutral"></Button>
      <Button handleClick={setBad} text="bad"></Button>
    </div>
  );
};

export default App;
