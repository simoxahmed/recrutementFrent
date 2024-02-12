import React, { useState, useEffect } from 'react';
import authService from '../../../services/authService';
import { UrlStorage } from '../../../Requests';
import Cookies from 'js-cookie';

const ListFavorate = () => {
    const [favorates, setFavorate] = useState([]);

    useEffect(() => {
        const handleListFavorate = async () => {
            try {
                const response = await authService.FavorateList(Cookies.get('entreprise_id'));
                console.log(response.data);
                const [arrayFavorate] = Object.values(response.data);
                setFavorate(arrayFavorate);
                console.log(favorates);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        handleListFavorate();
    }, []); // Empty dependency array to run only once on component mount

    return (
        <div>
            <table className="min-w-full">
                <thead className="bg-gray-800 sticky top-0 left-0 right-0 text-white">
                    <tr>
                        <th className="py-2 px-4">Photo</th>
                        <th className="py-2 px-4">N°Post</th>
                        <th className="py-2 px-4">Titre</th>
                        <th className="py-2 px-4">Location</th>
                        <th className="py-2 px-4">Metier</th>
                        <th className="py-2 px-4">Type</th>
                    </tr>
                </thead>

                <tbody className="bg-gray-300 text-center">
                    {favorates &&
                        favorates.map((favorate) => (
                            <tr
                                key={favorate.id}
                                className="hover:bg-gray-200"
                            >
                                <td className="py-2 px-4">
                                    <img
                                        className="object-cover w-36 rounded-md"
                                        src={UrlStorage + favorate.publication_id.photopost}
                                        alt=""
                                        srcset=""
                                    />
                                </td>
                                <td className="py-2 px-4">
                                    {favorate.publication_id.id}
                                </td>
                                <td className="py-2 px-4">
                                    {favorate.publication_id.titre}
                                </td>
                                <td className="py-2 px-4">
                                    {favorate.ville.name_ville}
                                </td>
                                <td className="py-2 px-4">
                                    {favorate.domain.metier}
                                </td>
                                <td className="py-2 px-4">
                                    {favorate.publication_id.type}
                                </td>
                            </tr>
                        ))}
                </tbody>
            </table>
        </div>
    );
};

export default ListFavorate;
