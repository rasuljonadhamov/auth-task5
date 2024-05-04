import express, { json } from "express";
import cors from "cors";
import mysql from "mysql";
import bcrypt from "bcrypt";
import cookieParser from "cookie-parser";
import jwt from "jsonwebtoken";

const saltRounds = 10;

const app = express();
app.use(express.json());
app.use(
  cors({
    origin: "http://localhost:5173",
    methods: ["GET", "POST"],
    credentials: true,
  })
);
app.use(cookieParser());

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "rasuljon!@#",
  database: "signup",
  port: 3306,
});

db.connect(() => {
  console.log("Connected");
});

const verifyUser = (req, res, next) => {
  try {
    const token = req.cookies.token;
    if (!token) {
      return res.json({ Error: "You are not Authorized" });
    } else {
      jwt.verify(token, "jwt-secret-key", (err, decoded) => {
        if (err) {
          return res.json({ Error: "Invalid token" });
        } else {
          req.name = decoded.name;
          next();
        }
      });
    }
  } catch (error) {
    console.error(error);
    return res.json({ Error: "An error occurred during authentication." });
  }
};

app.get("/", verifyUser, (req, res) => {
  return res.json({ Status: "Success", name: req.name });
});

app.post("/register", (req, res) => {
  const q = "INSERT INTO login (`name` , `email`,`password`) VALUES (?)";
  bcrypt.hash(req.body.password, saltRounds, (err, hash) => {
    if (err) return res.json({ Error: "Error hashing password!..." });

    const values = [req.body.name, req.body.email, hash];

    db.query(q, [values], (err, data) => {
      if (err) return res.json({ Error: "Error during database..." });
      return res.json({ Status: "Success" });
    });
  });
});

app.get("/users", (req, res) => {
  const query = "SELECT id, name, email FROM login";

  db.query(query, (err, results) => {
    if (err) {
      console.error("Error fetching users:", err);
      res.status(500).json({ error: "Error fetching users" });
    } else {
      res.json(results);
    }
  });
});

app.get("/logout", (req, res) => {
  res.clearCookie("token");
  res.json({ Status: "Success", Message: "Logged out successfully" });
});

app.post("/login", (req, res) => {
  const q = "SELECT * FROM login WHERE email = ?";
  db.query(q, [req.body.email], (err, data) => {
    if (err) return res.json({ Error: "Login Error!..." });

    console.log("Retrieved email:", req.body.email);

    if (data.length > 0) {
      const user = data[0];
      console.log(user, " user ");
      console.log("Retrieved password:", user.password);
      bcrypt.compare(
        req.body.password.toString(),
        user.password,
        (err, response) => {
          if (err) return res.json({ Error: "Password Compare Error!..." });
          console.log("Password comparison result:", response);
          if (response) {
            const name = data[0].name;
            const token = jwt.sign({ name }, "jwt-secret-key", {
              expiresIn: "1d",
            });
            res.cookie("token", token);
            return res.json({ Status: "Success" });
          } else {
            return res.json({ Error: "Invalid credentials" });
          }
        }
      );
    } else {
      return res.json({ Error: "Invalid credentials" });
    }
  });
});

app.post("/block", (req, res) => {
  const userIds = req.body.userIds;

  const query = "UPDATE login SET status = 'blocked' WHERE id IN (?)";
  db.query(query, [userIds], (err, result) => {
    if (err) {
      console.error("Error blocking users:", err);
      res.status(500).json({ error: "Error blocking users" });
    } else {
      res.json({ success: true });
    }
  });
});

app.post("/unblock", (req, res) => {
  const userIds = req.body.userIds;

  const query = "UPDATE login SET status = 'active' WHERE id IN (?)";
  db.query(query, [userIds], (err, result) => {
    if (err) {
      console.error("Error unblocking users:", err);
      res.status(500).json({ error: "Error unblocking users" });
    } else {
      res.json({ success: true });
    }
  });
});

app.post("/delete", (req, res) => {
  const userIds = req.body.userIds;

  const query = "DELETE FROM login WHERE id IN (?)";
  db.query(query, [userIds], (err, result) => {
    if (err) {
      console.error("Error deleting users:", err);
      res.status(500).json({ error: "Error deleting users" });
    } else {
      res.json({ success: true });
    }
  });
});

app.listen(8000, () => {
  console.log("Hello backend on port:", 8000);
});
