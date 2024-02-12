import React, { useEffect, useState } from 'react';
import authService from '../../../services/authService';
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom';
import { UrlStorage } from '../../../Requests';
import PopUpUserAdd from './popUpUserAdd';

const ListEntre = () => {
    const [entreprises, setEntreprise] = useState([]);
    const navigate = useNavigate();

    const handleListFavorate = async () => {
        try {
            const response = await authService.getUser();
            const [arrayFavorate] = Object.values(response.data);
            // Filter enterprises where state_user is 'user'
            const filteredEntreprises = arrayFavorate.userEntreprise.filter(entreprise => entreprise.state_user === 'user'||entreprise.roles.length>0 );
            setEntreprise(filteredEntreprises);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    useEffect(() => {
        handleListFavorate();
    }, []);

    const HandlSelect = (index) => {
        Cookies.set('entreprise_id', index);
        navigate('/dashboard');
        // Cookies.set('activeCategory', 'reglage')
        window.location.reload();
    };

    return (
        <div>
            <table className="min-w-[70%] mx-auto ">
                <thead className="bg-gray-800 sticky top-0 left-0 right-0 text-white">
                    <tr>
                        <th className="py-2 px-4">Photo</th>
                        <th className="py-2 px-4">Nom Entreprise</th>
                        <th className="py-2 px-4">Action</th>
                    </tr>
                </thead>

                <tbody className="bg-gray-300 text-center">
                    {entreprises && entreprises.map((entreprise) => (

                        <tr key={entreprise.entreprise_id.id} className="hover:bg-gray-200 "
                            onClick={() => HandlSelect(entreprise.entreprise_id.id)}
                        >
                            <td className="py-2 px-4 "><img className='mx-auto object-cover w-36 rounded-md' src={UrlStorage + entreprise.entreprise_id.photo} alt="" srcset="" /></td>
                            <td className="py-2 px-4">{entreprise.entreprise_id.nom_entreprise}</td>
                            <td className="py-2 px-4">
                                <button
                                    className="border rounded-md py-1 px-2 text-white bg-blue-500 hover:bg-blue-700"
                                    onClick={() => HandlSelect(entreprise.entreprise_id.id)}
                                >
                                    Selecte
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}

export default ListEntre;
