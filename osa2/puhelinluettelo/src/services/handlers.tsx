import {
  ChangeEvent,
  ChangeEventHandler,
  FormEvent,
  FormEventHandler,
} from "react";
import { Person } from "../components/PersonList";
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

    personService.create(newPerson);

    setPersons(persons.concat(newPerson));
    console.log("add person:", newPerson);

    setNewName("");
    setNewNumber("");
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

export {
  handleAddPerson,
  handleKeywordChange,
  handleNameChange,
  handleNumberChange
};

