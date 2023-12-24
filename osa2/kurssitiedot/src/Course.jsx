const Header = (props) => {
  return (
    <>
      <h1>{props.course.name}</h1>
    </>
  );
};

const Content = (props) => {
  return (
    <div>
      <Part part={props.course.parts[0]} />
      <Part part={props.course.parts[1]} />
      <Part part={props.course.parts[2]} />
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
