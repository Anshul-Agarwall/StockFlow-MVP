const express = require("express");
const db = require("../db");
const { authMiddlwware, adminMiddleware } = require("../middleware/authmiddleware");

const router = express.Router();

router.get("/", (req, res) => {
  db.all(`SELECT * FROM products`, [], (err, rows) => {
    if (err) return res.status(500).json({ message: "Error fetching products" });
    res.json(rows);
  });
});

router.post("/", authMiddlwware, adminMiddleware, (req, res) => {
  const { name, description, price, stock } = req.body;
  const now = new Date().toISOString();

  db.run(
    `INSERT INTO products (name, description, price, stock, created_at, updated_at) 
     VALUES (?, ?, ?, ?, ?, ?)`,
    [name, description, price, stock, now, now],
    function (err) {
      if (err) return res.status(500).json({ message: "Error creating product" });
      res.json({ id: this.lastID, name, description, price, stock, created_at: now, updated_at: now });
    }
  );
});

router.put("/:id", authMiddlwware, adminMiddleware, (req, res) => {
  const { name, description, price, stock } = req.body;
  const now = new Date().toISOString();

  db.run(
    `UPDATE products SET name=?, description=?, price=?, stock=?, updated_at=? WHERE id=?`,
    [name, description, price, stock, now, req.params.id],
    function (err) {
      if (err) return res.status(500).json({ message: "Error updating product" });
      res.json({ message: "Product updated" });
    }
  );
});

// Delete product (admin only)
router.delete("/:id", authMiddlwware, adminMiddleware, (req, res) => {
  db.run(`DELETE FROM products WHERE id=?`, [req.params.id], function (err) {
    if (err) return res.status(500).json({ message: "Error deleting product" });
    res.json({ message: "Product deleted" });
  });
});

module.exports = router;
