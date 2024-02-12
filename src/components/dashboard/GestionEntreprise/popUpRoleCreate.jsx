import React, { useState } from 'react'
import authService from '../../../services/authService';
import Cookies from 'js-cookie';

const PopUpRoleCreate = ({ isOpen, onClose }) => {
    
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');

  const handleNameChange = (event) => {
    setName(event.target.value);
  };

  const handleDescriptionChange = (event) => {
    setDescription(event.target.value);
  };

  const onSubmitForm= async(e)=>{
    e.preventDefault();
    try {
      const response = await authService.createRoles(name,description);
      console.log(response.data.post_success);
      const msg = response.data.post_success;
      Cookies.set('msgRoleAdd',msg)
      onClose()
    } catch (error) {
      console.error('Error creating demand:', error.response.data);
      // handle error response
    }
  }


  return (
    <div className={`fixed inset-0 z-50 overflow-y-auto ${isOpen ? '' : 'hidden'}`}>
      <div className="flex items-center justify-center min-h-screen px-4">
        <div className="fixed inset-0 transition-opacity" aria-hidden="true">
          <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
        </div>
        <form onSubmit={onSubmitForm} className="relative bg-white rounded-lg p-8 max-w-md w-full mx-auto">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold">Select Options</h2>
            <div onClick={onClose} className="text-gray-500 hover:text-gray-700 focus:outline-none">
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
              </svg>
            </div>
          </div>
          <div className="mb-6 ">
            <label htmlFor="name" className="block text-gray-700 font-medium mb-2">Role Name:</label>
            <input value={name} onChange={handleNameChange} type="text" className='rounded-md w-full p-1 ps-2 text-sm text-gray-900 border' name="name" />
          </div>
          
          <div className="mb-6">
            <label htmlFor="description" className="block text-gray-700 font-medium mb-2">Role Description:</label>
            {/* <input type="text" className='w-[200px] p-1 ps-2 text-sm text-gray-900 border' name="" id="" /> */}
            <textarea value={description} onChange={handleDescriptionChange} name="description" className='w-full h-[100px] rounded-md p-1 ps-2 text-sm text-gray-900 border'></textarea>
          </div>
          
          <div className="flex justify-end">
            <div onClick={onClose} className="px-4 py-2 bg-gray-200 text-gray-700 font-semibold rounded-md mr-2 hover:bg-gray-300 focus:outline-none">
              Cancel
            </div>
            <button type='submit' className="px-4 py-2 bg-blue-500 text-white font-semibold rounded-md hover:bg-blue-600 focus:outline-none">
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default PopUpRoleCreate