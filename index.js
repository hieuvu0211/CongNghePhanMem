const express = require("express");
const mysql = require("mysql2");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  database: "nodejsbasic",
});

app.get("/", (req, res) => {
  res.json("hello");
});

app.get("/users", (req, res) => {
  const q = "SELECT * FROM users";
  db.query(q, (err, data) => {
    if (err) {
      console.log(err);
      return res.json(err);
    }
    return res.json(data);
  });
});

app.get("/edit-user/:id", (req, res) => {
  let id = req.params.id;
  const q = " select * FROM users WHERE id = ? ";
  db.query(q, [id], (err, data) => {
    if (err) return res.send(err);
    return res.json(data);
  });
});
app.post("/users", (req, res) => {
  const q =
    "INSERT INTO users(`firstName`, `lastName`, `email`, `address`) VALUES (?)";

  const values = [
    req.body.firstName,
    req.body.lastName,
    req.body.email,
    req.body.address,
  ];

  db.query(q, [values], (err, data) => {
    if (err) return res.send(err);
    return res.json(data);
  });
});

app.delete("/users/:id", (req, res) => {
  const userId = req.params.id;
  const q = " DELETE FROM users WHERE id = ? ";

  db.query(q, [userId], (err, data) => {
    if (err) return res.send(err);
    return res.json(data);
  });
});

app.put("/users/:id", (req, res) => {
  const userId = req.params.id;
  const q =
    "UPDATE users SET `firstName`= ?, `lastName`= ?, `email`= ?, `address`= ? WHERE id = ?";

  const values = [
    req.body.firstName,
    req.body.lastName,
    req.body.email,
    req.body.address,
  ];

  db.query(q, [...values, userId], (err, data) => {
    if (err) return res.send(err);
    return res.json(data);
  });
});

app.listen(8800, () => {
  console.log("Connected to backend.");
});
