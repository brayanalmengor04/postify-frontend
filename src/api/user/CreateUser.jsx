import React from 'react';

export default function CreateUser() {
  return (
    <div className='flex min-h-screen items-center justify-center p-5'>
      <div className="w-1/2 max-w-lg bg-white shadow-lg rounded-lg p-6">
        <form className="max-h-[80vh] overflow-y-auto p-4">
          <div className='border-b border-gray-900/10 pb-6'>
            <h2 className='text-base font-semibold text-gray-900'>Register new user!</h2>
            <p className='mt-1 text-sm text-gray-600'>Use a permanent address where you can receive mail.</p>
          </div>

          <div className='mt-6 grid grid-cols-1 gap-x-6 gap-y-6 sm:grid-cols-6'>
            <div className='sm:col-span-3'>
              <label htmlFor='first-name' className='block text-sm/6 font-medium text-gray-900'>First name</label>
              <div className='mt-2'>
                <input type='text' name='first-name' id='first-name' autoComplete='given-name'
                  className='block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 
                  outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6' />
              </div>
            </div>

            <div className='sm:col-span-3'>
              <label htmlFor='last-name' className='block text-sm/6 font-medium text-gray-900'>Last name</label>
              <div className='mt-2'>
                <input type='text' name='last-name' id='last-name' autoComplete='family-name'
                  className='block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 
                  outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6' />
              </div>
            </div>

            <div className='sm:col-span-full'>
              <label htmlFor='email' className='block text-sm/6 font-medium text-gray-900'>Email address</label>
              <div className='mt-2'>
                <input id='email' name='email' type='email' autoComplete='email'
                  className='block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 
                  outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6' />
              </div>
            </div>

            <div className='sm:col-span-full'>
              <label htmlFor='password' className='block text-sm/6 font-medium text-gray-900'>Password*</label>
              <div className='mt-2'>
                <input id='password' name='password' type='password' autoComplete='password'
                  className='block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 
                  outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6' />
              </div>
            </div>

            <div className='col-span-full'>
              <label htmlFor='street-address' className='block text-sm/6 font-medium text-gray-900'>Street address</label>
              <div className='mt-2'>
                <input type='text' name='street-address' id='street-address' autoComplete='street-address'
                  className='block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 
                  outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6' />
              </div>
              
            </div>

            {/* Seleccion de Roles Aqui! Seguir ----------- */}


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
