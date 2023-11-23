import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { Login, Register, Home } from "./pages";
import { useEffect, useState } from "react";

function App() {
  const [isAuth, setIsAuth] = useState(false);

  useEffect(() => {}, []);

  return (
    <div data-theme="light">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Navigate to="/login" />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/home" element={<Home />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
