import mongoose from "mongoose";

let isConnected = false;

export default async function connectToDB() {
  try {
    if (!process.env.MONGODB_URL) throw new Error("No connection string");

    if (isConnected) return;

    await mongoose.connect(process.env.MONGODB_URL!);
    isConnected = true;
    console.log("Connected to database");
  } catch (error) {
    console.log(error);
  }
}
