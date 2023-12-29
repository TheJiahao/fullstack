import axios from "axios";
import Person from "../entities/Person";
const baseUrl = "http://localhost:3001/persons";

const create = (newPerson: Person): Promise<Person> => {
  const request = axios.post(baseUrl, newPerson);

  console.log(request);

  return request.then((response) => response.data);
};

const remove = (id: number) => {
  return axios.delete(`${baseUrl}/${id}`).then((response) => response.data);
};

export default { create, remove };
