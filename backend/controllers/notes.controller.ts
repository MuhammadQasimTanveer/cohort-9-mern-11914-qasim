import { Response } from "express";
import mongoose from "mongoose";
import { AuthRequest } from "../middleware/auth.middleware";
import { Note, getDefaultNoteContent } from "../models/note.model";
import { serializeNote } from "../utils/noteSerializer";

const isValidObjectId = (id: string) => mongoose.Types.ObjectId.isValid(id);

export const getNotes = async (req: AuthRequest, res: Response) => {
  try {
    const notes = await Note.find({ user: req.userId }).sort({ updatedAt: -1 });

    res.status(200).json({
      notes: notes.map(serializeNote),
    });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unknown error";
    res.status(500).json({ message: "Server error", error: message });
  }
};

export const getNoteById = async (req: AuthRequest, res: Response) => {
  try {
    const { id } = req.params;

    if (!isValidObjectId(id)) {
      return res.status(400).json({ message: "Invalid note id" });
    }

    const note = await Note.findOne({ _id: id, user: req.userId });

    if (!note) {
      return res.status(404).json({ message: "Note not found" });
    }

    res.status(200).json({ note: serializeNote(note) });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unknown error";
    res.status(500).json({ message: "Server error", error: message });
  }
};

export const createNote = async (req: AuthRequest, res: Response) => {
  try {
    const { title, content, tag } = req.body;

    const note = await Note.create({
      user: req.userId,
      title: typeof title === "string" && title.trim() ? title.trim() : "Untitled Note",
      content:
        content && typeof content === "object" && !Array.isArray(content)
          ? content
          : getDefaultNoteContent(),
      tag: typeof tag === "string" ? tag.trim() : "",
    });

    res.status(201).json({
      message: "Note created successfully",
      note: serializeNote(note),
    });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unknown error";
    res.status(500).json({ message: "Server error", error: message });
  }
};

export const updateNote = async (req: AuthRequest, res: Response) => {
  try {
    const { id } = req.params;
    const { title, content, tag } = req.body;

    if (!isValidObjectId(id)) {
      return res.status(400).json({ message: "Invalid note id" });
    }

    const updateFields: Partial<{ title: string; content: Record<string, unknown>; tag: string }> = {};

    if (title !== undefined) {
      if (typeof title !== "string") {
        return res.status(400).json({ message: "Title must be a string" });
      }
      updateFields.title = title.trim() || "Untitled Note";
    }

    if (content !== undefined) {
      if (typeof content !== "object" || content === null || Array.isArray(content)) {
        return res.status(400).json({ message: "Content must be a valid JSON object" });
      }
      updateFields.content = content;
    }

    if (tag !== undefined) {
      if (typeof tag !== "string") {
        return res.status(400).json({ message: "Tag must be a string" });
      }
      updateFields.tag = tag.trim();
    }

    if (Object.keys(updateFields).length === 0) {
      return res.status(400).json({ message: "At least one field is required to update" });
    }

    const note = await Note.findOneAndUpdate(
      { _id: id, user: req.userId },
      { $set: updateFields },
      { new: true, runValidators: true }
    );

    if (!note) {
      return res.status(404).json({ message: "Note not found" });
    }

    res.status(200).json({
      message: "Note saved successfully",
      note: serializeNote(note),
    });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unknown error";
    res.status(500).json({ message: "Server error", error: message });
  }
};

export const deleteNote = async (req: AuthRequest, res: Response) => {
  try {
    const { id } = req.params;

    if (!isValidObjectId(id)) {
      return res.status(400).json({ message: "Invalid note id" });
    }

    const note = await Note.findOneAndDelete({ _id: id, user: req.userId });

    if (!note) {
      return res.status(404).json({ message: "Note not found" });
    }

    res.status(200).json({
      message: "Note deleted successfully",
      note: serializeNote(note),
    });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unknown error";
    res.status(500).json({ message: "Server error", error: message });
  }
};
