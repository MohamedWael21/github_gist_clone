import mongoose, { Schema, Model } from "mongoose";
import { IComment } from "@/types/models";

const commentSchema = new Schema<IComment>(
  {
    author: { type: Schema.Types.ObjectId, ref: "User", required: true },
    gist: { type: Schema.Types.ObjectId, ref: "Gist", required: true },
    content: { type: String, required: true },
  },
  {
    timestamps: true,
    toObject: {
      transform: (doc, ret) => {
        ret._id = doc._id.toString();
        return ret;
      },
    },
  }
);

const Comment =
  (mongoose.models.Comment as Model<IComment>) ||
  mongoose.model<IComment>("Comment", commentSchema);

export default Comment;
