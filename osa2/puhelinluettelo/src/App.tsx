import { ChangeEvent, FormEvent, useState } from "react";
import PersonList from "./components/PersonList";
import FilterForm from "./components/FilterForm";

const App = () => {
  const [persons, setPersons] = useState([
    { name: "Arto Hellas", number: "040-123456" },
  ]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewPhoneNumber] = useState("");
  const [keyword, setKeyword] = useState("");

  const addPerson = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (persons.map((person) => person.name).includes(newName)) {
      alert(`${newName} is already added to phonebook`);
      return;
    }

    const person = { name: newName, number: newNumber };

    setPersons(persons.concat(person));

    console.log("add person:", person);
  };

  const handleKeywordChange = (event: ChangeEvent<HTMLInputElement>) => {
    console.log("keyword:", keyword)
    
    setKeyword(event.target.value);
  };

  return (
    <div>
      <h2>Phonebook</h2>

      <FilterForm
        handleKeywordChange={handleKeywordChange}
        keywordValue={keyword}
      />

      <form onSubmit={addPerson}>
        <div>
          name:{" "}
          <input
            value={newName}
            onChange={(event) => setNewName(event.target.value)}
          />
        </div>
        <div>
          number:{" "}
          <input
            value={newNumber}
            onChange={(event) => setNewPhoneNumber(event.target.value)}
          />
        </div>

        <div>
          <button type="submit">add</button>
        </div>
      </form>

      <PersonList persons={persons} />
    </div>
  );
};

export default App;
