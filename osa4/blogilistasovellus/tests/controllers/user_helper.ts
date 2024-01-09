import User from "../../models/user";

const initialUsers = [
  { username: "user1", name: "Etunimi Sukunimi", password: "1234" },
  { username: "user2", name: "Nimi", password: "123456" },
];

const baseRoute = "/api/users";

const getAllUsers = async () => {
  return User.find({});
};

export default { initialUsers, baseRoute, getAllUsers };
