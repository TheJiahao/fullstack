import axios from "axios";
import { Person } from "../components/PersonList";
const baseUrl = "http://localhost:3001/persons";

const create = (newPerson: Person) => {
  return axios
    .post<Person>(baseUrl, newPerson)
    .catch((error) => console.log("Add person failed", error));
};

export default { create };
