import axios from "axios";
import Person from "../entities/Person";
const baseUrl = "http://localhost:3001/persons";

const create = (newPerson: Person) => {
  return axios
    .post(baseUrl, newPerson)
    .catch((error) => console.log("Add person failed", error));
};

export default { create };
