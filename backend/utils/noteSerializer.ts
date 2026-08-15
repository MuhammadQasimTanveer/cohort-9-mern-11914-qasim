import { INote } from "../models/note.model";

export interface NoteResponse {
  id: string;
  title: string;
  content: Record<string, unknown>;
  tag: string;
  createdAt: string;
  updatedAt: string;
}

export const serializeNote = (note: INote): NoteResponse => ({
  id: note._id.toString(),
  title: note.title,
  content: (note.content as Record<string, unknown>) ?? { type: "doc", content: [{ type: "paragraph" }] },
  tag: note.tag ?? "",
  createdAt: note.createdAt.toISOString(),
  updatedAt: note.updatedAt.toISOString(),
});
