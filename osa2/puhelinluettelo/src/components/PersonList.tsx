interface Person {
  name: string;
  number: string;
}

const PersonList = ({
  persons,
  keyword,
}: {
  persons: Person[];
  keyword: string;
}) => {
  const filteredPersons = persons.filter((person) =>
    person.name.toLowerCase().includes(keyword.toLowerCase())
  );

  return (
    <>
      <ul>
        {filteredPersons.map((person) => (
          <li key={person.name}>
            {person.name} {person.number}
          </li>
        ))}
      </ul>
    </>
  );
};

export default PersonList;
