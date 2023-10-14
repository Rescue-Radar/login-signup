import express from "express";
import bodyParser from "body-parser";
const cors = require('cors');

import { Request,Response } from "express";
import * as dotenv from "dotenv";
dotenv.config();
const port = process.env.PORT ;
//handle uncaught err
// process.on("uncaughtException", function (err) {
//   console.log(`uncaughterror-> ${err}`);
// });


import caseRoutes from "./src/routes/caseRoutes";
import signupRoutes from "./src/routes/auth.routes"

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));

// parse application/json
app.use(bodyParser.json());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({
  credentials:true
}));
app.use("/api",caseRoutes);
app.use("/api",signupRoutes);

app.get("/", (req:Request,res:Response) => {
  const CurrentDateTime = new Date().toLocaleString();
  res
    .status(200)
    .json({
      HTTPCode:"200",
      Status: "OK",
      message: "Welcome to Home",
      EntryTime: CurrentDateTime,
    });
});
app.get("*", (req, res) => {
  res.status(404).json({ message: "Route not found" });
});

app.listen(process.env.PORT, () => {
  console.log(`server is running at port ${port} `);
});


