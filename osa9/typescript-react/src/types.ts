export interface CoursePartBase {
  name: string;
  exerciseCount: number;
}

export interface BroadCoursePartBase extends CoursePartBase {
  description: string;
}

export interface CoursePartOne extends BroadCoursePartBase {
  name: "Fundamentals";
}

export interface CoursePartTwo extends CoursePartBase {
  name: "Using props to pass data";
  groupProjectCount: number;
}

export interface CoursePartThree extends BroadCoursePartBase {
  name: "Deeper type usage";
  exerciseSubmissionLink: string;
}

export interface CoursePartFour extends BroadCoursePartBase {
  name: "The cool part";
  coolnessValue: number;
}

export type CoursePart = CoursePartOne | CoursePartTwo | CoursePartThree | CoursePartFour;