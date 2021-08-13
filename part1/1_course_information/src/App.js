import React from 'react'

const Header = (props) => (
  <h1>{props.course}</h1>
)

const Content = (props) => (
  <p>{props.partNumber} {props.exerciseNumber}</p>
)

const Total = (props) => (
  <p> Number of exercises {props.exercises_array.reduce((a, b) => a + b)} </p>
)

const App = () => {
  const course = 'Half Stack application development'
  const part1 = 'Fundamentals of React'
  const exercises1 = 10
  const part2 = 'Using props to pass data'
  const exercises2 = 7
  const part3 = 'State of a component'
  const exercises3 = 14

  return (
    <div>
      <Header course={course} />
      <Content partNumber={part1} exerciseNumber={exercises1} />
      <Content partNumber={part2} exerciseNumber={exercises2} />
      <Content partNumber={part3} exerciseNumber={exercises3} />
      <Total exercises_array={[exercises1, exercises2, exercises3]} />
    </div>
  )
}

export default App