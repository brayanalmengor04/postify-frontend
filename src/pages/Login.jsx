import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import loginImage from "../assets/images/login.png"; 

export default function Login() { 
  const [login, setLogin] = useState({
    email: "",
    password: ""
  });

  const [errorMessage, setErrorMessage] = useState(""); // Estado para manejar errores
  const navigate = useNavigate(); // Hook para redireccionar

  const { email, password } = login;  

  const onInputChange = (e) => {
    setLogin({ ...login, [e.target.name]: e.target.value });
  };

  const onSubmit = async (e) => {
    e.preventDefault(); 
    const urlBackend = "http://localhost:8080/postify-app/auth/signin";

    try {
      const response = await axios.post(urlBackend, login);
      
      if (response.status === 200) {

        // Prueba con localStorage
        localStorage.setItem("authToken", response.data.token); // Guardar sesión

        // Redireccionar a la dashboard
        navigate("/postify-dashboard");
      }
    } catch (error) {
      console.error("Error al iniciar sesión:", error);

      // Mostrar mensaje de error si las credenciales son incorrectas
      setErrorMessage("Invalid credentials, try again.");
    }
  };

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

          {errorMessage && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-2 rounded mb-4">
              {errorMessage}
            </div>
          )}

          {/* Campos de entrada */} 
        <form onSubmit={onSubmit}>
           <input
            type="text" 
            name="email"
            placeholder="Enter Address email!"
            className="w-full p-3 border border-gray-300 rounded-lg mb-4" 
            value={email}
            onChange={onInputChange}

          />
          <input
            type="password" 
            name="password"
            placeholder="Password"
            className="w-full p-3 border border-gray-300 rounded-lg mb-2" 
            value={password}
            onChange={onInputChange}
          />
          {/* <Link to={"/user-create"} className="text-sm text-blue-500 text-right cursor-pointer">
            Register NOW!
          </Link> */}
          {/* Botón de Login */}
          <button type="submit" className="w-full bg-red-500 hover:bg-red-600 transition-colors text-white p-3 rounded-lg text-lg">
            Sign In
          </button>
        </form>

          {/* Opción de inicio de sesión con redes sociales */}
          <div className="text-center mt-6">
            <Link to={"/user-create"}  className="text-blue-500">Register NOW!</Link>
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
