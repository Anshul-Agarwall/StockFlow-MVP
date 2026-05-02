import { useState } from "react";
import { register } from "../services/api";
import { useNavigate } from "react-router-dom";

export default function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isAdmin, setIsAdmin] = useState(false);
  const navigate = useNavigate();

  const handleRegister = async () => {
    try {
    await register({ email, password, isAdmin });
      alert("Registered successfully!");
       setEmail("");
      setPassword("");
      setIsAdmin(false);
      navigate("/login");
    } catch (err) {
      alert("User already Registered"+err);
    }
  };

  return (
    <div className="container">
      <h2>Register</h2>
    <div className="form">
      <input
        type="email"
        placeholder="Email"
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type="password"
        placeholder="Password"
        onChange={(e) => setPassword(e.target.value)}
      />
      <label>
        <input
            type="checkbox"
            checked={isAdmin}
            onChange={(e) => setIsAdmin(e.target.checked)}
        />Register as Admin
        </label>
      <button onClick={handleRegister}>Register</button>
    </div>
    </div>
  );
}
