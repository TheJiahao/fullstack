interface Person {
  name: string;
  number: string;
}

const PersonList = ({ persons }: { persons: Person[] }) => {
  return (
    <>
      <h2>Numbers</h2>
      <ul>
        {persons.map((person) => (
          <li key={person.name}>
            {person.name} {person.number}
          </li>
        ))}
      </ul>
    </>
  );
};

export default PersonList;
