import { useState } from "react";
import axios from "axios";

export function useCommentActions(user, fetchComments) { // Recibe fetchComments como argumento
  const [editingComment, setEditingComment] = useState(null);
  const [comment, setComment] = useState({ content: "", likes: 0, userId: null });

  // Manejo de cambios en textarea
  const handleChange = (e) => {
    setComment((prev) => ({ ...prev, [e.target.name]: e.target.value, userId: user?.id }));
  };

  // Crear o actualizar comentario
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!user) return console.error("Usuario no autenticado");

    const url = editingComment
      ? `http://localhost:8080/postify-app/comment/${editingComment.id}`
      : "http://localhost:8080/postify-app/comment-add";

    try {
      if (editingComment) {
        await axios.put(url, comment, { headers: { "Content-Type": "application/json" } });
        setEditingComment(null);
      } else {
        await axios.post(url, comment);
      }

      setComment({ content: "", likes: 0, userId: user?.id });
      fetchComments(); // Recargar comentarios
    } catch (error) {
      console.error("Error al procesar el comentario:", error);
    }
  };

  // Eliminar comentario
  const handleDelete = async (commentId) => {
    try {
      await axios.delete(`http://localhost:8080/postify-app/comment/${commentId}`);
      fetchComments(); // Recargar comentarios
    } catch (error) {
      console.error("Error al eliminar comentario:", error);
    }
  };

  // Editar comentario
  const handleEdit = (comment) => {
    setEditingComment(comment);
    setComment({ content: comment.content, likes: comment.likes, userId: comment.user.id });
  };

  return {
    comment,
    editingComment,
    handleChange,
    handleSubmit,
    handleDelete,
    handleEdit,
  };
}
