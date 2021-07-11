import React from 'react';

const Course =({ course }) => {
    return (
      <div>
        <Header course={course} />
        <Content course={course} />
        <Total course={course} />
      </div>
    )
  }
  const Header = ({ course }) => {
    return (
      <h1>{course.name}</h1>
    )
  }
  
  const Total = ({ course }) => {
    const sum = course.parts.reduce((total, current) => total + current.exercises, 0)
    
    return(
      <p>Number of exercises {sum}</p>
    ) 
  }
  const Part = (props) => {
    return (
        <p>
            {props.part.name} {props.part.exercises}
        </p>
    )
  }
  
  const Content = ({ course }) => {
    const result = course.parts.map(part =>
      <Part key= {part.id} part={part} />)
    return (
      <div>
        {result}
      </div>
    )
  }
  export default Course