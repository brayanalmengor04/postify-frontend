import React from "react";
import loginImage from "../assets/images/login.png"; 
import { Link } from "react-router-dom";

export default function Login() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100 px-4">
      {/* Contenedor principal */}
      <div className="bg-white rounded-2xl shadow-lg flex flex-col md:flex-row w-full max-w-4xl">
        {/* Sección izquierda (imagen o ilustración) */}
        <div className="md:w-1/2 bg-purple-300 flex items-center justify-center rounded-t-2xl md:rounded-l-2xl md:rounded-tr-none p-6">
          <img src={loginImage} alt="Illustration" className="w-3/4 md:w-full" />
        </div>

        {/* Sección derecha (Formulario) */}
        <div className="md:w-1/2 p-10 flex flex-col justify-center"> 
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Hello Again!</h2>
          <p className="text-gray-500 mb-6">Welcome Postify - Share & Connect!</p>

          {/* Campos de entrada */}
          <input
            type="text"
            placeholder="Enter username"
            className="w-full p-3 border border-gray-300 rounded-lg mb-4"
          />
          <input
            type="password"
            placeholder="Password"
            className="w-full p-3 border border-gray-300 rounded-lg mb-2"
          />
          <Link to={"/user-create"} className="text-sm text-blue-500 text-right cursor-pointer mb-6">
            Register NOW!
          </Link>

          {/* Botón de Login */}
          <button className="w-full bg-red-500 hover:bg-red-600 transition-colors text-white p-3 rounded-lg text-lg">
            Sign In
          </button>

          {/* Opción de inicio de sesión con redes sociales */}
          <div className="text-center mt-6">
            <p className="text-gray-500">Or continue with</p>
            <div className="flex justify-center gap-4 mt-4">
              <button className="bg-white border border-gray-300 p-3 rounded-full hover:bg-gray-200 transition">
                🟡
              </button>
              <button className="bg-white border border-gray-300 p-3 rounded-full hover:bg-gray-200 transition">
                🍏
              </button>
              <button className="bg-white border border-gray-300 p-3 rounded-full hover:bg-gray-200 transition">
                🔵
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
