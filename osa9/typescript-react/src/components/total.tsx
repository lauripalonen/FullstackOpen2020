import React from 'react';

type CourseParts = {
  // name: string;
  exerciseCount: number;
}

interface TotalProps {
  courseParts: Array<CourseParts>;
}

const Total: React.FC<TotalProps> = (props) => {
  const courseParts = props.courseParts;
  const total = courseParts.reduce((carry, part) => carry + part.exerciseCount, 0);


  return (
    <div>
      <p>
        Number of exercises{" "}{total}
      </p>
    </div>
  )
}

export default Total;