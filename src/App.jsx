import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import CreateUser from "./api/user/CreateUser";
import DasboardPage from "./pages/dasboard/DasboardPage";

// Componente para proteger rutas
const ProtectedRoute = ({ element }) => {
  const isAuthenticated = localStorage.getItem("authToken"); 
  return isAuthenticated ? element : <Navigate to="/login" />;
};

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/login" element={<Login />} />
        <Route path="/user-create" element={<CreateUser />} />
        

        {/* RUTA PROTEGIDAS------------ */}
        <Route path="/postify-dashboard" element={<ProtectedRoute element={<DasboardPage />} />} />
        <Route path="*" element={<Navigate to="/login" />} />
      </Routes>
    </Router>
  );
}

export default App;
