import React from "react";
import { useNavigate } from "react-router-dom";

export default function DasboardPage() {
  const navigate = useNavigate();

  // Eliminar el localStorage
  const handleLogout = () => {
    localStorage.removeItem("authToken"); // Eliminar la sesión
    navigate("/login"); // Redirigir a Login
  };
  
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h1 className="text-3xl font-bold mb-6">Bienvenido al Dashboard</h1>
      <button
        onClick={handleLogout}
        className="bg-red-500 hover:bg-red-600 text-white px-6 py-3 rounded-lg"
      >
        Cerrar Sesión
      </button>
    </div>
  );
}
