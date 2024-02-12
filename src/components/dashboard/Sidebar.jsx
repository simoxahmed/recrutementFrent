import Cookies from 'js-cookie';
import React, { useState } from 'react';
import { AiOutlineDown } from 'react-icons/ai';

const Sidebar = ({ switchCategory, userData }) => {
  const [activeItem, setActiveItem] = useState(null);
  const [dropDown, setDropDown] = useState('');

  const handleClickChange = (index) => {
    setActiveItem(index);
    switchCategory(index);
  };

  const handleItemClick = (index) => {
    setActiveItem(index);
  };

  const handleDropDown = (index) => {
    if (dropDown === index) {
      setDropDown('');
    } else {
      setDropDown(index);
    }
  };

  const menuItems = [
    { id: 'reglage', text: 'Réglages', sub: [] },
    Cookies.get('TypeCompte') === 'employee'
      ? { id: 'fichierProfessionnel', text: 'Fichier Professionnel', sub: [] }
      : null,
      (userData.userEntreprise && userData.userEntreprise.length>0 && Cookies.get('entreprise_id')!=='*')?
    {
      id: 'mesCandidatures',
      text: 'Mes Candidatures',
      sub: [
        { id: 'listmespostuler', text: 'List Mes Postulers' },
        { id: 'mesdemandes', text: 'Mes Demandes' }, 
        { id: 'mesfavorites', text: 'Mes Favorites' },
        (Cookies.get('TypeCompte') === 'entreprise' && Cookies.get('entreprise_id') !== undefined && Cookies.get('entreprise_id') !== '*')
          ? { id: 'mesmessages', text: 'Mes Messages' }
          : (Cookies.get('TypeCompte') === 'employee')
          ? { id: 'mesmessages', text: 'Mes Messages' }
          : null,
      ]
    }:
    (Cookies.get('TypeCompte') === 'employee')?
    {
      id: 'mesCandidatures',
      text: 'Mes Candidatures',
      sub: [
        { id: 'listmespostuler', text: 'List Mes Postulers' },
        { id: 'mesdemandes', text: 'Mes Demandes' }, 
        { id: 'mesfavorites', text: 'Mes Favorites' },
        (Cookies.get('TypeCompte') === 'entreprise' && Cookies.get('entreprise_id') !== undefined && Cookies.get('entreprise_id') !== '*')
          ? { id: 'mesmessages', text: 'Mes Messages' }
          : (Cookies.get('TypeCompte') === 'employee')
          ? { id: 'mesmessages', text: 'Mes Messages' }
          : null,
      ]
    }:null,
    
    Cookies.get('TypeCompte') === 'entreprise'
      ? {
          id: 'gestionEntreprise',
          text: 'Gestion D\'Entreprise',
          sub: [
            { id: 'package', text: 'Package' },
            { id: 'listEntre', text: 'List D\'Entreprise' },
            { id: 'ListUserEntre', text: 'List d\'utilisateurs' },
            { id: 'auth', text: 'Autorisation' },
          ]
        }
      : null,
      (userData.userEntreprise && userData.userEntreprise.length>0)?
    { id: 'notification', text: 'Notification', sub: [] }
    : null,
  ].filter((item) => item !== null);
  
  // console.log(userData);

  return (
    <div className="bg-gray-800 p-4 md:w-1/4">
      <h1 className="text-2xl text-center font-semibold mb-4 text-white">User Control Panel</h1>
      <ul>
        {menuItems.map((item) => (
          <React.Fragment key={item.id}>
            <li
              onClick={() => {
                handleItemClick(item.text);
                switchCategory(item.id);
                handleDropDown(item.id);
              }}
              className={`flex justify-between cursor-pointer m-3 border-b-2 border-gray-400 p-2 pl-2 font-medium text-[18px] text-gray-400 hover:text-white ${activeItem === item.text ? 'active' : ''}`}
            >
              <span>{item.text}</span>
              {item.sub.length > 0 && <AiOutlineDown />}
            </li>
            {dropDown === item.id && (
              <ul>
                {item.sub.map((sub) => (
                  <li
                    key={sub.id}
                    onClick={() => {
                      handleItemClick(sub.text);
                      switchCategory(sub.id);
                    }}
                    className={`flex justify-between cursor-pointer m-3 p-2 pl-5 font-medium text-[14px] text-gray-400 hover:text-white ${activeItem === sub.text ? 'active' : ''}`}
                  >
                    <span>{sub.text}</span>
                  </li>
                ))}
              </ul>
            )}
          </React.Fragment>
        ))}
      </ul>
      <div className='relative'>
        <span className='fixed bottom-10 left-5 px-2 py-2 rounded-md font-medium text-white bg-red-500 hover:bg-red-700' 
          onClick={() => handleClickChange('ChangeToEntreprise')}
        >
          Create Entreprise
        </span>
      </div>
    </div>
  );
};

export default Sidebar;
