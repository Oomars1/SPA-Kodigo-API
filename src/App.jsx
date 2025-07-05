
import "./App.css";
import { Routes, Route } from "react-router-dom";
import  Login  from "./pages/login";
import  Home  from "./pages/Home";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/home" element={<Home />} />
    </Routes>
  );
}

export default App;
