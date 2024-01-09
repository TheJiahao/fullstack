import TestAgent from "supertest/lib/agent";
import User from "../../models/user";

const initialUsers = [
  { username: "user1", name: "Etunimi Sukunimi", password: "1234" },
  { username: "user2", name: "Nimi", password: "123456" },
];

const addInitialUsers = async (api: TestAgent) => {
  const promiseArray = initialUsers.map((user) =>
    api.post("/api/users").send(user)
  );
  await Promise.all(promiseArray);
};

const baseRoute = "/api/users";

const getAllUsers = async () => {
  return User.find({});
};

export default { initialUsers, addInitialUsers, baseRoute, getAllUsers };
