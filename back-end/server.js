import express, { json } from "express";
import cors from "cors";
import mysql from "mysql";
import bcrypt from "bcrypt";
import cookieParser from "cookie-parser";
import jwt from "jsonwebtoken";

const app = express();
app.use(express.json());
app.use(cors());
app.use(cookieParser());

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "rasuljon!@#",
  database: "signup",
  port: 3306,
});

db.connect(() => {
  console.log("    Connected    ");
});

app.listen(8000, (req, res) => {
  console.log(" Hello backend " + 8000);
});
