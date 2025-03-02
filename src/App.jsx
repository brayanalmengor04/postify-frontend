import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import CreateUser from "./api/user/CreateUser"; 
import DasboardPage from "./pages/dasboard/DasboardPage";
import AdmTableRole from "./api/role/AdmTableRole"; 
import AdmTableUser from "./api/user/AdmTableUser";
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
        <Route path="/user-create/:id" element={<CreateUser />} /> {/* Para edición */}
        {/* RUTA PROTEGIDAS------------ */}
        <Route path="/postify-dashboard" element={<ProtectedRoute element={<DasboardPage />} />} /> 
        <Route path="/postify/admin/roles" element={<ProtectedRoute element={<AdmTableRole />} />} />
        <Route path="/postify/admin/users" element={<ProtectedRoute element={<AdmTableUser />} />} />
        <Route path="*" element={<Navigate to="/login" />} />
      </Routes>
    </Router>
  );
}

export default App;
