import { right } from "@popperjs/core";
import { Link, useNavigate } from "react-router-dom";

export default function Navbar() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("isAdmin");
    navigate("/login");
  };

  const isLoggedIn = !!localStorage.getItem("token");
  const isAdmin = localStorage.getItem("isAdmin") === "true";

return (
  <nav
    style={{
      marginBottom: "20px",
      padding: "10px",
      borderBottom: "1px solid #ccc",
      textAlign: "right",
      animation: "hero-custom-background 1550ms var(--animation-timing-1) var(--animation-delay-1) backwards"
    }}
  >
    <Link to="/" style={{ marginRight: "10px" }}>Products</Link>
    {!isLoggedIn && <Link to="/register" style={{ marginRight: "10px" }}>Register</Link>}
    {!isLoggedIn && <Link to="/login" style={{ marginRight: "10px" }}>Login</Link>}
    {isAdmin && <Link to="/admin" style={{ marginRight: "10px" }}>Admin</Link>}
    {isLoggedIn && <button onClick={handleLogout}>Logout</button>}
  </nav>
);

}
