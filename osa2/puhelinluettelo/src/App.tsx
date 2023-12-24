import { ChangeEvent, FormEvent, useState } from "react";
import PersonList from "./components/PersonList";
import FilterForm from "./components/FilterForm";
import AddPersonForm from "./components/AddPersonForm";

const App = () => {
  const [persons, setPersons] = useState([
    { name: "Arto Hellas", number: "040-123456" },
    { name: "Ada Lovelace", number: "39-44-5323523" },
    { name: "Dan Abramov", number: "12-43-234345" },
    { name: "Mary Poppendieck", number: "39-23-6423122" },
  ]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [keyword, setKeyword] = useState("");

  const handleAddPerson = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (persons.map((person) => person.name).includes(newName)) {
      alert(`${newName} is already added to phonebook`);
      return;
    }

    const person = { name: newName, number: newNumber };

    setPersons(persons.concat(person));
    console.log("add person:", person);

    setNewName("");
    setNewNumber("");
  };

  const handleKeywordChange = (event: ChangeEvent<HTMLInputElement>) => {
    console.log("keyword:", event.target.value);

    setKeyword(event.target.value);
  };

  const handleNameChange = (event: ChangeEvent<HTMLInputElement>) => {
    console.log("new name:", event.target.value);

    setNewName(event.target.value);
  };

  const handleNumberChange = (event: ChangeEvent<HTMLInputElement>) => {
    console.log("new name:", event.target.value);

    setNewNumber(event.target.value);
  };

  return (
    <div>
      <h2>Phonebook</h2>

      <FilterForm
        handleKeywordChange={handleKeywordChange}
        keywordValue={keyword}
      />

      <h3>Add a new</h3>
      <AddPersonForm
        handleAddPerson={handleAddPerson}
        handleNameChange={handleNameChange}
        handleNumberChange={handleNumberChange}
        newName={newName}
        newNumber={newNumber}
      />

      <h3>Numbers</h3>
      <PersonList persons={persons} keyword={keyword} />
    </div>
  );
};

export default App;
