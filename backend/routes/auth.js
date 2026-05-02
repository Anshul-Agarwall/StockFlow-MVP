const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const db = require("../db");

const router = express.Router();

router.post("/register", (req, res) => {
  const { email, password, isAdmin } = req.body;

  const hashedPassword = bcrypt.hashSync(password, 10);

  db.run(
    `INSERT INTO users (email, password, isAdmin) VALUES (?, ?, ?)`,
    [email, hashedPassword, isAdmin ? 1 : 0],
    function (err) {
      if (err) return res.status(400).json({ message: "User already exists" });
      res.json({ message: "User registered successfully" });
    }
  );
});

router.post("/login", (req, res) => {
  const { email, password } = req.body;

  db.get(`SELECT * FROM users WHERE email = ?`, [email], (err, user) => {
    if (err || !user) return res.status(400).json({ message: "Invalid email or password" });

    const isValid = bcrypt.compareSync(password, user.password);
    if (!isValid) return res.status(400).json({ message: "Invalid email or password" });

    const token = jwt.sign(
      { id: user.id, email: user.email, isAdmin: !!user.isAdmin },
      "secretkey",
      { expiresIn: "1h" }
    );

    res.json({ token, isAdmin: !!user.isAdmin });
  });
});

module.exports = router;
