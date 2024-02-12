// FileInput.jsx
import React, { useState } from 'react';

const FileInput = ({ label, id, onChange }) => {
  const [file, setFile] = useState(null);

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    setFile(selectedFile);
    onChange(selectedFile);
  };

  return (
    <div className="mb-4">
      <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor={id}>
        {label}
      </label>
      <input
        type="file"
        id={id}
        name={id}
        onChange={handleFileChange}
        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
      />
      {file && <p className="text-sm text-gray-500 mt-2">Selected: {file.name}</p>}
    </div>
  );
};

export default FileInput;
