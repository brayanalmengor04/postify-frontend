import React, { use, useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { X, ChevronDown } from "lucide-react";
export default function FormDialogRole({ setListRoles, selectedRole, setIsEditOpen, isEditOpen }) {
  const [role, setRole] = useState(selectedRole || {
    roleName: "",
    description: "",
    permission: "",
  });
  useEffect(() => {
    if (selectedRole) {
      setRole(selectedRole); // Cargar los datos del rol cuando se seleccione
    }
  }, [selectedRole]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setRole((prevRole) => ({ ...prevRole, [name]: value }));
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      if (selectedRole) {
        // Si hay un rol seleccionado, actualizarlo
        await axios.put(`http://localhost:8080/postify-app/role/${selectedRole.idRole}`, role);
        setListRoles(prevRoles =>
          prevRoles.map(r => (r.idRole === selectedRole.idRole ? role : r))
        );
      } else {
        // Si no hay un rol seleccionado, crear uno nuevo
        const response = await axios.post("http://localhost:8080/postify-app/role-add", role);
        setListRoles(prevRoles => [...prevRoles, response.data]);
      }
      
      setIsEditOpen(false); // Cerrar modal después de actualizar
    } catch (error) {
      console.error("Error al guardar el rol:", error);
    }
  };

  return (
    <>
      {isEditOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm">
          <form onSubmit={onSubmit} className="bg-white w-full max-w-md rounded-lg shadow-lg overflow-hidden">
            <div className="flex justify-between items-center bg-gray-800 text-white p-4">
              <h3 className="text-lg font-semibold">{selectedRole ? "Edit Role" : "Create New Role"}</h3>
              <button
                onClick={() => setIsEditOpen(false)}
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
                <select
                  name="permission"
                  value={role.permission}
                  onChange={handleChange}
                  required
                  className="w-full border border-gray-300 rounded-md px-3 py-2 text-gray-700 focus:outline-none focus:ring-2 focus:ring-purple-500"
                >
                  <option value="" disabled>Select permission</option>
                  {["FULL_ACCESS", "READ_ONLY", "LIMITED_ACCESS"].map((perm) => (
                    <option key={perm} value={perm}>{perm}</option>
                  ))}
                </select>
              </div>

              <button
                type="submit"
                className="cursor-pointer w-full bg-gray-900 text-white py-2 rounded-lg hover:bg-purple-700 transition shadow-md"
              >
                {selectedRole ? "Update Role" : "Save Role"}
              </button>
            </div>
          </form>
        </div>
      )}
    </>
  );
}
