import React, { useEffect, useState } from 'react';
import { Pencil, Trash2, Plus } from 'lucide-react';
import SiderBarMenu from '../../template/SiderBarMenu';
import { useNavigate } from 'react-router-dom';
import FormDialogRole from '../../components/FormDialogRole';
import axios from 'axios';

export default function AdmTableRole() {
    const [isSidebarOpen, setSidebarOpen] = useState(false);
    const [user, setUser] = useState(null);
    const navigate = useNavigate(); 
    const urlEndpoint ="http://localhost:8080/postify-app/role"

    const [roles, setListRoles] = useState([]);

    const loadListRoles = async ()=>{
        try {
          const result = await axios.get(urlEndpoint);
          setListRoles(result.data); 
        } catch (error) {
          console.error("Error al cargar los roles:", error);
        }
    }
    const handleLogout = () => {
        localStorage.removeItem("authToken");
        localStorage.removeItem("user");
        navigate("/login");
    };

    useEffect(() => {
      loadListRoles(); // Cargar roles al montar el componente
      
      const storedUser = localStorage.getItem("user");
      if (storedUser) {
          setUser(JSON.parse(storedUser));
      } else {
          navigate("/login");
      }
  }, [navigate]);

    return (
        <>
            <SiderBarMenu isSidebarOpen={isSidebarOpen} setSidebarOpen={setSidebarOpen} handleLogout={handleLogout} user={user} />
            <div className="flex justify-center items-center min-h-screen bg-gray-100 p-4">
                <div className="p-6 bg-white shadow-lg rounded-2xl w-full max-w-5xl">
                    {/* Responsive Table */}
                    <div className="overflow-x-auto">
                    <div className="flex justify-between items-center mb-6">
                        <h2 className="text-2xl font-bold text-gray-700">Roles Management</h2>
                        <FormDialogRole setListRoles={setListRoles} />
                    </div>
                    
                        <table className="w-full border-collapse border border-gray-300 rounded-lg hidden md:table">
                            <thead>
                                <tr className="bg-gray-200 text-gray-700">
                                    <th className="p-4 text-left border border-gray-300">Role Name</th>
                                    <th className="p-4 text-left border border-gray-300">Description</th>
                                    <th className="p-4 text-left border border-gray-300">Permission</th>
                                    <th className="p-4 text-left border border-gray-300">Created At</th>
                                    <th className="p-4 text-center border border-gray-300">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {roles.map((role) => (
                                    <tr key={role.idRole} className="hover:bg-gray-50">
                                        <td className="p-4 border border-gray-300 font-medium">{role.roleName}</td>
                                        <td className="p-4 border border-gray-300 text-gray-600">{role.description}</td>
                                        <td className="p-4 border border-gray-300">
                                            <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm">{role.permission}</span>
                                        </td>
                                        <td className="p-4 border border-gray-300 text-gray-500">{role.createdAt}</td>
                                        <td className="p-4 border border-gray-300 text-center flex justify-center space-x-3">
                                            <button className="p-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition">
                                                <Pencil size={16} />
                                            </button>
                                            <button className="p-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition">
                                                <Trash2 size={16} />
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                    
                    {/* Mobile Cards */}
                    <div className="grid gap-4 md:hidden">
                        {roles.map((role) => (
                            <div key={role.idRole} className="p-4 bg-gray-50 shadow rounded-lg">
                                <h3 className="text-lg font-semibold text-gray-800">{role.roleName}</h3>
                                <p className="text-sm text-gray-600">{role.description}</p>
                                <p className="text-sm text-gray-500">Permission: <span className="font-medium text-blue-700">{role.permission}</span></p>
                                <p className="text-sm text-gray-500">Created: {role.createdAt}</p>
                                <div className="flex justify-end mt-3 space-x-2">
                                    <button className="p-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition">
                                        <Pencil size={16} />
                                    </button>
                                    <button className="p-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition">
                                        <Trash2 size={16} />
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </>
    );
}
