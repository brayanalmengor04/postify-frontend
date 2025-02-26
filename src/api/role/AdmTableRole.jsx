import React, { useEffect, useState } from 'react';
import { Pencil, Trash2, Plus } from 'lucide-react';
import SiderBarMenu from '../../template/SiderBarMenu';
import { useNavigate } from 'react-router-dom';

export default function AdmTableRole() { 
    const [isSidebarOpen, setSidebarOpen] = useState(false);
    const [user, setUser] = useState(null);
    const navigate = useNavigate();
    
    const handleLogout = () => { localStorage.removeItem("authToken"); localStorage.removeItem("user");
      navigate("/login");
    };
    
    useEffect(() => {
      const storedUser = localStorage.getItem("user");
      if (storedUser) {
        setUser(JSON.parse(storedUser));
      } else {
        navigate("/login");
      }
    }, [navigate]);

    const roles = [
      { idRole: 1, roleName: 'Admin', description: 'Full access to all settings', permission: 'ALL', createdAt: '2024-02-01' },
      { idRole: 2, roleName: 'Editor', description: 'Can edit content', permission: 'EDIT_CONTENT', createdAt: '2024-02-10' },
      { idRole: 3, roleName: 'User', description: 'Basic access', permission: 'READ_ONLY', createdAt: '2024-02-15' },
    ];
    
    return ( 
      <>
      <SiderBarMenu isSidebarOpen={isSidebarOpen}
              setSidebarOpen={setSidebarOpen}
              handleLogout={handleLogout}
              user={user}
            />
      <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="p-8 bg-white shadow-lg rounded-2xl w-full max-w-5xl">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-700">Roles Management</h2>
          <button className="flex items-center bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition">
            <Plus size={16} className="mr-2" /> Add Role
          </button>
        </div>
        <table className="w-full border-collapse border border-gray-300 rounded-lg overflow-hidden">
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
    </div>
      </>  
  );
}