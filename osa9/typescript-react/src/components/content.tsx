import React from 'react';

type CourseParts = {
  name: string;
  exerciseCount: number;
}

interface ContentProps {
  courseParts: Array<CourseParts>;
}

const Content: React.FC<ContentProps> = (props) => {
  const courseParts: Array<CourseParts> = props.courseParts;

  const content = courseParts.map(p => {
    return (
      <p key={p.name}>{p.name} {p.exerciseCount}</p>
    )
  })

  return <div>{content}</div>
}

export default Content;