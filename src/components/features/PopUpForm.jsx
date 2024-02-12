import React, { useState } from 'react'
import CustomFileInput from '../dashboard/fichierProfessionel/CustomDropzone';
import authService from '../../services/authService';

const PopUpForm = ({onClose}) => {
    const [nomEntreprise, setNomEntreprise] = useState('');
    const [tele, setTele] = useState('');
    const [photo, setPhoto] = useState(null);
    const [photoCover, setPhotoCover] = useState(null);
    // const [photoCover, setPhotoCover] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(nomEntreprise,tele,photo,photoCover);
        const Create = async () => {
            const response = await authService.ChangeToEntre(nomEntreprise,tele,photo,photoCover);
            console.log(response.data.post_success);
        }
        Create()
        onClose(); // Close the popup after form submission
    };

    const removePhoto = () => {
        setPhoto(null);
      };

      const removePhotoCover = () => {
        setPhotoCover(null);
      };


  return (
    <div>
        <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-gray-800 bg-opacity-50 z-50">
            <div className="bg-white rounded-lg p-8 max-w-md w-full">
                <h2 className="text-2xl font-semibold mb-4">Popup Form</h2>
                <form onSubmit={handleSubmit}>
                <div className="mb-4">
                    <label htmlFor="nomEntreprise" className="block text-gray-700 font-semibold mb-2">Nom de l'entreprise</label>
                    <input type="text" id="nomEntreprise" className="form-input w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset" value={nomEntreprise} onChange={(e) => setNomEntreprise(e.target.value)} />
                </div>
                <div className="mb-4">
                    <label htmlFor="tele" className="block text-gray-700 font-semibold mb-2">Téléphone</label>
                    <input type="tel" id="tele" className="form-input w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset" value={tele} onChange={(e) => setTele(e.target.value)} />
                </div>

                <div className="mb-4">
                    <CustomFileInput
                        label="Photo"
                        onFileChange={(photo) => setPhoto(photo)}
                        onRemove={removePhoto}
                        file={photo}
                        />
                </div>

                <div className="mb-4">
                    <CustomFileInput
                        label="Photo Cover"
                        onFileChange={(photoCover) => setPhotoCover(photoCover)}
                        onRemove={removePhotoCover}
                        file={photoCover}
                        />
                </div>

                <div className="flex justify-center">
                    <button type="submit" className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded mr-2">Submit</button>
                    <button type="button" onClick={onClose} className="bg-gray-300 hover:bg-gray-400 text-gray-700 font-semibold py-2 px-4 rounded">Cancel</button>
                </div>
                </form>
            </div>
        </div>
    </div>
  )
}

export default PopUpForm