import {
  ChangeEvent,
  ChangeEventHandler,
  FormEvent,
  FormEventHandler,
} from "react";
import Person from "../entities/Person";
import personService from "./personService";

const handleAddPerson = (
  newPerson: Person,
  persons: Person[],
  setPersons: CallableFunction,
  setNewName: CallableFunction,
  setNewNumber: CallableFunction
): FormEventHandler<HTMLFormElement> => {
  return (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (persons.map((person) => person.name).includes(newPerson.name)) {
      alert(`${newPerson.name} is already added to phonebook`);
      return;
    }

    personService
      .create(newPerson)
      .then((returnedPerson) => {
        setPersons(persons.concat(returnedPerson));
        console.log("Added person:", newPerson);

        setNewName("");
        setNewNumber("");
      })
      .catch((error) => console.log("Add person failed", error));
  };
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
  id: number,
  persons: Array<Person>,
  setPersons: CallableFunction
) => {
  return () => {
    personService
      .remove(id)
      .then(() => {
        console.log("Removed person with id:", id);

        setPersons(persons.filter((person) => person.id !== id));
      })
      .catch((error) => console.log("Remove person failed", error));
  };
};

export {
  handleAddPerson,
  handleKeywordChange,
  handleNameChange,
  handleNumberChange,
  handleRemovePerson,
};
