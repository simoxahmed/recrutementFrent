// FichierProfessionnel.js
import React, { useState } from 'react';
import CustomFileInput from './fichierProfessionel/CustomDropzone';
import PopupS from '../features/Notification/PopupS';
import authService from '../../services/authService';
// import CustomFileInput from './CustomFileInput'; // Adjust the path based on your project structure

const FichierProfessionnel = ({userData}) => {
  const [cvFile, setCvFile] = useState(null);
  const [motivationFile, setMotivationFile] = useState(null);
  const [authorFile, setAuthorFile] = useState(null);
  const [authState, setAuthState] = useState('');
    const [msg, setMsg] = useState('');
    const [showPopup, setShowPopup] = useState(false);

  

  console.log(userData);
  if (Object.keys(userData).length!==0 && (userData.employee.tele===null || userData.employee.lettre===null || userData.employee.cv===null)&& authState !== 'addOnly') {
    setAuthState('addOnly')
    
  }

  const handleAdd = (e) => {
    e.preventDefault();
    console.log(cvFile, motivationFile, authorFile);
    const postulation = async () => {
    const response = await authService.fichierAdd(cvFile,motivationFile,authorFile);
    console.log(response.data.post_success);
    const msg = response.data.post_success;
    if (msg !== undefined) {
      setShowPopup(true)
      setMsg(msg)
    }}
    postulation()
    console.log('Add button clicked');
  };

  const handleModify = () => {
    console.log('Modify button clicked');
  };

  const handleDelete = () => {
    console.log('Delete button clicked');
  };

  const removeCvFile = () => {
    setCvFile(null);
  };

  const removeMotivationFile = () => {
    setMotivationFile(null);
  };

  const removeAuthorFile = () => {
    setAuthorFile(null);
  };

  const handleClosePopup = () => {
            
    setShowPopup(false);
  };

  return (
    <div className="flex flex-col items-center justify-center h-[80vh] mx-auto w-[40vw] bg-gray-100">
      <PopupS message={msg} show={showPopup} onClose={handleClosePopup} />
      <form className="bg-white p-10 w-full rounded shadow-md">
        <h1 className="text-3xl font-bold mb-6">File Upload Form</h1>

        <CustomFileInput
          label="CV"
          onFileChange={(file) => setCvFile(file)}
          onRemove={removeCvFile}
          file={cvFile}
        />

        <CustomFileInput
          label="Letter of Motivation"
          onFileChange={(file) => setMotivationFile(file)}
          onRemove={removeMotivationFile}
          file={motivationFile}
        />

        <CustomFileInput
          label="Author File"
          onFileChange={(file) => setAuthorFile(file)}
          onRemove={removeAuthorFile}
          file={authorFile}
        />

        <div className="flex justify-center space-x-4 mt-6 ">
        {authState === 'addOnly' ? (
          <button
            className="bg-blue-500 text-white px-6 py-2 rounded hover:bg-blue-600 focus:outline-none focus:shadow-outline-blue"
            onClick={handleAdd}
          >
            Add
          </button>
        ) : (
          <>
            <button
              className="bg-yellow-500 text-white px-6 py-2 rounded hover:bg-yellow-600 focus:outline-none focus:shadow-outline-yellow"
              onClick={handleModify}
            >
              Modify
            </button>
            <button
              className="bg-red-500 text-white px-6 py-2 rounded hover:bg-red-600 focus:outline-none focus:shadow-outline-red"
              onClick={handleDelete}
            >
              Delete
            </button>
          </>
        )}

        </div>
      </form>
    </div>
  );
};

export default FichierProfessionnel;
