import TestAgent from "supertest/lib/agent";

const getToken = async (
  api: TestAgent,
  user: { username: string; password: string }
) => {
  const response = await api
    .post("/api/login")
    .send({ username: user.username, password: user.password });

  return response.body.token;
};

export default { getToken };
