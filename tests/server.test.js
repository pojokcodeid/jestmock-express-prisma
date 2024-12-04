import request from "supertest";
import { mockDeep, mockReset } from "jest-mock-extended";
import prisma from "../src/prismaClient.js";
import app from "../src/server.js";

jest.mock("../src/prismaClient.js", () => ({
  __esModule: true,
  default: mockDeep(),
}));

beforeEach(() => {
  mockReset(prisma);
});

beforeAll((done) => {
  app.listen(4000, () => {
    global.agent = request.agent(app);
    done();
  });
});

afterAll(async () => {
  await prisma.$disconnect();
});

describe("GET /api/user/:id", () => {
  it("should return user data if user is found", async () => {
    const userId = 1;
    const user = { id: userId, name: "John Doe", email: "john@example.com" };

    prisma.user.findUnique.mockResolvedValue(user);

    const response = await global.agent.get(`/api/user/${userId}`);

    expect(response.status).toBe(200);
    expect(response.body).toEqual(user);
  });

  it("should return 404 if user is not found", async () => {
    const userId = 2;

    prisma.user.findUnique.mockResolvedValue(null);

    const response = await global.agent.get(`/api/user/${userId}`);

    expect(response.status).toBe(404);
    expect(response.body).toEqual({ error: "User not found" });
  });
});
