import "dotenv/config";
import connectDB from "./db/index.js";

connectDB();

// import express from "express";
// const app = express();

// (async () => {
//   try {
//     await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`);
//     app.on("Error", (error) => {
//       console.log("ERROR : ", error);
//       throw error;
//     });
//     app.listen(process.env.PORT, () => {
//       console.log(`App is listening at ${process.env.PORT}`);
//     });
//   } catch (error) {
//     console.error("EROR :", error);
//     throw error;
//   }
// })();
