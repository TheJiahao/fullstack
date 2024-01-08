import mongoose from "mongoose";
import supertest from "supertest";
import app from "../../../app";
import User from "../../../models/user";
import helper from "./helper";

const api = supertest(app);

afterAll(async () => {
  await mongoose.connection.close();
});

describe("getting users", () => {
  beforeEach(async () => {
    await User.deleteMany({});
    await User.insertMany(helper.initialUsers);
  });

  test("succeeds", async () => {
    await api.get(helper.baseRoute).expect(200);
  });

  test("returns correct amount of users", async () => {
    const response = await api.get(helper.baseRoute);
    expect(response.body).toHaveLength(helper.initialUsers.length);
  });

  test("does not return password or hash", async () => {
    const response = await api.get(helper.baseRoute);

    for (const user of response.body) {
      expect(user.password).toBeUndefined();
      expect(user.passwordHash).toBeUndefined();
    }
  });

  test("return users with username, name and id", async () => {
    const response = await api.get(helper.baseRoute);

    for (const user of response.body) {
      expect(user).toHaveProperty("username");
      expect(user).toHaveProperty("name");
      expect(user).toHaveProperty("id");
    }
  });
});
