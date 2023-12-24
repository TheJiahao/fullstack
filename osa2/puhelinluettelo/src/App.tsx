import { ChangeEvent, FormEvent, useState } from "react";
import PersonList from "./components/Persons";

const App = () => {
  const [persons, setPersons] = useState([{ name: "Arto Hellas" }]);
  const [newName, setNewName] = useState("");

  const addNumber = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log("button clicked");

    setPersons(persons.concat({ name: newName }));
  };

  const handleNameChange = (event: ChangeEvent<HTMLInputElement>) => {
    console.log(event.target.value);

    setNewName(event.target.value);
  };

  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={addNumber}>
        <div>
          name: <input value={newName} onChange={handleNameChange} />
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
