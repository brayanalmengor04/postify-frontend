import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../hooks/auth/useAuth";
import loginImage from "../assets/images/login.png"; 

export default function Login() { 
  const { login, errorMessage } = useAuth();
  const [credentials, setCredentials] = useState({ email: "", password: "" });
  const onInputChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };
  const onSubmit = (e) => {
    e.preventDefault();
    login(credentials); // Llamar al hook para iniciar sesión
  };
  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100 px-4">
      <div className="bg-white rounded-2xl shadow-lg flex flex-col md:flex-row w-full max-w-4xl">
        {/* Sección izquierda */}
        <div className="md:w-1/2 bg-purple-300 flex items-center justify-center rounded-t-2xl md:rounded-l-2xl md:rounded-tr-none p-6">
          <img src={loginImage} alt="Illustration" className="w-3/4 md:w-full" />
        </div>

        {/* Sección derecha */}
        <div className="md:w-1/2 p-10 flex flex-col justify-center"> 
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Hello Again!</h2>
          <p className="text-gray-500 mb-6">Welcome to Postify - Share & Connect!</p>

          {errorMessage && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-2 rounded mb-4">
              {errorMessage}
            </div>
          )}

          {/* Formulario */}
          <form onSubmit={onSubmit}>
            <input
              type="text" 
              name="email"
              placeholder="Enter Address email!"
              className="w-full p-3 border border-gray-300 rounded-lg mb-4" 
              value={credentials.email}
              onChange={onInputChange}
            />
            <input
              type="password" 
              name="password"
              placeholder="Password"
              className="w-full p-3 border border-gray-300 rounded-lg mb-2" 
              value={credentials.password}
              onChange={onInputChange}
            />
            <button type="submit" className="w-full bg-red-500 hover:bg-red-600 transition-colors text-white p-3 rounded-lg text-lg">
              Sign In
            </button>
          </form>

          {/* Registro y redes sociales */}
          <div className="text-center mt-6">
            <Link to={"/user-create"} className="text-blue-500">Register NOW!</Link>
            <div className="flex justify-center gap-4 mt-4">
              <button className="bg-white border border-gray-300 p-3 rounded-full hover:bg-gray-200 transition">🟡</button>
              <button className="bg-white border border-gray-300 p-3 rounded-full hover:bg-gray-200 transition">🍏</button>
              <button className="bg-white border border-gray-300 p-3 rounded-full hover:bg-gray-200 transition">🔵</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
