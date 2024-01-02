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
import Notification from "./components/Notification";
import personService from "./services/personService";

const App = () => {
  const [persons, setPersons] = useState(new Array<Person>());
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [keyword, setKeyword] = useState("");
  const [message, setMessage] = useState({ message: null, type: null });

  useEffect(() => {
    personService
      .getAllPersons()
      .then((returnedPersons) => setPersons(returnedPersons));
  }, []);

  console.log("Persons", persons);
  console.log("Rendered", persons.length, "persons");

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={message.message} type={message.type} />
      <FilterForm
        handleKeywordChange={handleKeywordChange(setKeyword)}
        keywordValue={keyword}
      />

      <h3>Add a new</h3>
      <AddPersonForm
        handleAddPerson={handleAddPerson(
          newName,
          newNumber,
          persons,
          setPersons,
          setNewName,
          setNewNumber,
          setMessage
        )}
        handleNameChange={handleNameChange(setNewName)}
        handleNumberChange={handleNumberChange(setNewNumber)}
        newName={newName}
        newNumber={newNumber}
      />

      <h3>Numbers</h3>
      <PersonList
        persons={persons}
        keyword={keyword}
        setPersons={setPersons}
        setMessage={setMessage}
      />
    </div>
  );
};

export default App;
