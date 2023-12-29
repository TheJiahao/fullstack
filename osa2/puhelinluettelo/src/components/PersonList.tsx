import Person from "../entities/Person";
import { handleRemovePerson } from "../services/handlers";

const PersonList = ({
  persons,
  keyword,
  setPersons,
  setMessage,
}: {
  persons: Person[];
  keyword: string;
  setPersons: CallableFunction;
  setMessage: CallableFunction;
}) => {
  const filteredPersons = persons.filter((person) =>
    person.name.toLowerCase().includes(keyword.toLowerCase())
  );

  return (
    <>
      <ul>
        {filteredPersons.map((person) => (
          <li key={person.id}>
            {person.name} {person.number}
            <button
              value={person.name}
              onClick={handleRemovePerson(
                person,
                persons,
                setPersons,
                setMessage
              )}
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
