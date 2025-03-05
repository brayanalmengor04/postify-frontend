import { useState, useEffect, useCallback } from "react";
import axios from "axios";
const endPoint = "http://localhost:8080/postify-app/comment"; 

export const useComments = () => {
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchComments = useCallback(async () => {
    try {
      setLoading(true); // Asegura que se muestre el estado de carga al actualizar
      const { data } = await axios.get(endPoint);
      setComments(data);
    } catch (err) {
      console.error("Error al cargar los comentarios:", err);
      setError(err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchComments();
  }, [fetchComments]);

  return { comments, loading, error, fetchComments }; 
};