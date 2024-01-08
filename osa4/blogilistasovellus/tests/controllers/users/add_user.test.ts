import mongoose from "mongoose";
import supertest from "supertest";
import app from "../../../app";
import User from "../../../models/user";
import helper from "./helper";

const api = supertest(app);

afterAll(async () => {
  await mongoose.connection.close();
});

describe("adding user", () => {
  beforeEach(async () => {
    await User.deleteMany({});
    await User.insertMany(helper.initialUsers);
  });

  test("succeeds with a valid user", async () => {
    const user = {
      username: "cooluser",
      name: "Cool User",
      password: "aiosjaiasds12312o",
    };

    await api
      .post(helper.baseRoute)
      .send(user)
      .expect(201)
      .expect("Content-Type", /application\/json/);
  });
});
