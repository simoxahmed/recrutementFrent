import React, { useEffect, useState } from 'react'
import authService from '../../../services/authService';
import Cookies from 'js-cookie';
import PopUpUserAdd from './popUpUserAdd';
import SelectOptions from '../../Test/SelectOptions';
import SelectOptionsRols from '../../Test/SelectOptionsRols';

const ListUserEntre = () => {
    const [userEntre, setUserEntre] = useState([]);
    const [popUpUserShow, setPopUpUserShow] = useState(false);
    const [popUpNotifi, setPopUpNotifi] = useState('');
    const [roles, setRoles] = useState([]);

    const handlelistRoles= async()=>{
        try {
            const response = await authService.listRoles();
            console.log(response.data);
            const [arrayRoles] = Object.values(response.data);
            setRoles(arrayRoles)
            
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    }

    useEffect(() => {
        handlelistRoles()
    }, [])
    

    //ListUserEntre fun()
    console.log(Cookies.get('entreprise_id'));
    

    const handleListUser= async()=>{
        try {
            const response = await authService.ListUserEntre(Cookies.get('entreprise_id'));
            if (response.data.post_error) {
            const msg = response.data.post_error;
                setPopUpNotifi(msg)
            }else{
                const [arrayFavorate] = Object.values(response.data);
                setUserEntre(arrayFavorate)
            }
            console.log(userEntre);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    }

    useEffect(() => {
        handleListUser()
    }, [popUpNotifi])

    const handlAddUsers= ()=>{
        setPopUpUserShow(true)
    }

    const handlPopUpClose= ()=>{
        setPopUpUserShow(false)
    }
    
  return (
    <div>
        <div className='max-w-[80%] mx-auto'>
            <PopUpUserAdd isOpen={popUpUserShow} onClose={handlPopUpClose}/>
            
            <div className='flex justify-between mx-4 mb-3'>
                <div className="search">
                    <label for="default-search" class="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white">Search</label>
                    <div class="relative">
                        
                        <input type="search" id="default-search" class=" w-[300px] p-3 ps-5 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Search" required />
                        <button  class="text-white absolute end-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-2 py-1.5 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                            <svg class="w-4 h-4 text-white  dark:text-gray-100" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"/>
                            </svg>
                        </button>
                    </div>
                </div>
                <button
                className=" bg-blue-500 hover:bg-blue-700 text-white py-1.5 px-3 rounded-md shadow-md"
                onClick={handlAddUsers}
                >
                    inviter 
                </button>
            </div>
            <table className='w-full' >
                <thead className="bg-gray-800 sticky top-0 left-0 right-0 text-center text-white">
                    <tr>
                    {/* <th className="py-2 px-4">Photo</th> */}
                    <th className="py-2 px-4">Nom Entreprise</th>
                    <th className="py-2 px-4">Nom User</th>
                    <th className="py-2 px-4">Email</th>
                    <th className="py-2 px-4">Action</th>
                    </tr>
                </thead>
                
                <tbody className="bg-gray-300 ">
                    { userEntre && userEntre.map((user) => (
                    
                    <tr key={user.id} className="hover:bg-gray-200 " 
                        // onClick={() => HandlSelect(entreprise.entreprise_id.id)}
                    >
                        {/* <td className="py-2 px-4 "><img className='mx-auto object-cover w-36 rounded-md' src={UrlStorage+entreprise.entreprise_id.photo} alt="" srcset="" /></td> */}
                        <td className="py-2 px-4">{user.entreprise_id.nom_entreprise}</td>
                        <td className="py-2 px-4">{user.user_id.nm+' '+user.user_id.nm}</td>
                        <td className="py-2 px-4">{user.user_id.email}</td>
                        <td className="py-2 px-4">
                            <SelectOptionsRols headText="Choise Permitions" Options={roles} user_id={user.id}/>
                        </td>
                    </tr>
                    ))}
                </tbody>
            </table>
        </div>
    </div>
    
  )
}

export default ListUserEntre