import React from 'react'
import { useState } from "react";
import { ChevronRight, ChevronLeft } from "lucide-react"; 
import { Link } from 'react-router-dom';

export default function DropdownMenu({ icon, text }) { 
    const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="relative inline-block">
      <button
        className="cursor-pointer flex items-center space-x-3 p-3 rounded-lg text-white hover:bg-gray-800 transition"
        onClick={() => setIsOpen(!isOpen)}
      >
        {icon}
        <span>{text}</span>
        <ChevronRight className="w-4 h-4" />
      </button>
      {isOpen && (
        <div className="absolute top-0 left-full ml-2 flex flex-col bg-gray-900 shadow-lg rounded-lg p-2 w-48">
          <Link to={"/postify/admin/users"} className="px-4 py-2 cursor-pointer text-white hover:bg-gray-800 text-white rounded">Administrar Usuario</Link>
          <Link to={"/postify/admin/roles"} className="px-4 py-2 cursor-pointer text-white hover:bg-gray-800 text-white rounded">Administrar Roles</Link>
          <Link to={"#"} className="px-4 py-2 cursor-pointer text-white hover:bg-gray-800 text-white rounded">Administrar Comentarios</Link>
        </div>
      )}
    </div>
  )
}
