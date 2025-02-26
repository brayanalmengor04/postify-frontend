import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Send } from "lucide-react";
import loginImage from "../../assets/images/login.png";
import { useComments } from "../../hooks/useComments";
import CommentItem from "../../components/Comment/CommentItem"; 
import CommentDrop from "../../components/DropdownMenu";
import SiderBarMenu from "../../template/SiderBarMenu";

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
  // Estados ------------------------------
  
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    } else {
      navigate("/login");
    }
  }, [navigate]);

  const handleLogout = () => { localStorage.removeItem("authToken"); localStorage.removeItem("user");
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
      fetchComments(); 
    } catch (error) {
      console.error("Error al agregar el comentario:", error);
    }
  }; 

  const onDelete = ()=>{console.log("eliminando...")}
  const onEdit = ()=>{console.log("editando..")}

  return (
      <div className="flex min-h-screen bg-gray-100"> 
        <SiderBarMenu isSidebarOpen={isSidebarOpen}
          setSidebarOpen={setSidebarOpen}
          user={user}
          handleLogout={handleLogout}
        />
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
              <button type="submit" className="cursor-pointer bg-purple-800 text-white px-4 py-2 rounded-lg flex items-center hover:bg-gray-900 transition">
                <span>Post</span>
                <Send size={16} />
              </button>
            </div>
          </form>
          {/* Lista de comentarios */}
          {comments.map((comment, index) => (
            // <CommentItem key={index} comment={comment} /> 
            <CommentItem comment={comment} onDelete={onDelete(comment)} onEdit={onEdit(comment)} />
          ))}
        </div>
      </div>
    </div>
  );
}
const SidebarItem = ({ icon, text }) => (
  <button className="cursor-pointer flex items-center space-x-3 p-3 rounded-lg text-white hover:bg-gray-800 transition">
    {icon}
    <span>{text}</span>
  </button>
);

