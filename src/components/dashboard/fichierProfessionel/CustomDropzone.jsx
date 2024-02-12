// CustomFileInput.js
import React, { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { AiOutlineClose } from 'react-icons/ai';

const CustomFileInput = ({ label, onFileChange, onRemove, file, handleFileChange }) => {
  const onDropCallback = useCallback(
    (acceptedFiles) => {
      if (onFileChange) {
        onFileChange(acceptedFiles[0]);
      }
    },
    [onFileChange]
  );

  const removeFile = () => {
    if (onRemove) {
      onRemove();
    }
  };

  const { getRootProps, getInputProps } = useDropzone({
    onDrop: onDropCallback,
    multiple: false,
  });

  return (
    <div className="flex flex-col items-center mt-4">
      <div
        {...getRootProps({
          className: 'w-full text-center border-dashed border-2 border-gray-300 p-4 rounded-lg cursor-pointer',
        })}
      >
        <input type='file'  {...getInputProps()} />
        <p className="text-lg mb-2">{label}</p>
      </div>

      {file && (
        <div className="flex mt-2 space-x-1 rounded-md p-1 bg-gray-300">
          <p className="text-sm text-gray-600 mb-1">{file.name}</p>
          <div
            className="text-sm text-red-500 hover:text-red-700 focus:outline-none"
            onClick={removeFile}
          >
                    <AiOutlineClose />
          </div>
        </div>
      )}
    </div>
  );
};

export default CustomFileInput;
