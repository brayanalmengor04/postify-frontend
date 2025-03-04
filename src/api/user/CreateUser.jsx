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

          {id && (
         <div>
  <label className="block text-sm font-medium text-gray-300 mb-2">Avatar</label>
  <div className="flex items-center justify-center w-full">
    <label htmlFor="dropzone-file" className="flex flex-col items-center justify-center w-full max-w-xs h-40 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-gray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600">
      <div className="flex flex-col items-center justify-center pt-3 pb-4">
        <svg className="w-6 h-6 mb-2 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 16">
          <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"/>
        </svg>
        <p className="mb-1 text-xs text-gray-500 dark:text-gray-400"><span className="font-semibold">Click upload Avatar</span></p>
        <p className="text-[10px] text-gray-500 dark:text-gray-400">JPG , PNG (MAX. 800x400px)</p>
      </div>
      <input id="dropzone-file" type="file" className="hidden" />
    </label>
  </div>
</div>

          )}

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