import { Types } from "mongoose";

export interface IUser {
  id: number;
  username: string;
  image: string;
  email: string;
  name: string;
  company?: string;
  location?: string;
  followers: number;
  following: number;
  twitterName?: string;
  bio?: string;
  joinOn: Date;
  starred: Types.ObjectId[];
}

export type CreateIUser = Omit<IUser, "joinOn" | "starred">;

export interface IGist {
  previewFile: Types.ObjectId;
  author: Types.ObjectId;
  description?: string;
  stars: Types.ObjectId[];
  createdAt: Date;
  updatedAt: Date;
}

export interface IFile {
  name: string;
  content: string;
  gist: Types.ObjectId;
  lang: string;
}

export type CreateIGist = Omit<
  IGist,
  "stars" | "starred" | "createdAt" | "updatedAt" | "previewFile"
> & {
  files: Omit<IFile, "gist">[];
};

export interface IComment {
  author: Types.ObjectId;
  gist: Types.ObjectId;
  content: string;
  createdAt: Date;
  updatedAt: Date;
}

export type AddObjectId<T> = T & { _id: Types.ObjectId };

export type IGistPopulated = AddObjectId<
  Omit<IGist, "author" | "previewFile"> & {
    author: AddObjectId<IUser>;
  } & {
    previewFile: Omit<IFile, "gist"> & { gist: string; _id: string };
  } & {
    comments: number;
    files: number;
  }
>;
