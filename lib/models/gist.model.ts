import mongoose, { Schema, Model } from "mongoose";

import { IGist } from "@/types/models";

const gistSchema = new Schema<IGist>(
  {
    name: { type: String, required: true },
    author: { type: Schema.Types.ObjectId, ref: "User", required: true },
    description: { type: String },
    stars: [{ type: Schema.Types.ObjectId, ref: "User" }],
  },
  {
    timestamps: true,
    toObject: {
      transform: (doc, ret) => {
        ret._id = doc._id.toString();
        ret.author = doc.author.toString();
        return ret;
      },
    },
  }
);

export default (mongoose.models.Gist as Model<IGist>) ||
  mongoose.model<IGist>("Gist", gistSchema);
