const Header = (props) => {
  return (
    <>
      <h1>{props.course.name}</h1>
    </>
  );
};

const Content = ({ course }) => {
  return (
    <div>
      {course.parts.map((part) => (
        <Part part={part} key={part.id} />
      ))}
    </div>
  );
};

const Part = (props) => {
  return (
    <>
      <p>
        {props.part.name} {props.part.exercises}
      </p>
    </>
  );
};

const Total = (props) => {
  let sum = 0;

  for (const part of props.course.parts) {
    sum += part.exercises;
  }

  return (
    <>
      <p>Number of exercises {sum}</p>
    </>
  );
};

const Course = ({ course }) => {
  return (
    <>
      {" "}
      <Header course={course} />
      <Content course={course} />
      <Total course={course} />
    </>
  );
};

export default Course;
