import mongoose, { Document, Schema, Types } from "mongoose";

export interface INote extends Document {
  user: Types.ObjectId;
  title: string;
  content: Record<string, unknown>;
  tag: string;
  createdAt: Date;
  updatedAt: Date;
}

const emptyNoteContent = {
  type: "doc",
  content: [{ type: "paragraph" }],
};

const noteSchema = new Schema<INote>(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },
    title: {
      type: String,
      required: true,
      trim: true,
      default: "Untitled Note",
    },
    content: {
      type: Schema.Types.Mixed,
      default: emptyNoteContent,
    },
    tag: {
      type: String,
      trim: true,
      default: "",
    },
  },
  { timestamps: true }
);

noteSchema.index({ user: 1, updatedAt: -1 });

export const Note = mongoose.model<INote>("Note", noteSchema);

export const getDefaultNoteContent = () => ({ ...emptyNoteContent });
