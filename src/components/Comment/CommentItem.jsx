import React from 'react'
import { Heart, MessageCircle, Trash2, Edit } from "lucide-react"; 
import loginImage from "../../assets/images/login.png"; 
export default function CommentItem({ comment, onDelete, onEdit }) {
  return (
    <div className="mt-4 bg-gray-50 p-4 rounded-lg shadow">
    <div className="flex items-center justify-between">
      <div className="flex items-center space-x-3"> 

        {/* en bd permitir subir imagenes por ahora no lo implementare
        <img src={comment.user?.avatar || "/default-avatar.png"} alt="User" className="w-10 h-10 rounded-full" /> */} 
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
      <div className="flex space-x-2">
        <button onClick={() => onEdit(comment)} className="cursor-pointer text-purple-900 hover:text-blue-700 transition">
          <Edit size={18} />
        </button>
        <button onClick={() => onDelete(comment.id)} className="cursor-pointer text-red-500 hover:text-red-700 transition">
          <Trash2 size={18} />
        </button>
      </div>
    </div>
    
    <p className="mt-2 text-gray-700">{comment.content}</p>

    <div className="flex items-center space-x-4 mt-2 text-gray-500">
      <button className="cursor-pointer flex items-center space-x-1 hover:text-red-500 transition">
        <Heart size={18} />
        <span>{comment.likes}</span>
      </button>
      <button className="cursor-pointer flex items-center space-x-1 hover:text-blue-500 transition">
        <MessageCircle size={18} />
        <span>0</span>
      </button>
    </div>

    <div className="mt-2 text-sm text-gray-600">
    <strong>Rol:</strong> {comment.user?.role?.roleName} - {comment.user?.role?.description}
    </div>
  </div>
  )
}
