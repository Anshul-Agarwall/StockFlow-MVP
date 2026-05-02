import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Products from "./pages/Products";
import Admin from "./pages/Admin";
import Navbar from "./components/Navbar";

function App() {
  return (
    <Router>
      <div>
        <Navbar /> 

        <Routes>
          <Route path="/" element={<Products />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/admin" element={<Admin />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
