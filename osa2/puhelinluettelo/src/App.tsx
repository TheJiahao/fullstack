import axios, { AxiosResponse } from "axios";
import { useEffect, useState } from "react";
import AddPersonForm from "./components/AddPersonForm";
import FilterForm from "./components/FilterForm";
import PersonList from "./components/PersonList";
import Person from "./entities/Person";
import {
  handleAddPerson,
  handleKeywordChange,
  handleNameChange,
  handleNumberChange,
} from "./services/handlers";

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

  console.log("Persons", persons);
  console.log("Rendered", persons.length, "persons");

  return (
    <div>
      <h2>Phonebook</h2>

      <FilterForm
        handleKeywordChange={handleKeywordChange(setKeyword)}
        keywordValue={keyword}
      />

      <h3>Add a new</h3>
      <AddPersonForm
        handleAddPerson={handleAddPerson(
          new Person(newName, newNumber),
          persons,
          setPersons,
          setNewName,
          setNewNumber
        )}
        handleNameChange={handleNameChange(setNewName)}
        handleNumberChange={handleNumberChange(setNewNumber)}
        newName={newName}
        newNumber={newNumber}
      />

      <h3>Numbers</h3>
      <PersonList persons={persons} keyword={keyword} setPersons={setPersons} />
    </div>
  );
};

export default App;
