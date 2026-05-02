import { useState } from "react";
import { login } from "../services/api";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const { data } = await login({ email, password });
      localStorage.setItem("token", data.token);
      localStorage.setItem("isAdmin", data.isAdmin);
      if (data.isAdmin) {
        alert('Login Is successful');
        navigate("/admin");
      } else {
        navigate("/");
      }
    } catch (err) {
      alert("Invalid credentials");
    }
  };

  return (
    <div className="container">
      <h2>Login</h2>
      <div className="form">
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button onClick={handleLogin}>Login</button>
      </div>
    </div>
  );
}
