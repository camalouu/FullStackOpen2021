import React from 'react';

interface CoursePartBase {
  name: string;
  exerciseCount: number;
  type: string;
}

interface CourseDescriptionPart extends CoursePartBase {
  description: string;
}

interface CourseSpecialPart extends CourseDescriptionPart {
  type: "special";
  requirements: Array<string>;
}

interface CourseNormalPart extends CourseDescriptionPart {
  type: "normal";
}

interface CourseProjectPart extends CoursePartBase {
  type: "groupProject";
  groupProjectCount: number;
}

interface CourseSubmissionPart extends CourseDescriptionPart {
  type: "submission";
  exerciseSubmissionLink: string;
}

type CoursePart = CourseNormalPart | CourseSpecialPart | CourseProjectPart | CourseSubmissionPart;


const Part = ({ part }: { part: CoursePart }) => {

  const assertNever = (value: never): never => {
    throw new Error(
      `Unhandled discriminated union member: ${JSON.stringify(value)}`
    );
  };

  switch (part.type) {
    case "normal":
      return (
        <>
          <h3>{part.name} {part.exerciseCount}</h3>
          <em>{part.description}</em>
        </>
      )
    case "submission":
      return (
        <>
          <h3>{part.name} {part.exerciseCount}</h3>
          <em>{part.description}</em>
          <p>{part.exerciseSubmissionLink}</p>
        </>
      )
    case "groupProject":
      return (
        <>
          <h3>{part.name} {part.exerciseCount}</h3>
          <p>project exercises {part.groupProjectCount}</p>
        </>
      )
    case "special":
      return (
        <>
          <h3>{part.name} {part.exerciseCount}</h3>
          <em>{part.description}</em>
          <p>required skills: {part.requirements.map(skill => <em key={skill}>{skill}, </em>)}</p>
        </>
      )
    default:
      return assertNever(part);

  }
}


const Header = ({ name }: { name: string }) => (
  <h1>{name}</h1>
)

const Content = ({ courseParts }: { courseParts: CoursePart[] }) => (
  <>
    {courseParts.map(course =>
      <Part key={course.name} part={course} />
    )}
  </>
)

const Total = ({ courseParts }: { courseParts: CoursePart[] }) => (
  <p>
    <br />
    Number of exercises{" "}
    {courseParts.reduce((carry, part) => carry + part.exerciseCount, 0)}
  </p>
)



const App = () => {
  const courseName = "Half Stack application development";
  const courseParts: CoursePart[] = [
    {
      name: "Fundamentals",
      exerciseCount: 10,
      description: "This is the leisured course part",
      type: "normal"
    },
    {
      name: "Advanced",
      exerciseCount: 7,
      description: "This is the harded course part",
      type: "normal"
    },
    {
      name: "Using props to pass data",
      exerciseCount: 7,
      groupProjectCount: 3,
      type: "groupProject"
    },
    {
      name: "Deeper type usage",
      exerciseCount: 14,
      description: "Confusing description",
      exerciseSubmissionLink: "https://fake-exercise-submit.made-up-url.dev",
      type: "submission"
    },
    {
      name: "Backend development",
      exerciseCount: 21,
      description: "Typing the backend",
      requirements: ["nodejs", "jest"],
      type: "special"
    }
  ]

  return (
    <div>
      <Header name={courseName} />
      <Content courseParts={courseParts} />
      <Total courseParts={courseParts} />
    </div>
  );
};

export default App;