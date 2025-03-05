import { useState, useEffect } from "react";
import axios from "axios";

export function useReplies(commentId, userId) {
  const [replies, setReplies] = useState([]);
  const [replyContent, setReplyContent] = useState("");
  useEffect(() => {
    fetch("http://localhost:8080/postify-app/reply/all")
      .then((res) => res.json())
      .then((data) => {
        const filteredReplies = data.filter(reply => reply.comment.id === commentId);
        setReplies(filteredReplies);
      })
      .catch((err) => console.error("Error fetching replies:", err));
  }, [commentId]);

  const handleReplyChange = (e) => {
    setReplyContent(e.target.value);
  };

  const submitReply = async () => {
    if (!replyContent.trim()) return; // Evita respuestas vacías

    try {
      const response = await axios.post("http://localhost:8080/postify-app/reply/user", {
        content: replyContent,
        userId: userId,
        commentId: commentId
      });

      setReplies([...replies, response.data]); // Agrega la nueva respuesta a la lista
      setReplyContent(""); // Limpia el input
    } catch (error) {
      console.error("Error al enviar la respuesta:", error);
    }
  };
  return {
    replies,
    replyContent,
    handleReplyChange,
    submitReply
  };
}
