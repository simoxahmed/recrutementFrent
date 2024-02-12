// ProfileDropup.js
import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faCog, faSignOutAlt } from '@fortawesome/free-solid-svg-icons';
import ProfilIcon from '../../assets/icons/ProfileIcon.jpeg';
// import ProfilIcon2 from '../../assets/storage/Profile/ProfileIcon.jpeg';
import { useNavigate } from 'react-router-dom';
import Switch from './Switch';
// import {URLprofile} from '../../../../app-v2.10/public/storage/Profile/ProfileIcon.jpeg';



const ProfileDropup = ({handleLogoutClick,imgProfile}) => {
  const [dropupOpen, setDropupOpen] = useState(false);
  const navigate = useNavigate();
    
    let imgPro=null
  if (Object.keys(imgProfile.img).length > 1) {
     imgPro='http://127.0.0.1:8000/storage/'+imgProfile.img.employee?.photo;
    //  console.log(imgPro);
  }

  // console.log();
  

  const toggleDropup = () => {
    setDropupOpen(!dropupOpen);
  };

  const handleSettingsClick = () => {
    navigate('/dashboard')
  };

  return (
    <div className="relative inline-block text-left">
      <div>
        <button
          type="button"
          className="inline-flex items-center justify-center p-2 text-gray-400 hover:text-gray-600 focus:outline-none focus:border-blue-300 focus:shadow-outline-blue active:text-gray-800"
          onClick={toggleDropup}
        >

          <div >
            {imgPro && <img src={imgPro} alt="" srcset="" className=' w-[35px] h-[35px] rounded-full border-[2px]  border-black'/> 
             }
          </div>

        </button>
      </div>

      {dropupOpen && (
        <div style={{ zIndex: 30 }} className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
          <div className="py-1">
            <button
              onClick={handleSettingsClick}
              className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left"
            >
              <FontAwesomeIcon icon={faCog} className="mr-2" />
              Reglage
            </button>
            {imgProfile.img&&imgProfile.img.userEntreprise.length>0&&
              <Switch />
            }
            <form onSubmit={handleLogoutClick}>
                <button className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left" type="submit">
                <FontAwesomeIcon icon={faSignOutAlt} className="mr-2" />
                Logout
                </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProfileDropup;
