import React, { use, useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { X, ChevronDown } from "lucide-react";

export default function FormDialogRole({setListRoles}) {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  
  const [role, setRole] = useState({
    roleName: "",
    description: "",
    permission: "",
  });

  const endPoint = "http://localhost:8080/postify-app/role-add";
  const permissions = ["FULL_ACCESS", "READ_ONLY","LIMITED_ACCESS"];
  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(endPoint, role);
      
      // Agregar nuevo rol a la lista sin recargar
      setListRoles(prevRoles => [...prevRoles, response.data]);

      // Limpiar formulario después de enviar los datos
      setRole({ roleName: "", description: "", permission: "" });
      
      setIsOpen(false); 
    } catch (error) {
      console.error("Error al agregar el rol:", error);
    }
  }; 

  const handleChange = (e) => {
    const { name, value } = e.target;
    setRole((prevRole) => ({ ...prevRole, [name]: value }));
  };

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="cursor-pointer flex items-center bg-gray-800 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition shadow-md"
      >
        Add Role
      </button>

      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm">
          <form
            onSubmit={onSubmit}
            className="bg-white w-full max-w-md rounded-lg shadow-lg overflow-hidden"
          >
            <div className="flex justify-between items-center bg-gray-800 text-white p-4">
              <h3 className="text-lg font-semibold">Create New Role</h3>
              <button
                onClick={() => setIsOpen(false)}
                type="button"
                className="cursor-pointer text-white"
                aria-label="Close"
              >
                <X size={20} />
              </button>
            </div>

            <div className="p-6 space-y-4">
              <div>
                <label className="block text-sm text-gray-600">Role Name</label>
                <input
                  type="text"
                  name="roleName"
                  value={role.roleName}
                  onChange={handleChange}
                  required
                  className="w-full border border-gray-300 rounded-md px-3 py-2 text-gray-700 focus:outline-none focus:ring-2 focus:ring-purple-500"
                  placeholder="Enter role name"
                />
              </div>

              <div>
                <label className="block text-sm text-gray-600">Description</label>
                <textarea
                  name="description"
                  value={role.description}
                  onChange={handleChange}
                  required
                  className="w-full border border-gray-300 rounded-md px-3 py-2 text-gray-700 focus:outline-none focus:ring-2 focus:ring-purple-500"
                  placeholder="Enter role description"
                ></textarea>
              </div>

              <div>
                <label className="block text-sm text-gray-600">Permission</label>
                <div className="relative">
                  <select
                    name="permission"
                    value={role.permission}
                    onChange={handleChange}
                    required
                    className="w-full appearance-none border border-gray-300 rounded-md px-3 py-2 text-gray-700 focus:outline-none focus:ring-2 focus:ring-purple-500"
                  >
                    <option value="" disabled>Select permission</option>
                    {permissions.map((perm) => (
                      <option key={perm} value={perm}>
                        {perm}
                      </option>
                    ))}
                  </select>
                  <ChevronDown className="absolute right-3 top-3 text-gray-500" size={18} />
                </div>
              </div>

              <button
                type="submit"
                className="cursor-pointer w-full bg-gray-900 text-white py-2 rounded-lg hover:bg-purple-700 transition shadow-md"
              >
                Save Role
              </button>
            </div>
          </form>
        </div>
      )}
    </>
  );
}
