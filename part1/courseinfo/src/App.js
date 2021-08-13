import React from 'react'

const Header = (props) => (
  <h1>{props.course}</h1>
)

const Part = (props) => (
  <p>{props.partName} {props.exerciseNumber}</p>
)

const Content = (props) => (
  <div>
    {/*props.parts.map(part => <Part partName={part.name} exerciseNumber={part.exercises} />)*/}
    <Part partName={props.parts[0].name} exerciseNumber={props.parts[0].exercises} />
    <Part partName={props.parts[1].name} exerciseNumber={props.parts[1].exercises} />
    <Part partName={props.parts[2].name} exerciseNumber={props.parts[2].exercises} />
  </div>
)

const Total = (props) => (
  <p>
    Number of exercises {props.parts.reduce((a, b) => a + b.exercises, 0)}
  </p>
)


const App = () => {
  const course = 'Half Stack application development'
  const parts = [
    {
      name: 'Fundamentals of React',
      exercises: 10
    },
    {
      name: 'Using props to pass data',
      exercises: 7
    },
    {
      name: 'State of a component',
      exercises: 14
    }
  ]

  return (
    <div>
      <Header course={course} />
      <Content parts={parts} />
      <Total parts={parts} />
    </div>
  )
}

export default App