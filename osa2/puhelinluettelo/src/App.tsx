import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import PersonList from "./components/PersonList";
import FilterForm from "./components/FilterForm";
import AddPersonForm from "./components/AddPersonForm";
import { Person } from "./components/PersonList";
import axios from "axios";
import { AxiosResponse } from "axios";

const App = () => {
  const [persons, setPersons] = useState(new Array<Person>());
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [keyword, setKeyword] = useState("");

  useEffect(() => {
    axios
      .get("http://localhost:3001/persons")
      .then((response: AxiosResponse<Person[]>) => {
        console.log("promise fullfilled");

        setPersons(response.data);
      });
  }, []);

  console.log("Rendered", persons.length, "persons");

  const handleAddPerson = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (persons.map((person) => person.name).includes(newName)) {
      alert(`${newName} is already added to phonebook`);
      return;
    }

    const person = new Person(newName, newNumber);

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
    console.log("new number:", event.target.value);

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
