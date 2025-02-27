import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

export default function CreateUser() {
  let navigate = useNavigate();
  let { id } = useParams();
  const [selectedRole, setSelectedRole] = useState(1);
  const [user, setUser] = useState({
    name: "",
    lastName: "",
    streetAddress: "",
    email: "",
    password: ""
  });

  useEffect(() => {
    if (id) {
      axios.get(`http://localhost:8080/postify-app/user/${id}`)
        .then(response => {
          setUser(response.data);
          setSelectedRole(response.data.role.idRole);
        })
        .catch(error => console.error("Error al obtener usuario:", error));
    }
  }, [id]);

  const onInputChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    const urlBackend = id 
      ? `http://localhost:8080/postify-app/user/${id}` 
      : "http://localhost:8080/postify-app/user-add";

    try {
      if (id) {
        await axios.put(urlBackend, { ...user, roleId: selectedRole }); 
        navigate("/postify/admin/users");
      } else {
        await axios.post(urlBackend, { ...user, roleId: selectedRole });
      }
      navigate("/");
    } catch (error) {
      console.error("Error al guardar usuario:", error);
    }
  };

  return (
    <div className='flex min-h-screen items-center justify-center bg-gray-800 p-6'>
      <div className="w-full max-w-lg bg-gray-900 shadow-2xl rounded-2xl p-8">
        <h2 className='text-2xl font-bold text-gray-100 text-center mb-6'>
          {id ? "Edit User" : "Register New User"}
        </h2>
        <form onSubmit={onSubmit} className="space-y-5">
          {['name', 'lastName', 'email', 'password', 'streetAddress'].map((field) => (
            <div key={field} className="relative z-0 w-full mb-5 group">
              <input 
                type={field === 'password' ? 'password' : 'text'}
                name={field} 
                value={user[field]} 
                onChange={onInputChange} 
                required 
                className='block py-2.5 px-0 w-full text-sm text-gray-100 bg-transparent border-0 border-b-2 border-gray-600 appearance-none focus:outline-none focus:ring-0 focus:border-gray-400 peer'
                placeholder=" "
              />
              <label className='peer-focus:font-medium absolute text-sm text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 peer-focus:text-gray-300 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6 capitalize'>
                {field.replace(/([A-Z])/g, ' $1')}
              </label>
            </div>
          ))}

          <div className="mt-4">
            <label className='text-sm font-medium text-gray-300'>Select Role</label>
            <select 
              value={selectedRole} 
              onChange={(e) => setSelectedRole(Number(e.target.value))} 
              className='w-full mt-2 p-2 text-gray-100 bg-gray-700 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-500'>
              <option value={1}>Administrator</option>
              <option value={2}>User</option>
              <option value={3}>Visitor</option>
            </select>
          </div>

          <div className="flex justify-between mt-6">
            <button 
              type="button" 
              onClick={() => navigate("/")} 
              className="px-5 py-2 text-gray-300 bg-gray-700 rounded-lg shadow-md hover:bg-gray-600 transition"
            >
              Cancel
            </button>
            <button 
              type="submit" 
              className="px-5 py-2 text-white bg-gray-600 rounded-lg shadow-md hover:bg-gray-500 transition"
            >
              {id ? "Update" : "Save"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
