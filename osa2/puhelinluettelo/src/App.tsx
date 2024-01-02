import { useEffect, useMemo, useState } from "react";
import AddPersonForm from "./components/AddPersonForm";
import FilterForm from "./components/FilterForm";
import Notification from "./components/Notification";
import PersonList from "./components/PersonList";
import Person from "./entities/Person";
import {
  handleAddPerson,
  handleKeywordChange,
  handleNameChange,
  handleNumberChange,
} from "./services/handlers";
import personService from "./services/personService";
import Message from "./interfaces/Message";

const App = () => {
  const [persons, setPersons] = useState(new Array<Person>());
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [keyword, setKeyword] = useState("");
  const [message, setMessage] = useState<Message>({ message: "", type: "" });

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
      <Notification message={message} />
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
      {useMemo(
        () => (
          <PersonList
            persons={persons}
            keyword={keyword}
            setPersons={setPersons}
            setMessage={setMessage}
          />
        ),
        [keyword, persons]
      )}
    </div>
  );
};

export default App;
