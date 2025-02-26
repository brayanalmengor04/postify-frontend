import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Send, MessageCircle, Heart, Home, User, Settings, LogOut, Menu, X } from "lucide-react";
import loginImage from "../../assets/images/login.png";
import { useComments } from "../../hooks/useComments";

export default function DashboardPage() {
  const navigate = useNavigate();
  const { comments, loading, error,fetchComments} = useComments(); // Extraemos fetchComments
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const [user, setUser] = useState(null);
  const [comment, setComment] = useState({
    content: "",
    likes: 0,
    userId: null,
  }); 
  useEffect(() => {
    const storedUser = localStorage.getItem("user");


    if (storedUser) {
      setUser(JSON.parse(storedUser));
    } else {
      navigate("/login");
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    localStorage.removeItem("user");
    navigate("/login");
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setComment((prevComment) => ({
      ...prevComment,
      [name]: value,
      userId: user?.id,
    }));
  };
  const onSubmit = async (e) => {
    e.preventDefault();
    if (!user) {
      console.error("Usuario no autenticado");
      return;
    }
    try {
      await axios.post("http://localhost:8080/postify-app/comment-add", comment);
      setComment({ content: "", likes: 0, userId: user?.id }); // Limpiar textarea
      fetchComments(); // 👈 Vuelve a cargar los comentarios después de agregar uno nuevo
    } catch (error) {
      console.error("Error al agregar el comentario:", error);
    }
  };
  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Botón para abrir el sidebar */}
      {!isSidebarOpen && (
        <button
          onClick={() => setSidebarOpen(true)}
          className="cursor-pointer fixed top-4 left-4 bg-purple-400 text-white p-2 rounded-lg shadow-lg hover:bg-gray-900 transition"
        >
          <Menu size={24} />
        </button>
      )}

      {/* Sidebar */}
      {isSidebarOpen && (
        <aside className="w-80 bg-purple-800 shadow-xl p-8 fixed h-full transition-all ease-in-out duration-300">
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-semibold text-white">Postify v1.0</h2>
            <button onClick={() => setSidebarOpen(false)} className="text-white hover:text-gray-300 transition">
              <X size={24} />
            </button>
          </div>

          {/* User Section */}
          <div className="flex items-center space-x-4 mt-4">
            <div className="w-10 h-10 rounded-md bg-white text-purple-700 flex items-center justify-center font-semibold shadow-xl">
              {user?.name?.charAt(0)}
            </div>
            <div>
              <p className="text-lg text-white font-semibold">{user?.name} {user?.lastName}</p>
              <p className="text-sm text-gray-200">{user?.email}</p>
            </div>
          </div>

          {/* Navigation */}
          <nav className="mt-8 space-y-4 text-white">
            <SidebarItem icon={<Home size={20} />} text="Home" />
            <SidebarItem icon={<User size={20} />} text="Perfil" />
            <SidebarItem icon={<Settings size={20} />} text="Setting" />
          </nav>

          {/* Logout */}
          <button onClick={handleLogout} className="mt-auto flex items-center space-x-2 text-white hover:text-red-600 transition">
            <LogOut size={20} />
            <span>Log out</span>
          </button>
        </aside>
      )}

      {/* Contenido principal */}
      <div className="flex-1 flex flex-col items-center p-8">
        <h1 className="text-3xl font-bold text-gray-800">Postify - Shared & Connect v1.0!</h1>

        {/* Sección de comentarios */}
        <div className="w-full max-w-2xl mt-6 bg-white shadow-md rounded-lg p-5">
          <h2 className="text-xl font-semibold text-gray-800">Comment!</h2>
          {loading && <p>Cargando comentarios...</p>}
          {error && <p className="text-red-500">Error al cargar los comentarios.</p>}

          {/* Input de comentario */}
          <form onSubmit={onSubmit}>
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
              <button type="submit" className="bg-purple-800 text-white px-4 py-2 rounded-lg flex items-center hover:bg-gray-900 transition">
                <span>Post</span>
                <Send size={16} />
              </button>
            </div>
          </form>

          {/* Lista de comentarios */}
          {comments.map((comment, index) => (
            <CommentItem key={index} comment={comment} />
          ))}
        </div>
      </div>
    </div>
  );
}

const CommentItem = ({ comment }) => (
  <div className="mt-4 bg-gray-50 p-4 rounded-lg shadow">
    <div className="flex items-center space-x-3">
      <img src={loginImage} alt="User" className="w-10 h-10 rounded-full" />
      <div>
        <p className="font-semibold text-gray-800">
          {comment.user?.name} {comment.user?.lastName}
        </p>
        <p className="text-sm text-gray-500">
          {new Date(comment.createdAt).toLocaleString()}
        </p>
      </div>
    </div>
    <p className="mt-2 text-gray-700">{comment.content}</p>
    <div className="flex items-center space-x-4 mt-2 text-gray-500">
      <button className="flex items-center space-x-1 hover:text-red-500 transition">
        <Heart size={18} />
        <span>{comment.likes}</span>
      </button>
      <button className="flex items-center space-x-1 hover:text-blue-500 transition">
        <MessageCircle size={18} />
        <span>0</span>
      </button>
    </div>
    <div className="mt-2 text-sm text-gray-600">
      <strong>Rol:</strong> {comment.user?.role?.roleName} - {comment.user?.role?.description}
    </div>
  </div>
);

const SidebarItem = ({ icon, text }) => (
  <button className="flex items-center space-x-3 p-3 rounded-lg text-white hover:bg-purple-700 transition">
    {icon}
    <span>{text}</span>
  </button>
);
