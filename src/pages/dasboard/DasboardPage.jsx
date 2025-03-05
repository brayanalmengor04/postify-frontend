import React, { useState } from "react";
import { Send } from "lucide-react";
import loginImage from "../../assets/images/avatarDefault.jpg";
import { useAuth } from "../../hooks/auth/useAuth";
import { useComments } from "../../hooks/comment/useComments";
import { useCommentActions } from "../../hooks/comment/useCommentActions";
import CommentItem from "../../components/Comment/CommentItem";
import SiderBarMenu from "../../template/SiderBarMenu";

export default function DashboardPage() {
  const { user, handleLogout } = useAuth(); 
  // Aqui manejo la carga de los comentarios 
  const { comments, loading, error, fetchComments } = useComments(); 
  // Acciones para comentarios 
  const { comment, editingComment, handleChange, handleSubmit, handleDelete, handleEdit } = useCommentActions(user, fetchComments);
  // Slider menu para manejar 
  const [isSidebarOpen, setSidebarOpen] = useState(false); 
  return (
    <div className="flex min-h-screen bg-gray-100">
      <SiderBarMenu isSidebarOpen={isSidebarOpen} setSidebarOpen={setSidebarOpen} user={user} handleLogout={handleLogout} />
      {/* Contenido principal */}
      <div className="flex-1 flex flex-col items-center p-8">
        <h1 className="text-3xl font-bold text-gray-800">Postify - Shared & Connect v1.0!</h1>
        {/* Sección de comentarios */}
        <div className="w-full max-w-2xl mt-6 bg-white shadow-md rounded-lg p-5">
          <h2 className="text-xl font-semibold text-gray-800">Comment!</h2>
          {loading && <p>Cargando comentarios...</p>}
          {error && <p className="text-red-500">Error al cargar los comentarios.</p>}
          {/* Input de comentario */}
          <form onSubmit={handleSubmit}>
            <div className="flex items-start border border-gray-300 rounded-lg p-3 bg-white mt-3">
              <img src={loginImage} alt="Avatar" className="w-10 h-10 rounded-full mt-1" />
              <textarea
                placeholder="Write a comment..."
                name="content"
                value={comment.content}
                onChange={handleChange}
                className="flex-1 bg-transparent outline-none px-3 text-gray-600 placeholder-gray-400 resize-none h-12"
                rows="1"
              ></textarea>
              <button
                type="submit"
                className="cursor-pointer bg-purple-800 text-white px-4 py-2 rounded-lg hover:bg-gray-900 transition flex items-center gap-2"
              >
                {editingComment ? "Update" : "Post"}
                <Send size={16} />
              </button>
            </div>
          </form>
          {/* Lista de comentarios */}
          {comments.map((comment) => (
            <CommentItem key={comment.id} comment={comment} user={user} onDelete={() => handleDelete(comment.id)} onEdit={() => handleEdit(comment)} />
          ))}
        </div>
      </div>
    </div>
  );
}


