import React, { useEffect, useState } from 'react';
import InfoPersonel from './Reglage/InfoPersonel';
import Notification from './Reglage/Notification';
import authService from '../../services/authService';
import PopupS from '../features/Notification/PopupS';
import Cookies from 'js-cookie';
// import InfoPersonel from '../components/dashboardV3/Reglage/InfoPersonel';
// import Notification from '../components/dashboardV3/Reglage/Notification';

const Reglage= () => {
  const [photo, setPhoto] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [tele, setTele] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('');
  const [zip, setZip] = useState('');


  const [msgProfile, setMsgProfile] = useState('');
  const [showPopup, setShowPopup] = useState(false);
  const [userData, setUserData] = useState('');
  //user(entreprise)
  const [entreprise, setEntreprise] = useState('');
  const [teleEntreprise, setTeleEntreprise] = useState('');
  const [photoEntre, setPhotoEntre] = useState('');
  const [photoCover, setPhotoCover] = useState('');

  

  const handleFileChange = (file) => {
    setPhoto(file);
  };

  const handleFirstNameChange = (value) => {
    setFirstName(value);
  };
  
  const handleLastNameChange = (value) => {
    setLastName(value);
  };
  
  const handleEmailChange = (value) => {
    setEmail(value);
  };
  
  const handleTeleChange = (value) => {
    setTele(value);
  };
  
  
  const handleCityChange = (value) => {
    setCity(value);
  };
    
  const handleStateChange = (value) => {
    setState(value);
  };
    
  const handleZipChange = (value) => {
    setZip(value);
  };


  const handleEntrepriseChange = (value) => {
    setEntreprise(value);
  };

  const handleTeleEntrepriseChange = (value) => {
    setTeleEntreprise(value);
  };

  const handlPhotoChange = (file) => {
    setPhotoEntre(file);
  };
  
  const handlPhotoCoverChange = (file) => {
    setPhotoCover(file);
  };




  const fetchDataUser = async () => {
      try {
          const response = await authService.getUser(Cookies.get('entreprise_id'));
          const [data]=response.data;
          setUserData(data);
      } catch (error) {
          console.error('Error fetching data:', error);
      }
  };

  useEffect(() => {
    fetchDataUser();
  },[])
  
  
  const handleSubmit = (e)=>{
    e.preventDefault();
    if (Object.keys(userData).length!==0 && !(userData.np===null || userData.nm===null || userData.email===null || userData.employee.tele===null || userData.employee.villename===null || userData.employee.state===null || userData.employee.zip===null)) {
        if (firstName ==='') {
            setFirstName(userData.np)
            console.log(firstName);
        }
        if (lastName==='') {
            setLastName(userData.nm)
        }
        if (email==='') {
            setEmail(userData.email)
        }

        if (tele==='') {
            setTele(userData.employee.tele)
        }

        if (city==='') {
            setCity(userData.employee.villename)
        }

        if (state==='') {
            setState(userData.employee.state)
        }

        if (zip==='') {
            setZip(userData.employee.zip)
        }
      }

      const updateData = {
        photo,
        photoEntre,
        photoCover,
        firstName: firstName || userData.np,
        lastName: lastName || userData.nm,
        email: email || userData.email,
        tele: tele || userData.employee?.tele,
        city: city || userData.employee?.villename,
        state: state || userData.employee?.state,
        zip: zip || userData.employee?.zip,
        entreprise: entreprise || userData.userEntreprise.entreprise_id?.nom_entreprise,
        teleEntreprise: teleEntreprise || userData.userEntreprise.entreprise_id?.tele,
      };

      if (Cookies.get('TypeCompte')=== 'employee') {
        const profileUpdate = async () => {
          const response = await authService.profileUpdate(
            updateData.lastName,
            updateData.firstName,
            updateData.email,
            updateData.tele,
            updateData.city,
            updateData.state,
            updateData.zip,
            updateData.photo
          );
          console.log(response);
          const msg = response.data.Profile_Complate;
            if (msg !== undefined) {
              setShowPopup(true)
              setMsgProfile(msg)
            }
        };
        profileUpdate(); 
      }

      if (Cookies.get('TypeCompte')==='entreprise'&& userData.userEntreprise.entreprise_id?.id) {
        const profileUpdateEntreprise = async () => {
          const response = await authService.profileUpdateEntreprise(
            updateData.lastName,
            updateData.firstName,
            updateData.email,
            updateData.entreprise,
            updateData.teleEntreprise,
            updateData.photoEntre,
            updateData.photoCover,
            userData.userEntreprise.entreprise_id.id
          );
          console.log(response);
          const msg = response.data.Profile_Update;
            if (msg !== undefined) {
              setShowPopup(true)
              setMsgProfile(msg)
            }
        };
        profileUpdateEntreprise(); 
      }
    
  }

  const handleClosePopup=()=>{
    setShowPopup(false)
  }
  
  
  // console.log(data);



  return (
    <div className="bg-gray-100 w-full ml-auto overflow-y-scroll h-[80vh]">
      <PopupS message={msgProfile} show={showPopup} onClose={handleClosePopup}/>
      <form onSubmit={handleSubmit} >
        <div className="w-full space-y-8 mx-auto">
          <h1 className=' text-4xl font-bold'>Paramètres</h1>
          <div className="  border-b border-gray-900/10 pb-12">
            <h2 className="text-2xl font-semibold leading-7 text-gray-900">Compte</h2>
            <p className="mt-1 text-sm leading-6 text-gray-600">
              This information will be displayed publicly so be careful what you share.
            </p>

          </div>

            <div className=' mx-auto p-5 bg-white rounded-md'>
              {userData && <InfoPersonel
                onFileChange={handleFileChange}
                onFirstName={handleFirstNameChange}
                onLastName={handleLastNameChange}
                onEmail={handleEmailChange}
                onTele={handleTeleChange}
                onCity={handleCityChange}
                onState={handleStateChange}
                onZip={handleZipChange}
                userData={userData}
                onEntreprise={handleEntrepriseChange}
                onTeleEntr={handleTeleEntrepriseChange}
                onFilePhotoChange={handlPhotoChange}
                onFilePhotoCoverChange={handlPhotoCoverChange} />}
            </div>

          <div className="border-b border-gray-900/10 pb-12">
            <h2 className="text-2xl font-semibold leading-7 text-gray-900">Notifications</h2>
            <p className="mt-1 text-sm leading-6 text-gray-600">
            Recevez de nouvelles offres d'emploi dans votre boîte électronique. Sélectionnez tout ou personnalisez les services et les postes pour lesquels vous souhaitez être tenu au courant.
            </p>
            
          </div>

          <div className=' mx-auto w-[95%] bg-white rounded-md'>
            <Notification/>
          </div>


        <div className="mt-6 flex items-center justify-between ">
          <button type="button" className="text-md font-semibold leading-6 py-2 px-6 rounded-md border text-gray-900">
            Cancel
          </button>
          <button
            type="submit"
            className="rounded-md bg-indigo-600 px-6 py-2 text-md font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            Save
          </button>
        </div>

        </div>

        
      </form>
    </div>
  )
};

export default Reglage;