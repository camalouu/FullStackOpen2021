import React from 'react';

interface Course {
  name: string,
  exerciseCount: number
}

const Header = ({ name }: { name: string }) => (
  <h1>{name}</h1>
)

const Content = ({ courseParts }: { courseParts: Course[] }) => (
  <>
    {courseParts.map(course =>
      <p key={course.name}>
        {course.name} {course.exerciseCount}
      </p>
    )}
  </>
)

const Total = ({ courseParts }: { courseParts: Course[] }) => (
  <p>
    Number of exercises{" "}
    {courseParts.reduce((carry, part) => carry + part.exerciseCount, 0)}
  </p>
)



const App = () => {
  const courseName = "Half Stack application development";
  const courseParts = [
    {
      name: "Fundamentals",
      exerciseCount: 10
    },
    {
      name: "Using props to pass data",
      exerciseCount: 7
    },
    {
      name: "Deeper type usage",
      exerciseCount: 14
    }
  ];

  return (
    <div>
      <Header name={courseName} />
      <Content courseParts={courseParts} />
      <Total courseParts={courseParts} />
    </div>
  );
};

export default App;