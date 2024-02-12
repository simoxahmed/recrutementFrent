import React, { useState } from 'react'
import { PhotoIcon, UserCircleIcon } from '@heroicons/react/24/solid'
import Cookies from 'js-cookie';


const InfoPersonel = ({onFileChange, onFirstName, onLastName, onEmail,onTele,onCity,onState,onZip,userData,
    onEntreprise,onTeleEntr,onFilePhotoChange, onFilePhotoCoverChange}) => {
        const [addPhoto, setAddPhoto] = useState(false);

        const [firstName, setFirstName] = useState(userData?.np || '');
        const [lastName, setLastName] = useState(userData?.nm || '');
        const [email, setEmail] = useState(userData?.email || '');
        const [tele, setTele] = useState(userData?.employee?.tele || '');
        const [city, setCity] = useState(userData?.employee?.villename || '');
        const [state, setState] = useState(userData?.employee?.state || '');
        const [zip, setZip] = useState(userData?.employee?.zip || '');
        const [entreprise, setEntreprise] = useState(userData?.userEntreprise[0]?.entreprise_id?.nom_entreprise || '');
        const [teleEntreprise, setTeleEntreprise] = useState(userData?.userEntreprise[0]?.entreprise_id?.tele || '');
      
    // const [userData, setUserData] = useState('');
  
//   console.log(userData);

    const handlPhotoProfileChange=(event)=>{
        const selectedPhoto=event.target.files[0];
        // setPhoto(selectedPhoto);
        onFileChange(selectedPhoto)
    }

    const handlPhotoChange=(event)=>{
        const selectedPhoto=event.target.files[0];
        // setPhoto(selectedPhoto);
        onFilePhotoChange(selectedPhoto)
    }

    const handlPhotoCoverChange=(event)=>{
        const selectedPhoto=event.target.files[0];
        // setPhoto(selectedPhoto);
        onFilePhotoCoverChange(selectedPhoto)
    }

    const handleFirstNameChange = (e) => {
        const value=e.target.value;
        setFirstName(value);
        onFirstName(firstName);
    };

    const handleLastNameChange = (e) => {
        const value=e.target.value;
        setLastName(value);
        onLastName(lastName);
    };

    const handleEmailChange = (e) => {
        const value=e.target.value;
        setEmail(value);
        onEmail(email);
    };

    const handleTeleChange = (e) => {
        const value=e.target.value;
        setTele(value);
        onTele(tele);
    };

    const handleTeleEntrepriseChange = (e) => {
        const value=e.target.value;
        setTeleEntreprise(value);
        onTeleEntr(teleEntreprise);
    };


    const handleEntrepriseChange = (e) => {
        const value=e.target.value;
        setEntreprise(value);
        onEntreprise(entreprise);
    };

    // const handleAdressChange = (e) => {
    //     onAdress(value);
    // };

    const handleCityChange = (e) => {
        const value=e.target.value;
        setCity(value);
        onCity(city);
    };

    const handleStateChange = (e) => {
        const value=e.target.value;
        setState(value);
        onState(state);
    };

    const handleZipChange = (e) => {
        const value=e.target.value;
        setZip(value);
        onZip(zip);
        // onZip(e.target.value);
    };


    

    // console.log(Cookies.get('TypeCompte'));

  return (
    <div>
        <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
        {/* ['entreprise','employee'] */}
            {Cookies.get('TypeCompte')=== 'employee'&&<div className="col-span-full mx-auto">
                <div className="text-center block text-sm font-medium leading-6 text-gray-900">
                Photo
                </div>
                <div className=" flex items-center gap-x-3">
                    <label htmlFor="upload" className="block text-sm font-medium leading-6 text-gray-900">
                    <UserCircleIcon className="h-28 w-28 text-gray-300" aria-hidden="true" />
                    </label>
                <input id="upload" type="file" onChange={handlPhotoProfileChange} class="hidden" />
                </div>
            </div>}

            {Cookies.get('TypeCompte')==='entreprise'&&<div className="col-span-full mx-auto">
                <div className="block ml-10 text-sm font-medium leading-6 text-gray-900">
                Photo
                </div>
                <div className="mt-2 flex items-center gap-x-3">
                <div className=" flex items-center  gap-x-3">
                    <label htmlFor="upload" className="block text-sm font-medium leading-6 text-gray-900 hover:cursor-pointer focus:cursor-pointer">
                    <UserCircleIcon className="h-28 w-28 text-gray-300" aria-hidden="true" />
                    </label>
                <input id="upload" type="file" onChange={handlPhotoChange} class="hidden" />
                </div>
                <div
                    className="rounded-md bg-white px-2.5 py-1.5 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 hover:cursor-pointer focus:cursor-pointer"
                    onClick={()=>setAddPhoto(!addPhoto)}
                >
                    Cover
                </div>
                </div>
            </div>}


            {addPhoto && Cookies.get('TypeCompte')==='entreprise'&& <div className="col-span-full">
                <div className="mt-2 flex justify-center rounded-lg border border-dashed border-gray-900/25 px-6 py-10">

                <div class="rounded-md border border-gray-100 bg-white p-4 shadow-md">
                    <label for="upload" class="flex flex-col items-center gap-2 cursor-pointer">
                    
                    <PhotoIcon className="mx-auto h-12 w-12 text-gray-500" aria-hidden="true" />
                    <span class="text-blue-500 font-medium">Upload file</span>
                    </label>
                    <input id="upload" type="file" onChange={handlPhotoCoverChange} class="hidden" />
                </div>

                </div>
            </div>}

            {Cookies.get('TypeCompte')==='entreprise'&& <div className="sm:col-span-full">
                <label htmlFor="entreprise" className="block text-sm font-medium leading-6 text-gray-900">
                Nom Entreprise
                </label>
                <div className="mt-2">
                <input
                    value={entreprise}
                    onChange={handleEntrepriseChange}
                    id="entreprise"
                    type="text"
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
                </div>
            </div>}

            <div className="sm:col-span-3">
                <label htmlFor="first-name" className="block text-sm font-medium leading-6 text-gray-900">
                First name
                </label>
                <div className="mt-2">
                <input
                    value={firstName}
                    onChange={handleFirstNameChange}
                    type="text"
                    id="first-name"
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
                </div>
            </div>

            <div className="sm:col-span-3">
                <label htmlFor="last-name" className="block text-sm font-medium leading-6 text-gray-900">
                Last name
                </label>
                <div className="mt-2">
                <input
                    value={lastName}
                    onChange={handleLastNameChange}
                    type="text"
                    id="last-name"
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
                </div>
            </div>

            <div className="sm:col-span-3">
                <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
                Email address
                </label>
                <div className="mt-2">
                <input
                    value={email}
                    id="email"
                    onChange={handleEmailChange}
                    type="email"
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
                </div>
            </div>
            {Cookies.get('TypeCompte')=== 'employee'&&<>  
                <div className="sm:col-span-3">
                    <label htmlFor="tele" className="block text-sm font-medium leading-6 text-gray-900">
                    Telephone
                    </label>
                    <div className="mt-2">
                    <input
                        value={tele}
                        onChange={handleTeleChange}
                        id="tele"
                        type="tel"
                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                    </div>
                </div>

                <div className="sm:col-span-2 sm:col-start-1">
                    <label htmlFor="city" className="block text-sm font-medium leading-6 text-gray-900">
                    City
                    </label>
                    <div className="mt-2">
                    <input
                        value={city}
                        type="text"
                        onChange={handleCityChange}
                        id="city"
                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                    </div>
                </div>

                <div className="sm:col-span-2">
                    <label htmlFor="region" className="block text-sm font-medium leading-6 text-gray-900">
                    State / Province
                    </label>
                    <div className="mt-2">
                    <input
                        value={state}
                        onChange={handleStateChange}
                        type="text"
                        id="region"
                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                    </div>
                </div>

                <div className="sm:col-span-2">
                    <label htmlFor="postal-code" className="block text-sm font-medium leading-6 text-gray-900">
                    ZIP / Postal code
                    </label>
                    <div className="mt-2">
                    <input
                        value={zip}
                        type="text"
                        onChange={handleZipChange}
                        id="postal-code"
                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                    </div>
                </div>
            </>}

            {Cookies.get('TypeCompte')==='entreprise'&&<>
                <div className="sm:col-span-3">
                    <label htmlFor="tele" className="block text-sm font-medium leading-6 text-gray-900">
                    Telephone
                    </label>
                    <div className="mt-2">
                    <input
                        value={teleEntreprise}
                        onChange={handleTeleEntrepriseChange}
                        id="tele"
                        type="tel"
                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                    </div>
                </div>
            </>}
        </div>
    </div>
  )
}

export default InfoPersonel