"use server";
import { CreateIGist } from "@/types/models";
import connectToDB from "../mongoose";
import Gist from "../models/gist.model";
import File from "../models/file.model";
import mongoose from "mongoose";
import User from "../models/user.model";

export async function createGist(gist: CreateIGist) {
  await connectToDB();
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    const newGist = new Gist({
      name: gist.name,
      author: gist.author,
      description: gist.description,
    });

    await newGist.save({ session });

    const createdFiles = gist.files.map((file) => ({
      gist: newGist._id,
      name: file.name,
      lang: file.lang,
      content: file.content,
    }));

    await File.create(createdFiles, { session });

    const user = await User.findById(gist.author)
      .select("username")
      .session(session);

    await session.commitTransaction();

    return { error: "", redirectPath: `/${user?.username}/${newGist._id}` };
  } catch (error) {
    console.log("entered");
    console.log(error);
    await session.abortTransaction();
    return { error: "Failed to create gist", redirectPath: "" };
  } finally {
    session.endSession();
  }
}
