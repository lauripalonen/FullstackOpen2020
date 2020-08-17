import React from 'react';
import Part from './Part';
import { CoursePart } from '../types';

interface ContentProps {
  courseParts: Array<CoursePart>;
}

const Content: React.FC<ContentProps> = (props) => {
  const courseParts: Array<CoursePart> = props.courseParts;

  return (
    <div>
      <Part courseParts={courseParts} />
    </div>
  )
}

export default Content;