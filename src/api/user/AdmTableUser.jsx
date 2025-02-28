import React, { useEffect, useState } from 'react';
import SiderBarMenu from '../../template/SiderBarMenu'; 
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Pencil, Plus, Trash2 } from 'lucide-react';

export default function AdmTableUser() { 
  const [isSidebarOpen, setSidebarOpen] = useState(false); 
  const [user, setUser] = useState(null);   
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null); 
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [userToDelete, setUserToDelete] = useState(null);
  const [users, setUserList] = useState([]); 

  const navigate = useNavigate();  
  const endPoint = "http://localhost:8080/postify-app/user";

  const loadListUser = async () => {
    try {
      const result = await axios.get(endPoint);  
      setUserList(result.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {     
    const storedUser = localStorage.getItem("user");  
    loadListUser();
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

  // Abre el modal y guarda el ID del usuario a eliminar
  const openDeleteModal = (id) => {
    setUserToDelete(id);
    setIsModalOpen(true);
  };

  // Función para eliminar el usuario
  const handleDelete = async () => {
    if (!userToDelete) return;
    try {
      await axios.delete(`${endPoint}/${userToDelete}`);
      setUserList((prevUsers) => prevUsers.filter((user) => user.id !== userToDelete));
    } catch (error) {
      console.error("Error al eliminar el usuario:", error);
    }
    setIsModalOpen(false); // Cierra el modal después de eliminar
  };

  return (
    <>
      <SiderBarMenu isSidebarOpen={isSidebarOpen} setSidebarOpen={setSidebarOpen} handleLogout={handleLogout} user={user} /> 
      <div className="flex justify-center items-center min-h-screen bg-gray-100 p-4">
        <div className="p-6 bg-white shadow-lg rounded-2xl w-full max-w-5xl">
          <div className="overflow-x-auto">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-gray-700">User Management</h2> 
              <button className="cursor-pointer flex items-center bg-gray-800 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition" onClick={() => navigate("/user-create")}>
                <Plus size={16} className="mr-2" /> Add User
              </button>    
            </div>
            
            <table className="w-full border-collapse border border-gray-300 rounded-lg hidden md:table">
              <thead>
                <tr className="bg-gray-200 text-gray-700">
                  <th className="p-4 text-left border border-gray-300">Name</th>
                  <th className="p-4 text-left border border-gray-300">Last Name</th>
                  <th className="p-4 text-left border border-gray-300">Street Address</th>
                  <th className="p-4 text-left border border-gray-300">Email</th> 
                  <th className="p-4 text-left border border-gray-300">Role Name</th>
                  <th className="p-4 text-center border border-gray-300">Actions</th>
                </tr>
              </thead>
              <tbody>
                {users.map((user) => (
                  <tr key={user.id} className="hover:bg-gray-50">
                    <td className="p-4 border border-gray-300 font-medium">{user.name}</td>
                    <td className="p-4 border border-gray-300 text-gray-600">{user.lastName}</td> 
                    <td className="p-4 border border-gray-300 text-gray-600">{user.streetAddress}</td> 
                    <td className="p-4 border border-gray-300 text-gray-600">{user.email}</td>
                    <td className="p-4 border border-gray-300">
                      <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm">{user?.role?.roleName}</span>
                    </td>
                    <td className="p-4 border border-gray-300 text-center flex justify-center space-x-3">
                      <Link to={`/user-create/${user.id}`} className="cursor-pointer p-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition">
                        <Pencil size={16} />
                      </Link>
                      <button className="cursor-pointer p-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition" onClick={() => openDeleteModal(user.id)}>
                        <Trash2 size={16} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table> 
            
            {isModalOpen && (
              <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm z-50">
                <div className="bg-white p-6 rounded-lg shadow-lg max-w-sm w-full">
                  <h3 className="text-lg font-semibold text-gray-800">¿Estás seguro?</h3>
                  <p className="text-gray-600 mt-2">Esta acción no se puede deshacer.</p>
                  <div className="mt-4 flex justify-end space-x-3">
                    <button className="px-4 py-2 bg-gray-300 text-gray-800 rounded-lg hover:bg-gray-400" onClick={() => setIsModalOpen(false)}>
                      Cancelar
                    </button>
                    <button className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600" onClick={handleDelete}>
                      Confirmar
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}