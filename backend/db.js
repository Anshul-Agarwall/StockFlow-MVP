const sqlite3 = require("sqlite3").verbose();
const db = new sqlite3.Database("./ecommerce.db");

// Create tables
db.serialize(() => {
  db.run(`CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    email TEXT UNIQUE,
    password TEXT,
    isAdmin INTEGER DEFAULT 0
  )`);

  db.run(`CREATE TABLE IF NOT EXISTS products (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT,
    description TEXT,
    price REAL,
    stock INTEGER,
    created_at TEXT,
    updated_at TEXT
  )`);
});

module.exports = db;
