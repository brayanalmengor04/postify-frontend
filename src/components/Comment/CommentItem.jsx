import React, { useState } from "react";
import { Heart, MessageCircle, Trash2, Edit, CornerDownRight, Send } from "lucide-react"; 
import loginImage from "../../assets/images/avatarDefault.jpg"; 
import ReplyItem from "../Reply/ReplyItem";
import { useReplies } from "../../hooks/reply/useReplies";

export default function CommentItem({ comment, user, onDelete, onEdit ,onLike}) {
  const isOwner = user?.id === comment.user?.id;
  const isAdmin = user?.role?.roleName === "ADMIN";
  const [showConfirm, setShowConfirm] = useState(false);
  const [showReplies, setShowReplies] = useState(false); // Estado para mostrar respuestas 
  const [showReplyInput, setShowReplyInput] = useState(false); 
  const [liked , setLiked] = useState(false); 

  // Manejo de reply 
  const { replies, replyContent, handleReplyChange, submitReply } = useReplies(comment.id, user.id);
  return (
    <div className="mt-4 bg-white p-4 rounded-lg shadow-lg border border-gray-200">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <img src={loginImage} alt="User" className="w-12 h-12 rounded-full border border-gray-300" />
          <div>
            <p className="font-semibold text-gray-900">{comment.user?.name} {comment.user?.lastName}</p>
            <p className="text-sm text-gray-500">{new Date(comment.createdAt).toLocaleString()}</p>
          </div>
        </div>
        {(isOwner || isAdmin) && (
          <div className="flex space-x-2">
            <button onClick={() => onEdit(comment)} className="cursor-pointer text-purple-900 hover:text-blue-700">
              <Edit size={20} />
            </button>
            <button onClick={() => setShowConfirm(true)} className="cursor-pointer text-red-500 hover:text-red-700">
              <Trash2 size={20} />
            </button>
          </div>
        )}
      </div>
      <p className="mt-3 text-gray-700 text-lg leading-relaxed">{comment.content}</p>

      <div className="mt-4 flex items-center space-x-6 text-gray-600">
      <button
        className="cursor-pointer flex items-center space-x-2 hover:text-red-800"
        onClick={() => {
          onLike(comment.id);
          setLiked(!liked); // Cambia el estado de "like"
        }}
      >
        {liked ? <Heart size={20} fill="red" /> : <Heart size={20} />}
        <span>{comment.likes}</span>
      </button>
        <button
          className="cursor-pointer flex items-center space-x-2 hover:text-blue-600"
          onClick={() => setShowReplies(!showReplies)}
        >
          <MessageCircle size={20} />
          <span>{replies.length}</span>
        </button> 
        <button
          className="cursor-pointer flex items-center space-x-2 hover:text-green-600"
          onClick={() => setShowReplyInput(!showReplyInput)}
        >
          <CornerDownRight size={20} />
          <span>Reply</span>
        </button>
      </div> 

      {/* Textarea para escribir una respuesta */}
      {showReplyInput && (
        <div className="mt-3 flex items-center bg-transparent border border-transparent rounded-lg p-3">
          <textarea
            placeholder="Write a comment..."
            value={replyContent}
            onChange={handleReplyChange}
            className="flex-1 bg-transparent outline-none px-3 text-gray-600 placeholder-gray-400 resize-none h-12 rounded-lg focus:ring-2 focus:ring-purple-500"
            rows="1"
          ></textarea>
          <button
            onClick={submitReply}
            className="bg-purple-800 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition-all flex items-center justify-center ml-2"
          >
            <Send size={20} />
          </button>
        </div>
      )}

      {/* Renderizar respuestas si showReplies es true */}
      {showReplies && (
        <div className="mt-3">
          {replies.map((reply) => (
            <ReplyItem key={reply.id} reply={reply} />
          ))}
        </div>
      )}

      {showConfirm && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg text-center max-w-sm">
            <p className="text-lg font-semibold mb-4 text-gray-800">¿Estás seguro de que deseas eliminar este comentario?</p>
            <div className="flex justify-center space-x-4">
              <button
                onClick={() => { onDelete(comment); setShowConfirm(false); }}
                className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-all"
              >
                Confirmar
              </button>
              <button
                onClick={() => setShowConfirm(false)}
                className="bg-gray-300 text-black px-4 py-2 rounded-lg hover:bg-gray-500 transition-all"
              >
                Cancelar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

