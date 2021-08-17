import React from 'react'

const Header = ({ courseName }) =>
  <h1>{courseName}</h1>


const Part = ({ partName, exerciseNumber }) =>
  <li>{partName} {exerciseNumber}</li>


const Content = ({ parts }) =>
  <div>
    {parts.map(part => <Part key={part.id} partName={part.name} exerciseNumber={part.exercises} />)}
  </div>


const Total = ({ parts }) =>
  <strong>
    Total of {parts.reduce((a, b) => a + b.exercises, 0)} exercises
  </strong>


const Course = ({ course }) =>
  <ul>
    <Header courseName={course.name} />
    <Content parts={course.parts} />
    <Total parts={course.parts} />
  </ul>

export default Course