import express from "express";

import mongoose from "mongoose";

import { DB_NAME } from "./constants.js";

import "dotenv/config";

const app = express();

(async () => {
  try {
    await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`);
    app.on("Error", (error) => {
      console.log("ERROR : ", error);
      throw error;
    });
    app.listen(process.env.PORT, () => {
      console.log(`App is listening at ${process.env.PORT}`);
    });
  } catch (error) {
    console.error("EROR :", error);
    throw error;
  }
})();
