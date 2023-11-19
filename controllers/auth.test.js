
const request = require("supertest");
const app = require("../app");

const payload = { email: "billyharington@mail.com", password: "quiteComplicated" };
describe("login controller test", () => {
let server;
    beforeAll(()=> server = app.listen(3000));
    afterAll(()=> server.close());
  it("login controller returns response with status code 200", async () => {
    const response = await request(app)
      .post("/api/users/login")
      .send(payload)
    
    expect(response.status).toBe(200);
  });
  it("response should return token", async () => {
    const response = await request(app)
      .post("/api/users/login")
      .send(payload);
    expect(response.token).toBe(!undefined);
  });
  it("response should contain an object with field email and subscription with data type of String", async () => {
    const response = await request(app)
      .post("/api/users/login")
      .send(payload);
    expect(typeof response.email).toBe("string");
    expect(typeof response.subscription).toBe("string");
  });
});

