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

  test("fails with too short username", async () => {
    const user = {
      username: "co",
      name: "Cool User",
      password: "aiosjaiasds12312o",
    };

    const response = await api.post(helper.baseRoute).send(user).expect(400);

    expect(response.body.error).toMatch(/minimum allowed length \(3\)/);
  });

  test("fails with existing username", async () => {
    const user = helper.initialUsers[0];

    const response = await api.post(helper.baseRoute).send(user).expect(400);

    expect(response.body.error).toMatch(/username[\s\S]*unique/);
  });
});
