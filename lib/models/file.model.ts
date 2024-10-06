import mongoose, { Schema, Model } from "mongoose";
import { IFile } from "@/types/models";

const fileSchema = new Schema<IFile>(
  {
    name: { type: String, required: true },
    content: { type: String, required: true },
    gist: { type: Schema.Types.ObjectId, ref: "Gist", required: true },
    lang: { type: String, required: true },
  },
  {
    toObject: {
      transform: (doc, ret) => {
        ret._id = doc._id.toString();
        return ret;
      },
    },
  }
);

const File =
  (mongoose.models.File as Model<IFile>) ||
  mongoose.model<IFile>("File", fileSchema);

export default File;
