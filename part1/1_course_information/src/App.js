import React from 'react'

const Header = (props) => (
  <h1>{props.course}</h1>
)

const Part = (props) => (
  <p>{props.partName} {props.exerciseNumber}</p>
)

const Content = (props) => (
  <div>
    <Part partName={props.part1} exerciseNumber={props.exercises1} />
    <Part partName={props.part2} exerciseNumber={props.exercises2} />
    <Part partName={props.part3} exerciseNumber={props.exercises3} />
  </div>
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
      <Content part1={part1} part2={part2} part3={part3} exercises1={exercises1} exercises2={exercises2} exercises3={exercises3} />
      <Total exercises_array={[exercises1, exercises2, exercises3]} />
    </div>
  )
}

export default App