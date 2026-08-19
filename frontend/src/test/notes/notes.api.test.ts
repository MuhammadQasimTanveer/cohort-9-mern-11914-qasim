import { describe, it, expect, vi, beforeEach } from "vitest";

const mocked = vi.hoisted(() => ({
  get: vi.fn(),
  post: vi.fn(),
  put: vi.fn(),
  delete: vi.fn(),
}));

vi.mock("../../api/axiosInstance", () => ({
  default: {
    get: mocked.get,
    post: mocked.post,
    put: mocked.put,
    delete: mocked.delete,
  },
}));

import { notesAPI } from "../../api/notes";

describe("notesAPI", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("calls GET /notes in getNotes", () => {
    notesAPI.getNotes();

    expect(mocked.get).toHaveBeenCalledWith("/notes");
  });

  it("calls GET /notes/:id in getNoteById", () => {
    notesAPI.getNoteById("note-123");

    expect(mocked.get).toHaveBeenCalledWith("/notes/note-123");
  });

  it("calls POST /notes with default empty payload in createNote", () => {
    notesAPI.createNote();

    expect(mocked.post).toHaveBeenCalledWith("/notes", {});
  });

  it("calls POST /notes with provided payload in createNote", () => {
    const payload = { title: "My note", tag: "Work" };

    notesAPI.createNote(payload);

    expect(mocked.post).toHaveBeenCalledWith("/notes", payload);
  });

  it("calls PUT /notes/:id in updateNote", () => {
    const payload = { title: "Updated title" };

    notesAPI.updateNote("note-123", payload);

    expect(mocked.put).toHaveBeenCalledWith("/notes/note-123", payload);
  });

  it("calls DELETE /notes/:id in deleteNote", () => {
    notesAPI.deleteNote("note-123");

    expect(mocked.delete).toHaveBeenCalledWith("/notes/note-123");
  });
});
