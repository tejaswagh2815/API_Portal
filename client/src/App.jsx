import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { Login, Register, AllProject, AddProject } from "./pages";
import Navibar from "./components/Navibar";

function App() {
  const shouldDisplayNavibar = () => {
    const hiddenRoutes = ["/login"]; // Add more routes as needed
    const currentRoute = window.location.pathname;
    return !hiddenRoutes.includes(currentRoute);
  };
  return (
    // <div data-theme="light">
    <BrowserRouter>
      {shouldDisplayNavibar() && <Navibar />}
      <Routes>
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/allproject" element={<AllProject />} />
        <Route path="/addproject" element={<AddProject />} />
      </Routes>
    </BrowserRouter>
    // </div>
  );
}

export default App;
