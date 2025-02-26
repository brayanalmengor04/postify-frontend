import React from 'react'
import DropdownMenu from '../components/DropdownMenu'; 
import { Send, Briefcase, Heart, Home, User, Settings, LogOut, Menu, X } from "lucide-react";
import { Link } from 'react-router-dom';

export default function SiderBarMenu({ isSidebarOpen, setSidebarOpen, user, handleLogout }) {
  return (
    <>
    {/* Botón para abrir el sidebar */}
    {!isSidebarOpen && (
      <button
        onClick={() => setSidebarOpen(true)}
        className="cursor-pointer bg-gray-800 fixed top-4 left-4 text-white p-2 rounded-lg shadow-lg hover:bg-gray-600 transition"
      >
        <Menu size={24} />
      </button>
    )}

    {/* Sidebar */}
    {isSidebarOpen && (
      <aside className="w-80 bg-gray-900 shadow-xl p-8 fixed h-full flex flex-col transition-all ease-in-out duration-300">
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-semibold text-white">Postify v1.0</h2>
          <button onClick={() => setSidebarOpen(false)} className="cursor-pointer text-white hover:text-gray-300 transition">
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
        <nav className="mt-8 space-y-4 text-white flex-grow">
          <SidebarItem icon={<Home size={20} />} text="Home" url={"/postify-dashboard"} />
          <SidebarItem icon={<User size={20} />} text="Perfil" url={"#"} />
          <DropdownMenu icon={<Briefcase size={20} />} text={"Administrations"} />
          <SidebarItem icon={<Settings size={20} />} text="Setting" />
        </nav>
        {/* Logout */}
        <button onClick={handleLogout} className="cursor-pointer mt-auto flex items-center space-x-2 text-white hover:text-red-600 transition">
          <LogOut size={20} />
          <span>Log out</span>
        </button>
      </aside>
    )} 
  </>
  
  )
}
const SidebarItem = ({ icon, text ,url }) => (
  <Link to={url} className="cursor-pointer flex items-center space-x-3 p-3 rounded-lg text-white hover:bg-gray-800 transition">
    {icon}
    <span>{text}</span>
  </Link>
);
