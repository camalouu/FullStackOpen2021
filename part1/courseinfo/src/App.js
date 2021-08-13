import React from 'react'

const Header = (props) => (
  <h1>{props.course}</h1>
)

const Part = (props) => (
  <p>{props.partName} {props.exerciseNumber}</p>
)

const Content = (props) => (
  <div>
    <Part partName={props.part1.name} exerciseNumber={props.part1.exercises} />
    <Part partName={props.part2.name} exerciseNumber={props.part2.exercises} />
    <Part partName={props.part3.name} exerciseNumber={props.part3.exercises} />
  </div>
)

const Total = (props) => (
  <p> Number of exercises {props.exercises_array.reduce((a, b) => a + b)} </p>
)

const App = () => {
  const course = 'Half Stack application development'
  const part1 = {
    name: 'Fundamentals of React',
    exercises: 10
  }
  const part2 = {
    name: 'Using props to pass data',
    exercises: 7
  }
  const part3 = {
    name: 'State of a component',
    exercises: 14
  }

  return (
    <div>
      <Header course={course} />
      <Content part1={part1} part2={part2} part3={part3} />
      <Total exercises_array={[part1.exercises, part2.exercises, part3.exercises]} />
    </div>
  )
}

export default App