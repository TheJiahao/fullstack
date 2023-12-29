import { handleRemovePerson } from "../services/handlers";
export class Person {
  name: string;
  number: string;

  constructor(name: string, number: string) {
    this.name = name;
    this.number = number;
  }
}

const PersonList = ({
  persons,
  keyword,
  setPersons,
}: {
  persons: Person[];
  keyword: string;
  setPersons: CallableFunction;
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
            <button
              value={person.name}
              onClick={handleRemovePerson(person.name, persons, setPersons)}
            >
              delete
            </button>
          </li>
        ))}
      </ul>
    </>
  );
};

export default PersonList;
