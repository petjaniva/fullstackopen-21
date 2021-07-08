import React, { useState } from 'react'

const App = () => {

  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  
  const Button = (props) => (
    <button onClick={props.handleClick}>{props.text}</button>
  )
  const Statistic = (props) => 
  {
    if (props.text === "positive")
    {
      return (
        <tr>
        <td>{props.text}</td> 
        <td>{props.value}%</td>
        </tr>
      )
    }
    else 
    {
      return (
        <tr>
          <td>{props.text}</td> 
          <td>{props.value}</td>
        </tr>
      )
    }
  }
  const Statistics = (props) =>{
    if (total === 0)
    {
      return (<tbody><tr><td>no feedback given</td></tr></tbody>)
    }
    else 
    {
      return(
      <tbody>
        <Statistic text="good" value={good} />
        <Statistic text="neutral" value={neutral} />
        <Statistic text="bad" value={bad} />
        <Statistic text="all" value={total} />
        <Statistic text="average" value={avg} />
        <Statistic text="positive" value={positive} />
      </tbody>
      )
  }
}
  const total = good + neutral + bad
  const avg = (good - bad) / total
  const positive = good / total * 100

  return (
    <div>
      <h1>give feedback</h1>
      <Button handleClick ={() => setGood(good+1)} text="good" />
      <Button handleClick ={() => setNeutral(neutral+1)} text="neutral" />
      <Button handleClick ={() => setBad(bad+1)} text="bad" />
      <h1>statistics</h1>
      <table><Statistics /></table>
    </div>
  )
}

export default App