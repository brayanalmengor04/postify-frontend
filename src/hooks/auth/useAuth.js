import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export function useAuth() {
  const [user, setUser] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    if (storedUser) {
      setUser(storedUser);
    } else {
      navigate("/login");
    }
  }, [navigate]);

  // Función de inicio de sesión
  const login = async (credentials) => {
    try {
      const response = await axios.post("http://localhost:8080/postify-app/auth/signin", credentials);
      if (response.status === 200) {
        localStorage.setItem("authToken", response.data.token);
        localStorage.setItem("user", JSON.stringify(response.data));
        setUser(response.data);
        navigate("/postify-dashboard");
      }
    } catch (error) {
      console.error("Error al iniciar sesión:", error);
      setErrorMessage("Invalid credentials, try again.");
    }
  };
  // Función de cierre de sesión
  const handleLogout = () => {
    localStorage.removeItem("authToken");
    localStorage.removeItem("user");
    setUser(null);
    navigate("/login");
  };

  return { user, setUser, login, handleLogout, errorMessage };
}
