import express from "express";

import cors from "cors";

import cookieParser from "cookie-parser";

const app = express();

app.use(
  cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true,
  })
);

//Limiting the JSON data to be accpeted by Server
app.use(express.json({ limit: "16kb" }));

//Saying server to understand data from URL
app.use(express.urlencoded({ extended: true, limit: "16kb" }));

//allowing user to be access the common assets
app.use(express.static("public"));

//Getting Cookies from user Browser
app.use(cookieParser());

export default { app };
