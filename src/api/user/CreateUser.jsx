import axios from 'axios';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';


export default function CreateUser() {  
  let navigate = useNavigate();

  const [selectedRole, setSelectedRole] = useState(1); 
  const [user , setUser] = useState({
    name: "",
    lastName: "",
    streetAddress: "",
    email: "",
    password: ""
  });
  // Extraemos los valores del usuario
  const { name, lastName, streetAddress, email, password } = user;
  const onInputChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  }; 
  const onSubmit = async (e) => {
    e.preventDefault(); // Previene la recarga de la página 
    const urlBackend = "http://localhost:8080/postify-app/user-add";

    try {
      // Se asegura de que el body del request coincida con UserDTO
      await axios.post(urlBackend, { ...user, roleId: selectedRole });  
      navigate("/");
    } catch (error) {
      console.error("Error al registrar usuario:", error);
    }
  }
  return (
    <div className='flex min-h-screen items-center justify-center p-5'>
      <div className="w-1/2 max-w-lg bg-white shadow-lg rounded-lg p-6">
        <form className="max-h-[80vh] overflow-y-auto p-4"
        // FUNCION PARA ENVIAR FORMULARIO
        onSubmit={onSubmit}
        
        >
          <div className='border-b border-gray-900/10 pb-6' >
            <h2 className='text-base font-semibold text-gray-900'>Register new user!</h2>
            <p className='mt-1 text-sm text-gray-600'>Use a permanent address where you can receive mail.</p>
          </div>

          <div className='mt-6 grid grid-cols-1 gap-x-6 gap-y-6 sm:grid-cols-6'>
            <div className='sm:col-span-3'>
              <label htmlFor='name' className='block text-sm/6 font-medium text-gray-900'>First name</label>
              <div className='mt-2'>
                <input type='text' name='name' id='name' autoComplete='given-name'
                  className='block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 
                  outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6'
                  //Aqui obtendre los valores para backend
                  value={name} onChange={onInputChange} required

                  />
              </div>
            </div>

            <div className='sm:col-span-3'>
              <label htmlFor='lastName' className='block text-sm/6 font-medium text-gray-900'>Last name</label>
              <div className='mt-2'>
                <input type='text' name='lastName' id='lastName' autoComplete='family-name'
                  className='block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 
                  outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6' 
                  
                   //Aqui obtendre los valores para backend
                   value={lastName}
                   onChange={onInputChange}
                   required
                  
                  />
              </div>
            </div>
            <div className='sm:col-span-full'>
              <label htmlFor='email' className='block text-sm/6 font-medium text-gray-900'>Email address</label>
              <div className='mt-2'>
                <input id='email' name='email' type='email' autoComplete='email'
                  className='block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 
                  outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6' 
                   //Aqui obtendre los valores para backend
                   value={email}
                   onChange={onInputChange}
                   required
                  />
              </div>
            </div>

            <div className='sm:col-span-full'>
              <label htmlFor='password' className='block text-sm/6 font-medium text-gray-900'>Password*</label>
              <div className='mt-2'>
                <input id='password' name='password' type='password' autoComplete='password'
                  className='block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 
                  outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6'
                   //Aqui obtendre los valores para backend
                   value={password}
                   onChange={onInputChange}
                   required
                  />
              </div>
            </div>

            <div className='col-span-full'>
              <label htmlFor='streetAddress' className='block text-sm/6 font-medium text-gray-900'>Street address</label>
              <div className='mt-2'>
                <input type='text' name='streetAddress' id='streetAddress' autoComplete='streetAddress'
                  className='block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 
                  outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6' 
                   //Aqui obtendre los valores para backend
                   value={streetAddress}
                   onChange={onInputChange}
                   required
                  />
              </div>
              
            </div>
                {/* Seleccion de Roles Aqui! Seguir ----------- */}
                {/* Selección de Roles */}
                <fieldset>
                  <legend className="text-sm font-semibold text-gray-900">Select Role</legend>
                  <p className="mt-1 text-sm text-gray-600">Choose a role to define your access level.</p>
                  <div className="mt-6 space-y-6">
                    {[
                      { id: 1, label: "Administrator" },
                      { id: 2, label: "User" },
                      { id: 3, label: "Visitor" }
                    ].map(role => (
                      <div key={role.id} className="flex items-center gap-x-3">
                        <input id={`role-${role.id}`} name="user-role" type="radio" value={role.id}
                          checked={selectedRole === role.id}
                          onChange={(e) => setSelectedRole(Number(e.target.value))}
                          className="size-4 appearance-none rounded-full border border-gray-300 bg-white checked:border-indigo-600 checked:bg-indigo-600" />
                        <label htmlFor={`role-${role.id}`} className="block text-sm font-medium text-gray-900">{role.label}</label>
                      </div>
                    ))}
                  </div>
                </fieldset>
                 </div>

          {/* Sección de botones fijos */}
          <div className="sticky bottom-0 left-0 right-0 bg-white p-4 flex items-center justify-end gap-x-6 shadow-md">
            <a href='/' type="button" className="text-sm font-semibold text-gray-900">Cancel</a>
            <button type="submit"
              className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-xs 
              hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
