// FileViewModal.jsx
import React from 'react';
import Modal from './Modal';

const FileViewModal = ({ isOpen, handleClose, cvFile, coverLetterFile, otherFile }) => {
  return (
    <Modal isOpen={isOpen} handleClose={handleClose} title="Vue des Fichiers">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {cvFile && <FilePreview file={cvFile} label="CV" />}
        {coverLetterFile && <FilePreview file={coverLetterFile} label="Lettre de Motivation" />}
        {otherFile && <FilePreview file={otherFile} label="Autre Fichier" />}
      </div>
    </Modal>
  );
};

const FilePreview = ({ file, label }) => {
  return (
    <div className="bg-white p-4 rounded border border-gray-300">
      <p className="text-sm font-semibold mb-2">{label}</p>
      <p className="text-gray-600">{file.name}</p>
    </div>
  );
};

export default FileViewModal;
