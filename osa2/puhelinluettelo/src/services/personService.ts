import axios from "axios";
import Person from "../entities/Person";
const baseUrl = "http://localhost:3001/api";

const getAllPersons = () => {
  return axios.get(`${baseUrl}/persons`).then((response) => response.data);
};

const create = (newPerson: Person): Promise<Person> => {
  return axios.post(baseUrl, newPerson).then((response) => response.data);
};

const remove = (id: number) => {
  return axios.delete(`${baseUrl}/${id}`).then((response) => response.data);
};

const update = (newPerson: Person): Promise<Person> => {
  return axios
    .put(`${baseUrl}/${newPerson.id}`, newPerson)
    .then((response) => response.data);
};

export default { getAllPersons, create, remove, update };
