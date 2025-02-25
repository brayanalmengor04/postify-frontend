import React from "react";
import { useNavigate } from "react-router-dom";
import { Send, MessageCircle, Heart, Home, User, Settings, LogOut } from "lucide-react";
import loginImage from "../../assets/images/login.png";

export default function DashboardPage() {
  const navigate = useNavigate();
  // Cerrar sesión
  const handleLogout = () => {
    localStorage.removeItem("authToken");
    navigate("/login");
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <aside className="w-72 bg-white shadow-lg p-6 flex flex-col space-y-6">
        <h2 className="text-2xl font-semibold text-gray-800">Postify v1.0</h2>
        
        <nav className="flex flex-col space-y-4">
          <SidebarItem icon={<Home size={20} />} text="Inicio" />
          <SidebarItem icon={<User size={20} />} text="Perfil" />
          <SidebarItem icon={<Settings size={20} />} text="Configuración" />
        </nav>

        <button
          onClick={handleLogout}
          className="mt-auto flex items-center space-x-2 text-red-500 hover:text-red-600 transition"
        >
          <LogOut size={20} />
          <span>Cerrar Sesión</span>
        </button>
      </aside>

      {/* Contenido principal */}
      <div className="flex-1 flex flex-col items-center p-8">
        <h1 className="text-3xl font-bold text-gray-800">Postify - Shared & Connect v1.0! </h1>
        {/* Sección de comentarios */}
        <div className="w-full max-w-2xl mt-6 bg-white shadow-md rounded-lg p-5">
          <h2 className="text-xl font-semibold text-gray-800">Comment!</h2>

          {/* Input de comentario */}
          <div className="flex items-center border border-gray-300 rounded-lg p-3 bg-white mt-3">
            <img src={loginImage} alt="Avatar" className="w-10 h-10 rounded-full" />
            <input
              type="text"
              placeholder="Write a comment..."
              className="flex-1 bg-transparent outline-none px-3 text-gray-600 placeholder-gray-400"
            />
            <button className="bg-blue-500 text-white px-4 py-2 rounded-lg flex items-center space-x-2 hover:bg-blue-600 transition">
              <span>Post</span>
              <Send size={16} />
            </button>
          </div>

          {/* Comentario de ejemplo */}
          <div className="mt-4 bg-gray-50 p-4 rounded-lg shadow">
            <div className="flex items-center space-x-3">
              <img src={loginImage} alt="User" className="w-10 h-10 rounded-full" />
              <div>
                <p className="font-semibold text-gray-800">Alex Johnson</p>
                <p className="text-sm text-gray-500">Hace 2 horas</p>
              </div>
            </div>
            <p className="mt-2 text-gray-700">
              Esta nueva función es increíble! He estado esperando algo así por mucho tiempo. 
            </p>
            <div className="flex items-center space-x-4 mt-2 text-gray-500">
              <button className="flex items-center space-x-1 hover:text-red-500 transition">
                <Heart size={18} />
                <span>24</span>
              </button>
              <button className="flex items-center space-x-1 hover:text-blue-500 transition">
                <MessageCircle size={18} />
                <span>3</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// Componente de Sidebar Item
const SidebarItem = ({ icon, text }) => (
  <button className="flex items-center space-x-3 p-3 rounded-lg text-gray-700 hover:bg-gray-200 transition">
    {icon}
    <span>{text}</span>
  </button>
);
