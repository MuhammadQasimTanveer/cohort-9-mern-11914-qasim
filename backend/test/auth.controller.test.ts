import { expect } from "chai";
import bcrypt from "bcryptjs";
import { login, signup } from "../controllers/auth.controller.js";
import { User } from "../models/user.model.js";

type MockResponse = { statusCode: number; body: any;
  status: (code: number) => MockResponse;
  json: (payload: any) => MockResponse;
};

const createMockResponse = (): MockResponse => {
  const res: MockResponse = {
    statusCode: 200,
    body: undefined,
    status(code: number) {
      this.statusCode = code;
      return this;
    },
    json(payload: any) {
      this.body = payload;
      return this;
    },
  };
  return res;
};
const originalFindOne = User.findOne;
const originalCreate = User.create;

describe("Auth Controller", () => {
  before(() => {
    process.env.JWT_SECRET = process.env.JWT_SECRET || "test-jwt-secret";
  });

  afterEach(() => {
    User.findOne = originalFindOne;
    User.create = originalCreate;
  });

  describe("signup", () => {
    it("should return 400 when required fields are missing", async () => {
      const req = {
        body: { fullName: "", email: "john@example.com", password: "Password1" },
      } as any;
      const res = createMockResponse();
      await signup(req, res as any);
      expect(res.statusCode).to.equal(400);
      expect(res.body).to.deep.equal({ message: "All fields are required!" });
    });

    it("should return 400 when user already exists", async () => {
      User.findOne = (async () => ({ _id: "existing-user-id" })) as any;
      const req = {
        body: { fullName: "John Doe", email: "john@example.com", password: "Password1" },
      } as any;
      const res = createMockResponse();

      await signup(req, res as any);

      expect(res.statusCode).to.equal(400);
      expect(res.body).to.deep.equal({ message: "User already exists!" });
    });

    it("should create a user and return token + user payload", async () => {
      User.findOne = (async () => null) as any;
      User.create = (async (payload: any) => ({
        _id: { toString: () => "new-user-id" },
        fullName: payload.fullName,
        email: payload.email,
        password: payload.password,
      })) as any;

      const req = {
        body: {
          fullName: "John Doe",
          email: "john@example.com",
          password: "Password1",
        },
      } as any;
      const res = createMockResponse();

      await signup(req, res as any);

      expect(res.statusCode).to.equal(201);
      expect(res.body).to.have.property("token").that.is.a("string");
      expect(res.body.user.fullName).to.equal("John Doe");
      expect(res.body.user.email).to.equal("john@example.com");
      expect(String(res.body.user.id)).to.equal("new-user-id");
    });
  });
  describe("login", () => {
    it("should return 400 when required fields are missing", async () => {
      const req = { body: { email: "", password: "" } } as any;
      const res = createMockResponse();

      await login(req, res as any);

      expect(res.statusCode).to.equal(400);
      expect(res.body).to.deep.equal({ message: "All fields are required!" });
    });

    it("should return 400 when user does not exist", async () => {
      User.findOne = (async () => null) as any;

      const req = { body: { email: "john@example.com", password: "Password1" } } as any;
      const res = createMockResponse();

      await login(req, res as any);
      expect(res.statusCode).to.equal(400);
      expect(res.body).to.deep.equal({ message: "Invalid credentials" });
    });

    it("should return 400 when password is incorrect", async () => {
      User.findOne = (async () => ({
        _id: { toString: () => "user-id" },
        fullName: "John Doe",
        email: "john@example.com",
        password: "hashed-password-for-different-value",
      })) as any;

      const req = { body: { email: "john@example.com", password: "Password1" } } as any;
      const res = createMockResponse();

      await login(req, res as any);

      expect(res.statusCode).to.equal(400);
      expect(res.body).to.deep.equal({ message: "Invalid credentials" });
    });
    it("should return token plus user payload for valid credentials", async () => {
      const hashedPassword = await bcrypt.hash("Password1", 10);
      User.findOne = (async () => ({
        _id: { toString: () => "user-id" },
        fullName: "John Doe",
        email: "john@example.com",
        password: hashedPassword,
      })) as any;
      const req = { body: { email: "john@example.com", password: "Password1" } } as any;
      const res = createMockResponse();
      await login(req, res as any);
      expect(res.statusCode).to.equal(201);
      expect(res.body).to.have.property("token").that.is.a("string");
      expect(res.body.user.fullName).to.equal("John Doe");
      expect(res.body.user.email).to.equal("john@example.com");
      expect(String(res.body.user.id)).to.equal("user-id");
    });
  });
});