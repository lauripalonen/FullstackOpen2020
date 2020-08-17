import React from 'react';
import { CoursePart } from '../types';

type PartProps = {
  courseParts: Array<CoursePart>;
}

const Part: React.FC<PartProps> = (props) => {
  const assertNever = (value: never): never => {
    throw new Error(
      `Unhandled discriminated union member: ${JSON.stringify(value)}`
    );
  };

  const partElements = props.courseParts.map(part => {
    switch (part.name) {
      case "Fundamentals":
        return (
          <div key={part.name}>
            <h3>{part.name} - exercises: {part.exerciseCount}</h3>
            <p>{part.description}</p>
          </div>
        );
      case "Using props to pass data":
        return (
          <div key={part.name}>
            <h3>{part.name} - exercises: {part.exerciseCount}</h3>
            <p>Group project count: {part.groupProjectCount}</p>
          </div>
        );
      case "Deeper type usage":
        return (
          <div key={part.name}>
            <h3>{part.name} - exercises: {part.exerciseCount}</h3>
            <p>{part.description}</p>
            <p>Submission link: {part.exerciseSubmissionLink}</p>
          </div>
        )
      case "The cool part":
        return (
          <div key={part.name}>
            <h3>{part.name} - exercises: {part.exerciseCount}</h3>
            <p>{part.description}</p>
            <p>coolness level: {part.coolnessValue}</p>
          </div>
        )
      default:
        console.log('nada')
        return assertNever(part);
    }
  });

  return <div>{partElements}</div>
};

export default Part;