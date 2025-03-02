import React, { useState } from 'react'
import { Heart, MessageCircle, Trash2, Edit } from "lucide-react"; 
import loginImage from "../../assets/images/login.png"; 
export default function CommentItem({ comment, user, onDelete, onEdit }) {
  const isOwner = user?.id === comment.user?.id;
  const isAdmin = user?.role?.roleName === "ADMIN"; // Ajusta según cómo se almacena el rol
  const [showConfirm, setShowConfirm] = useState(false);


  return (
    <div className="mt-4 bg-gray-50 p-4 rounded-lg shadow">
      <div className="flex items-center justify-between">
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
        {(isOwner || isAdmin) && (
          <div className="flex space-x-2">
            <button onClick={() => onEdit(comment)} className="text-purple-900 hover:text-blue-700">
              <Edit size={18} />
            </button>
            <button onClick={() => setShowConfirm(true)} className="text-red-500 hover:text-red-700">
              <Trash2 size={18} />
            </button>
          </div>
        )}
      </div>
      <p className="mt-2 text-gray-700">{comment.content}</p> 

      {showConfirm && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg text-center">
            <p className="text-lg font-semibold mb-4">¿Estás seguro de que deseas eliminar este comentario?</p>
            <div className="flex justify-center space-x-4">
              <button
                onClick={() => { onDelete(comment); setShowConfirm(false); }}
                className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-700"
              >
                Confirmar
              </button>
              <button
                onClick={() => setShowConfirm(false)}
                className="bg-gray-300 text-black px-4 py-2 rounded-lg hover:bg-gray-500"
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
