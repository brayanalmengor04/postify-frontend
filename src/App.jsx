import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import CreateUser from "./api/user/CreateUser"; // Importa correctamente

function App() {
  return (
    <Router>
      <Routes>
        {/* Ruta principal: siempre redirige al Login */}
        <Route path="/" element={<Navigate to="/login" />} />
        
        {/* Página de Login */}
        <Route path="/login" element={<Login />} />

        {/* Otras rutas */}
        <Route path="/user-create" element={<CreateUser />} />
        <Route path="/postify-dashboard" element={<h1>Dashboard</h1>} />

        {/* Si la ruta no existe, redirige a Login */}
        <Route path="*" element={<Navigate to="/login" />} />
      </Routes>
    </Router>
  );
}

export default App;
