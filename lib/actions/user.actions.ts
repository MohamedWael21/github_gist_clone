"use server";

import { Types } from "mongoose";
import { CreateIUser } from "@/types/models";
import connectToDB from "../mongoose";
import User from "../models/user.model";
import Gist from "../models/gist.model";

export async function createUser(user: CreateIUser) {
  await connectToDB();

  try {
    await User.findOneAndUpdate({ id: user.id }, user, {
      upsert: true,
    });
  } catch (error) {
    console.log(error);
  }
}

export async function getUserByGithubId(githubId: number) {
  await connectToDB();

  try {
    const user = await User.findOne({ id: githubId });

    return user?.toObject();
  } catch (error) {
    console.log(error);
  }
}
export async function getUserByUsername(username: string) {
  await connectToDB();

  try {
    const user = await User.findOne({ username });

    return user?.toObject();
  } catch (error) {
    console.log(error);
  }
}

export async function getUserGists({
  author,
  pageNumber = 1,
  pageSize = 20,
}: {
  author: Types.ObjectId;
  pageNumber?: number;
  pageSize?: number;
}) {
  await connectToDB();

  const skipAmount = (pageNumber - 1) * pageSize;

  try {
    const gists = await Gist.find({ author })
      .skip(skipAmount)
      .limit(pageSize)
      .sort({ createdAt: "desc" });

    const totalGists = await Gist.find({ author }).countDocuments();

    const isNext = totalGists > skipAmount + gists.length;

    const gistsObject = gists.map((gist) => gist.toObject());

    return { isNext, gists: gistsObject };
  } catch (error) {
    console.log(error);
  }
}
