import {
  ChangeEvent,
  ChangeEventHandler,
  FormEvent,
  FormEventHandler,
} from "react";
import Person from "../entities/Person";
import personService from "./personService";

function clearFields(...setters: CallableFunction[]) {
  for (const setField of setters) {
    setField("");
  }
}

const showSuccessMessage = (message: string, setMessage: CallableFunction) => {
  setMessage({ message: message, type: "success" });

  setTimeout(() => {
    setMessage({ message: null, type: null });
  }, 500000);
};

const handleAddPerson = (
  newName: string,
  newNumber: string,
  persons: Person[],
  setPersons: CallableFunction,
  setNewName: CallableFunction,
  setNewNumber: CallableFunction,
  setMessage: CallableFunction
): FormEventHandler<HTMLFormElement> => {
  return (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const newPerson = new Person(newName, newNumber);

    for (const person of persons) {
      if (person.name === newPerson.name) {
        if (person.id === null) {
          throw new Error("Error, the id of person is null");
        }

        if (
          !window.confirm(
            `${newPerson.name} is already added to phonebook, replace the old number with a new one?`
          )
        ) {
          return;
        }

        newPerson.id = person.id;
        updatePerson(newPerson, persons, setPersons);

        clearFields(setNewName, setNewNumber);

        showSuccessMessage(`Updated ${newPerson.name}`, setMessage);
        return;
      }
    }

    console.log("Adding person", newPerson);

    personService
      .create(newPerson)
      .then((returnedPerson) => {
        setPersons(persons.concat(returnedPerson));
        console.log("Added person:", newPerson);
      })
      .catch((error) => console.log("Add person failed", error));

    clearFields(setNewName, setNewNumber);

    showSuccessMessage(`Added ${newPerson.name}`, setMessage);
  };
};

const updatePerson = (
  newPerson: Person,
  persons: Person[],
  setPersons: CallableFunction
) => {
  personService.update(newPerson).then((returnedPerson) => {
    console.log("Returned person", returnedPerson);

    setPersons(
      persons.map((person) =>
        person.id === returnedPerson.id ? returnedPerson : person
      )
    );
  });

  return;
};

const handleKeywordChange = (
  setKeyword: CallableFunction
): ChangeEventHandler<HTMLInputElement> => {
  return (event: ChangeEvent<HTMLInputElement>) => {
    console.log("keyword:", event.target.value);

    setKeyword(event.target.value);
  };
};

const handleNameChange = (
  setNewName: CallableFunction
): ChangeEventHandler<HTMLInputElement> => {
  return (event: ChangeEvent<HTMLInputElement>) => {
    console.log("new name:", event.target.value);

    setNewName(event.target.value);
  };
};

const handleNumberChange = (
  setNewNumber: CallableFunction
): ChangeEventHandler<HTMLInputElement> => {
  return (event: ChangeEvent<HTMLInputElement>) => {
    console.log("new number:", event.target.value);

    setNewNumber(event.target.value);
  };
};

const handleRemovePerson = (
  person: Person,
  persons: Array<Person>,
  setPersons: CallableFunction,
  setMessage: CallableFunction
) => {
  return () => {
    if (!window.confirm(`Delete ${person.name}?`)) {
      return;
    }

    if (person.id === null) {
      console.log("Remove person failed:", "id of", person, "is", null);

      return;
    }

    personService
      .remove(person.id)
      .then(() => {
        console.log("Removed person", person);

        setPersons(persons.filter((item) => item.id !== person.id));
      })
      .catch((error) => console.log("Remove person failed", error));

    showSuccessMessage(`Removed ${person.name}`, setMessage);
  };
};

export {
  handleAddPerson,
  handleKeywordChange,
  handleNameChange,
  handleNumberChange,
  handleRemovePerson,
};
