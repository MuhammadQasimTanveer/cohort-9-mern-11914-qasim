import { expect } from "chai";
import {
  createNote,
  deleteNote,
  getNoteById,
  getNotes,
  updateNote,
} from "../controllers/notes.controller.js";
import { Note } from "../models/note.model.js";

type MockResponse = {
  statusCode: number;
  body: any;
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

const mockNoteDoc = {
  _id: { toString: () => "507f1f77bcf86cd799439011" },
  user: "507f1f77bcf86cd799439012",
  title: "Project Roadmap",
  content: { type: "doc", content: [{ type: "paragraph" }] },
  tag: "Work",
  createdAt: new Date("2025-05-18T09:00:00.000Z"),
  updatedAt: new Date("2025-05-20T08:00:00.000Z"),
};

const originalFind = Note.find;
const originalFindOne = Note.findOne;
const originalFindOneAndUpdate = Note.findOneAndUpdate;
const originalFindOneAndDelete = Note.findOneAndDelete;
const originalCreate = Note.create;

describe("Notes Controller", () => {
  afterEach(() => {
    Note.find = originalFind;
    Note.findOne = originalFindOne;
    Note.findOneAndUpdate = originalFindOneAndUpdate;
    Note.findOneAndDelete = originalFindOneAndDelete;
    Note.create = originalCreate;
  });

  describe("getNotes", () => {
    it("should return notes for the authenticated user", async () => {
      Note.find = (() => ({
        sort: async () => [mockNoteDoc],
      })) as any;

      const req = { userId: "507f1f77bcf86cd799439012" } as any;
      const res = createMockResponse();

      await getNotes(req, res as any);

      expect(res.statusCode).to.equal(200);
      expect(res.body.notes).to.have.lengthOf(1);
      expect(res.body.notes[0].title).to.equal("Project Roadmap");
      expect(res.body.notes[0].id).to.equal("507f1f77bcf86cd799439011");
    });
  });

  describe("getNoteById", () => {
    it("should return 400 for invalid note id", async () => {
      const req = { params: { id: "invalid-id" }, userId: "507f1f77bcf86cd799439012" } as any;
      const res = createMockResponse();

      await getNoteById(req, res as any);

      expect(res.statusCode).to.equal(400);
      expect(res.body.message).to.equal("Invalid note id");
    });

    it("should return 404 when note is not found", async () => {
      Note.findOne = (async () => null) as any;

      const req = { params: { id: "507f1f77bcf86cd799439011" }, userId: "507f1f77bcf86cd799439012" } as any;
      const res = createMockResponse();

      await getNoteById(req, res as any);

      expect(res.statusCode).to.equal(404);
      expect(res.body.message).to.equal("Note not found");
    });
  });

  describe("createNote", () => {
    it("should create a note with default values", async () => {
      Note.create = (async (payload: any) => ({
        ...mockNoteDoc,
        title: payload.title,
        content: payload.content,
        tag: payload.tag,
      })) as any;

      const req = { userId: "507f1f77bcf86cd799439012", body: {} } as any;
      const res = createMockResponse();

      await createNote(req, res as any);

      expect(res.statusCode).to.equal(201);
      expect(res.body.message).to.equal("Note created successfully");
      expect(res.body.note.title).to.equal("Untitled Note");
    });
  });

  describe("updateNote", () => {
    it("should return 400 when no update fields are provided", async () => {
      const req = {
        params: { id: "507f1f77bcf86cd799439011" },
        userId: "507f1f77bcf86cd799439012",
        body: {},
      } as any;
      const res = createMockResponse();

      await updateNote(req, res as any);

      expect(res.statusCode).to.equal(400);
      expect(res.body.message).to.equal("At least one field is required to update");
    });

    it("should update note fields for autosave payload", async () => {
      Note.findOneAndUpdate = (async () => ({
        ...mockNoteDoc,
        title: "Updated Title",
        tag: "Memo",
      })) as any;

      const req = {
        params: { id: "507f1f77bcf86cd799439011" },
        userId: "507f1f77bcf86cd799439012",
        body: {
          title: "Updated Title",
          content: { type: "doc", content: [{ type: "paragraph", content: [{ type: "text", text: "Hello" }] }] },
          tag: "Memo",
        },
      } as any;
      const res = createMockResponse();

      await updateNote(req, res as any);

      expect(res.statusCode).to.equal(200);
      expect(res.body.message).to.equal("Note saved successfully");
      expect(res.body.note.title).to.equal("Updated Title");
      expect(res.body.note.tag).to.equal("Memo");
    });
  });

  describe("deleteNote", () => {
    it("should delete a note successfully", async () => {
      Note.findOneAndDelete = (async () => mockNoteDoc) as any;

      const req = {
        params: { id: "507f1f77bcf86cd799439011" },
        userId: "507f1f77bcf86cd799439012",
      } as any;
      const res = createMockResponse();

      await deleteNote(req, res as any);

      expect(res.statusCode).to.equal(200);
      expect(res.body.message).to.equal("Note deleted successfully");
      expect(res.body.note.id).to.equal("507f1f77bcf86cd799439011");
    });
  });
});
