import React, { useState } from "react";

const App = () => {
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);
  const goodClick = () => setGood(good + 1);
  const neutralClick = () => setNeutral(neutral + 1);
  const badClick = () => setBad(bad + 1);

  return (
    <div>
      <h1>Give Feedback</h1>
      <Button clickHandle={goodClick} text="Good" />
      <Button clickHandle={neutralClick} text="Neutral" />
      <Button clickHandle={badClick} text="Bad" />
      <Statistics good={good} neutral={neutral} bad={bad} />
    </div>
  );
};
const Button = (props) => (
  <button onClick={props.clickHandle}>{props.text}</button>
);
const Statistics = ({ good, neutral, bad }) => {
  let all = good + neutral + bad;
  let avg = (good * 1 + bad * -1) / all;
  let pPercent = (good / all) * 100;
  if (all > 0) {
    return (
      <>
        <h1>Statistics</h1>
        <table>
          <tbody>
            <StatisticLine text="Good" value={good} />
            <StatisticLine text="Neutral" value={neutral} />
            <StatisticLine text="Bad" value={bad} />
            <StatisticLine text="All" value={all} />
            <StatisticLine text="Average" value={avg} />
            <StatisticLine text="Positive" value={pPercent} />
          </tbody>
        </table>
      </>
    );
  }
  return <p>No feedback given</p>;
};
const StatisticLine = ({ text, value }) => {
  return (
    <tr>
      <td>{text}</td>
      <td>{text === "Positive" ? `${value} %` : value}</td>
    </tr>
  );
};
export default App;
