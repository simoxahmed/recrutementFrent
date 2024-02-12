import React, { useEffect, useState } from 'react'
import SelectOptions from '../../Test/SelectOptions';
import authService from '../../../services/authService';
import PopUpRoleCreate from './popUpRoleCreate';

const Authorisation = () => {
    const [roles, setRoles] = useState([]);
    const [permitions, setPermitions] = useState([]);
    const [popUpRolesShow, setPopUpRolesShow] = useState(false);


    const handlelistPrimition= async()=>{
        try {
            const response = await authService.listPrimition();
            // console.log(response.data);
            const [arrayPermitions] = Object.values(response.data);
            setPermitions(arrayPermitions)
            
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    }

    const handlelistRoles= async()=>{
        try {
            const response = await authService.listRoles();
            // console.log(response.data);
            const [arrayRoles] = Object.values(response.data);
            setRoles(arrayRoles)
            
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    }

    

    useEffect(() => {
        handlelistPrimition()
    }, [])

    useEffect(() => {
        handlelistRoles()
    }, [roles])

    
    const handlAddRoles= ()=>{
        setPopUpRolesShow(true)
    }

    const handlPopUpClose= ()=>{
        setPopUpRolesShow(false)
    }

  return (
    <div className='max-w-[90%] mx-auto'>
        <PopUpRoleCreate isOpen={popUpRolesShow} onClose={handlPopUpClose}/>

        <div>
            <div className="flex items-center justify-between mx-5 mb-3">
                <div className="search">
                    <label for="default-search" class="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white">Search</label>
                    <div class="relative">
                        
                        <input type="search" id="default-search" class="  w-[300px] p-3 ps-5 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Search" required />
                        <button  class="text-white absolute end-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-2 py-1.5 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                            <svg class="w-4 h-4 text-white  dark:text-gray-100" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"/>
                            </svg>
                        </button>
                    </div>
                </div>
                    <button onClick={handlAddRoles} class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1.5 px-3  rounded">
                        Nouveau
                    </button>
            </div>
        </div>
        <table class="w-full  text-sm rtl:text-right text-gray-500 dark:text-gray-400">
            <thead class="text-xs text-center text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                <tr>
                    <th scope="col" class="px-6 py-3">
                        Role name
                    </th>
                    <th scope="col" class="px-6 py-3">
                        Description
                    </th>
                    <th scope="col" class="px-6 py-3">
                        Action
                    </th>
                </tr>
            </thead>
            <tbody >
                {roles&& roles.map((role)=>(
                <tr key={role.id} class="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                    <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                        {role.name}
                    </th>
                    <td class="px-6 py-4">
                        {role.description}
                    </td>
                    
                    <td class="px-6 py-4">
                        <SelectOptions headText="Choise Permitions" Options={permitions} role_id={role.id}/>
                    </td>
                </tr>))}
            </tbody>
        </table>
    </div>
  )
}

export default Authorisation