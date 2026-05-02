import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  getProducts,
  createProduct,
  updateProduct,
  deleteProduct,
} from "../services/api";

export default function Admin() {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [stock, setStock] = useState("");
  const [editingId, setEditingId] = useState(null);

  useEffect(() => {
    const isAdmin = localStorage.getItem("isAdmin") === "true";
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
      return;
    }
    if (!isAdmin) {
      navigate("/");
      return;
    }

    loadProducts();
  }, [navigate, user]);

  const loadProducts = async () => {
    setLoading(true);
    try {
      const { data } = await getProducts();
      setProducts(data);
    } catch (err) {
      console.error("Failed to load products", err);
      alert("Failed to load products (check console).");
    } finally {
      setLoading(false);
    }
  };

  const resetForm = () => {
    setName("");
    setDescription("");
    setPrice("");
    setStock("");
    setEditingId(null);
  };

  const handleSubmit = async (e) => {
    e && e.preventDefault();

    // basic validation
    if (!name.trim()) return alert("Name is required");
    if (price === "" || isNaN(Number(price))) return alert("Valid price is required");
    if (stock === "" || isNaN(Number(stock))) return alert("Valid stock is required");

    const payload = {
      name: name.trim(),
      description: description.trim(),
      price: parseFloat(price),
      stock: parseInt(stock, 10),
    };

    try {
      if (editingId) {
        await updateProduct(editingId, payload);
        alert("Product updated");
      } else {
        await createProduct(payload);
        alert("Product added");
      }
      resetForm();
      await loadProducts();
    } catch (err) {
      console.error("Save error", err);
      alert("Error saving product");
    }
  };

  const handleEdit = (product) => {
    setEditingId(product.id);
    setName(product.name || "");
    setDescription(product.description || "");
    setPrice(product.price != null ? String(product.price) : "");
    setStock(product.stock != null ? String(product.stock) : "");
    // scroll to form or focus if you want
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this product?")) return;
    try {
      await deleteProduct(id);
      alert("Product deleted");
      await loadProducts();
    } catch (err) {
      console.error("Delete error", err);
      alert("Error deleting product");
    }
  };

  const handleCancelEdit = () => {
    resetForm();
  };

  return (
    <div className="container">
      <h2>Admin — Manage Products</h2>

      <div className="form">
        <form onSubmit={handleSubmit} style={{ width: "100%", maxWidth: 700 }}>
          <input
            type="text"
            placeholder="Product name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <textarea
            placeholder="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows={3}
            style={{ width: "100%", maxWidth: 700, boxSizing: "border-box", marginTop: 8 }}
          />
          <input
            type="number"
            step="0.01"
            placeholder="Price"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
          />
          <input
            type="number"
            placeholder="Stock"
            value={stock}
            onChange={(e) => setStock(e.target.value)}
          />

          <div style={{ marginTop: 8 }}>
            <button type="submit">{editingId ? "Update Product" : "Add Product"}</button>
            {editingId && (
              <button
                type="button"
                onClick={handleCancelEdit}
                style={{ marginLeft: 8, background: "#6c757d" }}
              >
                Cancel
              </button>
            )}
          </div>
        </form>
      </div>

      <hr style={{ margin: "20px 0" }} />

      <h3>Products</h3>
      {loading ? (
        <p>Loading...</p>
      ) : products.length === 0 ? (
        <p>No products yet.</p>
      ) : (
        <div style={{ overflowX: "auto" }}>
          <table style={{ width: "100%", borderCollapse: "collapse", maxWidth: 1000 }}>
            <thead>
              <tr style={{ textAlign: "left", borderBottom: "1px solid #ddd" }}>
                <th style={{ padding: "8px" }}>Name</th>
                <th style={{ padding: "8px" }}>Description</th>
                <th style={{ padding: "8px" }}>Price</th>
                <th style={{ padding: "8px" }}>Stock</th>
                <th style={{ padding: "8px" }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {products.map((p) => (
                <tr key={p.id} style={{ borderBottom: "1px solid #f0f0f0" }}>
                  <td style={{ padding: "8px", verticalAlign: "top" }}>{p.name}</td>
                  <td style={{ padding: "8px", verticalAlign: "top", maxWidth: 420 }}>
                    {p.description}
                  </td>
                  <td style={{ padding: "8px", verticalAlign: "top" }}>
                    {Number(p.price).toFixed(2)}
                  </td>
                  <td style={{ padding: "8px", verticalAlign: "top" }}>{p.stock}</td>
                  <td style={{ padding: "8px", verticalAlign: "top" }}>
                    <button onClick={() => handleEdit(p)}>Edit</button>
                    <button
                      onClick={() => handleDelete(p.id)}
                      style={{ marginLeft: 8, background: "#dc3545" }}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
