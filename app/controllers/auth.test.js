const request = require("supertest");
const app = require("../app");
const mongoose = require("mongoose");
const http = require("http");
const uriDB = process.env.DB_HOST;
mongoose.connect(uriDB);
const { PORT = 33333 } = process.env;
const payload = {
  email: "billyharington@mail.com",
  password: "quiteComplicated",
};
const server = http.createServer(app);
describe("login controller test", () => {
  beforeAll(() => {
    server.listen(PORT);
  });
  afterAll(() => {
    mongoose.connection.close();
    server.close();
  });
  it("login controller returns response with status code 200", async () => {
    const response = await request(app).post("/api/users/login").send(payload);

    expect(response.status).toBe(200);
  });
  it("response should return token", async () => {
    const response = await request(app).post("/api/users/login").send(payload);
    expect(response.body.token).not.toBe(undefined);
  });
  it("response should contain an object with fields 'email' and 'subscription' both with data type of String", async () => {
    const response = await request(app).post("/api/users/login").send(payload);
    expect(typeof response.body.user.email).toBe("string");
    expect(typeof response.body.user.subscription).toBe("string");
  });
});
