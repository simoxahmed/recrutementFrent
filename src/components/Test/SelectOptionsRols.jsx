import Cookies from 'js-cookie';
import React, { useEffect, useState } from 'react';
import { AiOutlineDown } from 'react-icons/ai';
import authService from '../../services/authService';

const SelectOptionsRols = ({ headText, Options, user_id }) => {
    const [roleUser, setRoleUser] = useState([]);
    const [dropDown, setDropDown] = useState(false);
    const [roles, setRoles] = useState([]);

    useEffect(() => {
        handleListRoles();
    }, []);

    const handleListRoles = async () => {
        try {
            const response = await authService.UserRoles(user_id);
            const [userRoles] = Object.values(response.data);
            setRoleUser(userRoles);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    useEffect(() => {
        const selectedRoles = Options.filter(opt => roleUser.some(item => item.id === opt.id));
        console.log(selectedRoles,roleUser,user_id);
        const selectedRoleIds = selectedRoles.map(role => role.id);
        setRoles(selectedRoleIds);
    }, [roleUser, Options]);

    const handlDropdown = () => {
        setDropDown(!dropDown);
    };

    const handlRolesChange = (index) => {
        const newRoles = roles.includes(index)
            ? roles.filter(item => item !== index)
            : [...roles, index];
        setRoles(newRoles);
        console.log(newRoles);
    };

    const handlRoleUserChange= async(e)=>{
        e.preventDefault();
        try {
            const response = await authService.giveRoles(user_id,roles);
            console.log(response.data.post_success);
            const msg = response.data.post_success;
            Cookies.set('msgPermitionGive',msg)
            // console.log(Cookies.get('msgPermitionGive'));
          } catch (error) {
            console.error('Error creating demand:', error.response.data);
            // handle error response
          }
    }
    return (
        <div className='relative max-w-[300px] w-[300px] space-y-1 border rounded-md ml-3 pl-5 pt-1'>
            <div className='flex justify-between pr-1' onClick={(e) => { handlDropdown(); handlRoleUserChange(e) }}>
                <div>
                    {headText}
                </div>
                <AiOutlineDown className={`w-5 h-4 ms-3 ${dropDown ? 'transform rotate-180 duration-300' : 'duration-300'}`} />
            </div>
            {dropDown &&
                <div style={{ zIndex: 20 }} className='absolute right-0 left-0 text-start pl-5 space-y-2 border rounded-md bg-white max-w-[300px] w-[300px] max-h-[120px] overflow-y-auto overflow-x-hidden'>
                    {Options && Options.map((Opt) => (
                        <div key={Opt.id}>
                            <input defaultChecked={roles.includes(Opt.id)} onChange={() => handlRolesChange(Opt.id)} type="checkbox" /> {Opt.name}
                        </div>
                    ))}
                </div>}
        </div>
    );
};

export default SelectOptionsRols;
