import { IUser } from "@/types/models";
import mongoose, { Schema, Model } from "mongoose";

const userSchema = new Schema<IUser>(
  {
    id: { type: Number, required: true },
    username: { type: String, required: true },
    name: { type: String, required: true },
    email: { type: String, required: true },
    image: { type: String, required: true },
    company: String,
    location: String,
    twitterName: String,
    following: { type: Number, required: true },
    followers: { type: Number, required: true },
    bio: String,
    joinOn: { type: Date, default: Date.now },
    starred: [{ type: Schema.Types.ObjectId, ref: "Gist" }],
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

const User =
  (mongoose.models.User as Model<IUser>) ||
  mongoose.model<IUser>("User", userSchema);

export default User;
