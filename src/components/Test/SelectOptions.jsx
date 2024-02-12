import Cookies from 'js-cookie';
import React, { useEffect, useState } from 'react';
import { AiOutlineDown } from 'react-icons/ai';
import authService from '../../services/authService';

const SelectOptions = ({ headText, Options, role_id }) => {
    const [rolePermitions, setRolePermitions] = useState([]);
    const [dropDown, setDropDown] = useState(false);
    const [permissions, setPermissions] = useState([]);

    useEffect(() => {
        handleListPermition();
    }, []);

    const handleListPermition = async () => {
        try {
            const response = await authService.RolePermitions(role_id);
            const [arrayFavorate] = Object.values(response.data);
            setRolePermitions(arrayFavorate);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    useEffect(() => {
        const selectedPermissions = Options.filter(opt => rolePermitions.some(item => item.id === opt.id));
        const selectedPermissionIds = selectedPermissions.map(obj => obj.id);
        setPermissions(selectedPermissionIds);
    }, [rolePermitions, Options]);

    const handlDropdown = () => {
        setDropDown(!dropDown);
    };

    const handlPermitionsChange = (index) => {
        const newPermissions = permissions.includes(index)
            ? permissions.filter(item => item !== index)
            : [...permissions, index];
        setPermissions(newPermissions);
        console.log(newPermissions);
    };

    const handlePermitionGive = async(e) => {
        e.preventDefault();

        console.log(permissions);
        // Handle giving permissions
        if (dropDown) {
            try {
                const response = await authService.givePrimition(role_id,permissions);
                console.log(response.data.post_success);
                const msg = response.data.post_success;
                Cookies.set('msgPermitionGive',msg)
                } catch (error) {
                console.error('Error creating demand:', error.response.data);
                // handle error response
                }
            }
    };

    return (
        <div className='relative max-w-[300px] w-[300px] space-y-1 border rounded-md ml-3 pl-5 pt-1'>
            <div className=' flex justify-between pr-1' onClick={(e) => { handlDropdown(); handlePermitionGive(e) }}>
                <div>
                    {headText}
                </div>
                <AiOutlineDown className={`w-5 h-4 ms-3 ${dropDown ? 'transform rotate-180 duration-300' : 'duration-300'}`} />
            </div>
            {dropDown &&
                <div style={{ zIndex: 20 }} className='absolute right-0 left-0 text-start pl-5 space-y-2 border rounded-md bg-white max-w-[300px] w-[300px] max-h-[120px] overflow-y-auto overflow-x-hidden'>
                    {Options && Options.map((Opt) => (
                        <div key={Opt.id}>
                            <input defaultChecked={permissions.includes(Opt.id)} onChange={() => handlPermitionsChange(Opt.id)} type="checkbox" /> {Opt.name}
                        </div>
                    ))}
                </div>}
        </div>
    );
};

export default SelectOptions;
