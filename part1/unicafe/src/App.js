import React, { useState } from 'react'

const Header = ({ text }) =>
  <h2>{text}</h2>

const Button = ({ handleClick, text }) =>
  <button onClick={handleClick}>{text}</button>

const StatisticsLine = ({ text, value }) =>
  text === "positive" ?
    <tbody>
      <tr><td>{text}</td><td>{value}%</td></tr>
    </tbody> :
    <tbody>
      <tr><td>{text}</td><td>{value}</td></tr>
    </tbody>

const Statistics = ({ good, neutral, bad }) => {
  const all = good + neutral + bad;
  const average = all / 3;
  const positive = (good / all * 100).toFixed(2);
  if (all === 0)
    return (<p>No feedback given</p>)

  return (
    <table>
      <StatisticsLine text="good" value={good} />
      <StatisticsLine text="neutral" value={neutral} />
      <StatisticsLine text="bad" value={bad} />
      <StatisticsLine text="all" value={all} />
      <StatisticsLine text="average" value={average} />
      <StatisticsLine text="positive" value={positive} />
    </table>
  )
}

const App = () => {

  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  return (
    <div>
      <Header text="give feedback" />
      <Button handleClick={() => setGood(good + 1)} text="good" />
      <Button handleClick={() => setNeutral(neutral + 1)} text="neutral" />
      <Button handleClick={() => setBad(bad + 1)} text="bad" />
      <Header text="statistics" />
      <Statistics good={good} neutral={neutral} bad={bad} />
    </div>
  )
}

export default App