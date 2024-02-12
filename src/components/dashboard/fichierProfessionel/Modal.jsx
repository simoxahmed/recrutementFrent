import React, { useState } from 'react';

const FileUploadModal = ({ isOpen, handleClose, handleFileUpload }) => {
  const [selectedFile, setSelectedFile] = useState(null);

  const handleFileChange = (e) => {
    setSelectedFile(e.target.files[0]);
  };

  const handleSubmit = () => {
    handleFileUpload(selectedFile);
    setSelectedFile(null);
    handleClose();
  };

  return (
    <div
      className={`fixed inset-0 z-50 ${isOpen ? 'flex' : 'hidden'} items-center justify-center`}
    >
      <div className="absolute inset-0 bg-black opacity-50"></div>

      <div className="bg-white p-8 rounded shadow-lg z-10">
        <h2 className="text-2xl font-semibold mb-6">Uploader un fichier</h2>

        <div className="mb-6">
          <label className="block text-gray-800 text-sm font-bold mb-2" htmlFor="fileInput">
            Sélectionner un fichier
          </label>
          <input
            type="file"
            id="fileInput"
            name="fileInput"
            onChange={handleFileChange}
            className="appearance-none border rounded w-full py-2 px-3 text-gray-800 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>

        <div className="flex justify-end">
          <button
            className="bg-gray-300 text-gray-700 px-4 py-2 rounded mr-2 hover:bg-gray-400 focus:outline-none focus:shadow-outline"
            onClick={handleClose}
          >
            Annuler
          </button>
          <button
            className="bg-[#00df9a] text-white px-4 py-2 rounded hover:bg-green-600 focus:outline-none focus:shadow-outline"
            onClick={handleSubmit}
            disabled={!selectedFile}
          >
            Envoyer
          </button>
        </div>
      </div>
    </div>
  );
};

export default FileUploadModal;
