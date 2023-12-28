import { useEffect, useState } from "react";
import PersonList from "./components/PersonList";
import FilterForm from "./components/FilterForm";
import AddPersonForm from "./components/AddPersonForm";
import { Person } from "./components/PersonList";
import axios from "axios";
import { AxiosResponse } from "axios";
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
      <PersonList persons={persons} keyword={keyword} />
    </div>
  );
};

export default App;
