require("dotenv").config();
import express, { Request, Response } from "express";

const morgan = require("morgan");
const helmet = require("helmet");
const mongoose = require("mongoose");
const cors = require("cors");
let session = require("express-session");
const cookieParser = require("cookie-parser");

const app = express();

app.use(morgan("combined"));
app.use(helmet());
app.use(express.json());
app.use(
  cors({
    origin: ["http://localhost:3000", "http://127.0.0.1:3000"],
    credentials: true,
  })
);
app.use(cookieParser());

import authRouter from "./routes/auth";
import todoRouter from "./routes/todo";

// app.use(
//   session({
//     secret: "Its a secret.",
//     resave: false,
//     saveUninitialized: true,
//     cookie: { secure: false },
//   })
// );

mongoose.connect(
  `${process.env.MONGO_DB}`,
  {
    useNewUrlParser: true,
  },
  (error: any) => {
    if (error) {
      console.log("Error: " + error);
    } else {
      console.log("DB connect");
    }
  }
);

app.get("/", (request: Request, response: Response) => {
  response.status(200).send("Hello PMS");
});

app.use("/auth", authRouter);
app.use("/todos", todoRouter);

app.listen(process.env.APP_PORT, () => {
  console.log(`Server running on http://localhost:${process.env.APP_PORT}`);
});
