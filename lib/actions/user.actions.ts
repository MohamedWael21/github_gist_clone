"use server";

import { RootFilterQuery, Types } from "mongoose";
import {
  AddObjectId,
  CreateIUser,
  IFile,
  IGist,
  IGistPopulated,
  IUser,
} from "@/types/models";
import connectToDB from "../mongoose";
import User from "../models/user.model";
import Gist from "../models/gist.model";
import Comment from "../models/comment.model";
import File from "../models/file.model";

type SortOptions<T> = { [k in keyof T]?: "desc" | "asc" };

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

export async function getUser(filter: RootFilterQuery<IUser>) {
  await connectToDB();

  try {
    const user = await User.findOne(filter);

    return user?.toObject();
  } catch (error) {
    console.log(error);
  }
}

export async function getUserGists({
  author,
  pageNumber = 1,
  pageSize = 20,
  sortOptions,
}: {
  author: Types.ObjectId;
  pageNumber?: number;
  pageSize?: number;
  sortOptions: SortOptions<IGist>;
}) {
  await connectToDB();

  const skipAmount = (pageNumber - 1) * pageSize;

  try {
    const gists = await Gist.find({ author })
      .populate<{ author: AddObjectId<IUser> }>("author")
      .populate<{ previewFile: AddObjectId<IFile> }>("previewFile")
      .skip(skipAmount)
      .limit(pageSize)
      .sort(sortOptions);
    const totalGists = await Gist.find({ author }).countDocuments();

    const isNext = totalGists > skipAmount + gists.length;

    const gistsObject = gists.map(async (gist) => {
      const comments = await Comment.find({ gist: gist._id }).countDocuments();
      const files = await File.find({ gist: gist._id }).countDocuments();
      return {
        comments,
        files,
        ...gist.toObject(),
        previewFile: {
          name: gist.previewFile.name,
          lang: gist.previewFile.lang,
          content: gist.previewFile.content,
          _id: gist.previewFile._id.toString(),
          gist: gist.previewFile.gist.toString(),
        },
      };
    });

    const returnedGists = await Promise.all(gistsObject);

    return { isNext, gists: returnedGists, totalGists };
  } catch (error) {
    console.log(error);
  }
}

export async function getUserGistsByUsername({
  username,
  pageNumber,
  pageSize,
  sortOptions,
}: {
  username: string;
  pageNumber?: number;
  pageSize?: number;
  sortOptions: SortOptions<IGist>;
}) {
  const user = await User.findOne({ username });
  if (!user) return null;
  return getUserGists({ author: user._id, pageNumber, pageSize, sortOptions });
}

export async function getUserStarredGists({
  username,
  pageNumber = 1,
  pageSize = 20,
  sortOptions,
}: {
  username: string;
  pageNumber?: number;
  pageSize?: number;
  sortOptions: SortOptions<IGist>;
}) {
  await connectToDB();

  const skipAmount = (pageNumber - 1) * pageSize;

  try {
    const user = await User.findOne({ username }).populate<{
      starred: IGistPopulated[];
    }>({
      path: "starred",
      populate: [
        {
          path: "author",
        },
        {
          path: "previewFile",
        },
      ],
    });

    if (!user) return null;

    let gists = user.starred;

    const totalGists = gists.length;

    gists = gists.slice(skipAmount, pageSize);

    gists.sort((left, right) => {
      let diff: number = 0;
      if (sortOptions.createdAt)
        diff = left.createdAt.getTime() - right.createdAt.getTime();
      else if (sortOptions.updatedAt)
        diff = left.updatedAt.getTime() - right.updatedAt.getTime();

      if (sortOptions.createdAt === "desc" || sortOptions.updatedAt === "desc")
        diff = -diff;
      return diff;
    });

    const isNext = totalGists > skipAmount + gists.length;

    const gistsObject = gists.map(async (gist) => {
      const comments = await Comment.find({ gist: gist._id }).countDocuments();
      const files = await File.find({ gist: gist._id }).countDocuments();
      return {
        ...gist,
        comments,
        files,
        previewFile: {
          name: gist.previewFile.name,
          lang: gist.previewFile.lang,
          content: gist.previewFile.content,
          _id: gist.previewFile._id.toString(),
          gist: gist.previewFile.gist.toString(),
        },
      };
    });

    const returnedGists = await Promise.all(gistsObject);

    return { isNext, gists: returnedGists, totalGists };
  } catch (error) {
    console.log(error);
  }
}
