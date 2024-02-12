
import React, { useEffect, useState } from 'react'
// import ImagePost from '../assets/images/LA_MADELEINE_REMY_230819_73.jpg'
import imgIcon from "../assets/icons/icons8-open-24.png";
import imgIconShare from "../assets/icons/icons8-share-48.png";
import { useNavigate } from 'react-router-dom';
import CustomFileInput from './dashboard/fichierProfessionel/CustomDropzone';
import { AiOutlineClose } from 'react-icons/ai';
import PopupS from './features/Notification/PopupS';
import authService from '../services/authService';
import { UrlStorage } from '../Requests';
import { EmptyHeartIcon } from './features/icons/icons';
import Cookies from 'js-cookie';

const ListOfferFiltered = ({clicksPost,userData}) => {
    const [showNotificationb, setShowNotificationb] = useState('');
    const [showNotificationState, setShowNotificationState] = useState('');
    const navigate = useNavigate();

    const [cvFile, setCvFile] = useState('');
    const [motivationFile, setMotivationFile] = useState('');
    const [authorFile, setAuthorFile] = useState('');
    const [checkLetter, setCheckLetter] = useState(false);
    const [showPopup, setShowPopup] = useState(false);
    const [msg, setMsg] = useState('');
    const [favorateIcon, setFavorateIcon] = useState(false);
    const [favorates, setFavorate] = useState([]);
    const [favo, setFavo] = useState();

    // console.log(clicksPost);

    const [letter, setLetter] = useState("a");

    
    const handleLetterChange = (e) => {
        setLetter(e.target.value);
    };

    // console.log(clicksPost);
    const handlePostulation= () => {
        if (Cookies.get('TypeCompte')==='entreprise') {
            setShowNotificationb('openEntreprise');
        }else{
            if (Object.keys(userData).length!==0 && (userData.employee.tele===null || userData.employee.lettre===null || userData.employee.cv===null)&& showNotificationState!== 'read') {
                setShowNotificationb('open1');
                setShowNotificationState('read')
            }else{
                if (Object.keys(userData).length!==0 && (userData.employee.tele!==null && userData.employee.lettre!==null && userData.employee.cv!==null)) {
                    setShowNotificationb('open2');
                }
                setShowNotificationb('open2');
            }
        }
    }

    const handleSubmitEntr = (e) => {
        e.preventDefault();
        // Add your authentication logic here

        const postulationEntre = async () => {
            const publication_id = clicksPost.id;
            const entreprise_id = userData.userEntreprise.entreprise_id.id;
            
          const response = await authService.postulationEntre(entreprise_id,publication_id);
          console.log(response.data.post_success);
          const msg = response.data.post_success;
          if (msg !== undefined) {
            setShowPopup(true)
            setMsg(msg)
          }
          
        };
        postulationEntre();
        setShowNotificationb('')

    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Add your authentication logic here

        const postulation = async () => {
            const publication_id = clicksPost.id;
            const employee_id = userData.employee.id;
            
          const response = await authService.postulation(employee_id,cvFile,motivationFile,letter,authorFile,publication_id);
          console.log(response.data.post_success);
          const msg = response.data.post_success;
          if (msg !== undefined) {
            setShowPopup(true)
            setMsg(msg)
          }
          
        };
        postulation();
        setShowNotificationb('')

    };
    

    const handlClickOui = ()=>{
        navigate('/dashboard');
    }

    

    const removeCvFile = () => {
    setCvFile(null);
    };

    const removeMotivationFile = () => {
    setMotivationFile(null);
    };

    const removeAuthorFile = () => {
    setAuthorFile(null);
    };

    const handleClosePopup = () => {
        
        setShowPopup(false);
        };

    const handlFavorateAdd = async ( id) => {
        // e.preventDefault();
        const response = await authService.FavorateCreate(id,Cookies.get('entreprise_id'));
        console.log(response.data.post_success);
        const msg = response.data.post_success;
          if (msg !== undefined) {
            setShowPopup(true)
            setMsg(msg)
          }

    };


    const handlFavorateDestroy = async ( id) => {
        // e.preventDefault();
        const response = await authService.FavorateDestroy(id);
        console.log(response.data.post_success);
        const msg = response.data.post_success;
          if (msg !== undefined) {
            setShowPopup(true)
            setMsg(msg)

          }

    };


    const handlFavorate =(e, id,idFavo=null)=>{
        e.preventDefault();
        if (favorateIcon) {
            handlFavorateDestroy( idFavo)
        }else{
            handlFavorateAdd( id);
        }
    }

    
    //list Favorate:
    const handleListFavorate= async()=>{
        try {
            const response = await authService.FavorateList(Cookies.get('entreprise_id'));
            // console.log(response.data);
            const [arrayFavorate] = Object.values(response.data);
            setFavorate(arrayFavorate)
            // console.log(favorates);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    }
        handleListFavorate();

    useEffect(() => {
        if (favorates) {
          const matchingFavorites = favorates.filter((favorate) => clicksPost.id === favorate.publication_id.id );
      
          if (matchingFavorites.length > 0) {
            setFavorateIcon(true);
            setFavo(matchingFavorites)
          }else{
            setFavorateIcon(false);
          }
        }
      }, [clicksPost.id, favorates]);



  return (
    <>
        <div>
            <div className='flex flex-col mx-auto'>
                <div className=''>
                    <PopupS message={msg} show={showPopup} onClose={handleClosePopup} />
                </div>
                <div className='relative' >
                    <form 
                    onSubmit={(e) => handlFavorate(e, clicksPost.id,favo?.[0].id)}
                    >
                        <button
                            className="absolute top-4 right-4 hover:cursor-pointer"
                            type="submit"
                        >
                            <EmptyHeartIcon filled={favorateIcon} />
                        </button>
                    </form>
                    <img className=' object-cover w-full ' src={UrlStorage+clicksPost.photopost} alt="" srcset="" />
                </div>
                <div className="flex justify-between m-2 p-2">
                    <div className='text-xs space-y-3'>
                        <h1 className='font-bold text-2xl mb-2'>{clicksPost.metier}</h1>
                        <span className='font-medium'>{clicksPost.ville}</span>
                        <div className="flex justify-start space-x-2">
                            <svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 -960 960 960" width="24"><path d="M480.261-495.5q24.239 0 41.489-17.261 17.25-17.261 17.25-41.5t-17.365-41.489Q504.27-613 479.885-613T438.5-595.635q-17 17.365-17 41.75t17.261 41.385q17.261 17 41.5 17Zm-.261 325q108.771-94.069 175.635-197.785Q722.5-472 722.5-546.5q0-109-68.573-180.5-68.574-71.5-174-71.5Q374.5-798.5 306-727q-68.5 71.5-68.5 180.5 0 74.5 66.865 178.215Q371.229-264.569 480-170.5Zm0 34.5Q347-256.5 279.5-359.75T212-546.313q0-117.47 77-197.078Q366-823 480-823t191 79.609q77 79.608 77 197.078Q748-463 680.5-359.75 613-256.5 480-136Zm0-418Z"/></svg>{clicksPost.ville}
                            <svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 -960 960 960" width="24"><path d="M242.5-137q-27.542 0-46.521-18.625T177-202v-108.5h115V-823h491v621q0 27.75-18.979 46.375T717.5-137h-475Zm475-25.5q17 0 28.5-11.356 11.5-11.357 11.5-28.144v-595.5h-440v487H678v108.562q0 16.513 11.356 27.976Q700.712-162.5 717.5-162.5ZM380-637v-25.5h315v25.5H380Zm0 108v-25.5h315v25.5H380ZM242.7-162.5h409.8V-285h-450v83q0 16.787 11.557 28.144Q225.615-162.5 242.7-162.5Zm-.18 0H202.5h450-409.98Z"/></svg>{clicksPost.contrat}
                        </div>
                        <div className="flex justify-start space-x-2">
                            <span>Il y a 4 jours</span>
                            <span>Soyez parmi les premiers à postuler</span>
                        </div>
                    </div>
                    <div className="flex items-end">
                        <button type="button">
                            <img className='w-8 h-8 m-1' src={imgIconShare} alt="" srcset="" />
                        </button>
                        <button type="button" onClick={()=>handlePostulation()} className='flex text-white bg-green-600 py-2 px-6 rounded-sm font-medium'>Postuler <img className='w-6 h-6 mx-1' src={imgIcon} alt="" /></button>
                    </div>
                </div>
                
                <div className="flex flex-col m-2 p-2">
                    <h1 className="text-2xl font-medium text-[#00263ad6]">Description du poste</h1>
                    <div className="flex justify-start">
                    <p>
                        {clicksPost.description}
                    </p>
                    </div>
                </div>
            </div>
        </div>
        
        <div >
           {showNotificationb === 'open1' ? (

                <div style={{ zIndex: 100 }} className='absolute bg-[#2a2a2a69]  top-0 right-0 w-full h-full'>
                    <div className="fixed top-1/4 right-1/4 bg-white border border-gray-300 text-gray-800 px-6 py-4 rounded-lg shadow-lg">
                        {/* <p className="text-lg font-semibold mb-2">Merci d'avoir créé votre compte !</p> */}
                        <p className="text-sm mb-4">Votre compte n'est pas complet. Voulez-vous compléter votre profil maintenant ?</p>


                        <div className="flex justify-between">
                            <button
                                className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded focus:outline-none"
                                onClick={() => {setShowNotificationb('');handlClickOui();}}
                            >
                                Oui
                            </button>

                            <button
                                className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded focus:outline-none"
                                onClick={() => setShowNotificationb('open2')}
                            >
                                Non
                            </button>
                        </div>
                    </div>
                </div>

           ):<></>} 

           {showNotificationb === 'open2' ? (
            <>
                <div style={{ zIndex: 100 }} className='absolute bg-[#2a2a2a69]  top-0 right-0 w-full h-full'>
                    <div className="fixed top-[50px] right-1/4 bg-white border border-gray-300 text-gray-800 px-3 py-2 rounded-lg shadow-lg">
                        <div className="flex items-center justify-end">
                            <AiOutlineClose className="cursor-pointer text-2xl" onClick={() =>setShowNotificationb('') } />
                        </div>

                        <div className="flex flex-col items-center justify-center h-[80vh] w-[40vw] bg-gray-100">
                            <form className="bg-white h-full p-10 w-full rounded shadow-md" onSubmit={handleSubmit} >
                                <h1 className="text-3xl font-bold mb-6">File Upload Form</h1>

                                <CustomFileInput
                                label="CV"
                                onFileChange={(file) => setCvFile(file)}
                                onRemove={removeCvFile}
                                file={cvFile}
                                // handleFileChange={handleFileCvChange}
                                />

                                {!checkLetter ?(<CustomFileInput
                                label="Letter of Motivation"
                                onFileChange={(file) => setMotivationFile(file)}
                                onRemove={removeMotivationFile}
                                file={motivationFile}
                                />):(
                                    <>
                                        
                                        <label for="message" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Letter of Motivation</label>
                                        <textarea id="message" onChange={handleLetterChange} rows="4" class="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Write your thoughts here..."></textarea>

                                    </>
                                )}
                                <div class=" my-4 flex items-center">
                                    <input onChange={()=>setCheckLetter(!checkLetter)}  id="checked-checkbox" type="checkbox" value="" class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"/>
                                    <label for="checked-checkbox" class="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">Créer une lettre de motivation</label>
                                </div>
                                <CustomFileInput
                                label="Author File"
                                onFileChange={(file) => setAuthorFile(file)}
                                onRemove={removeAuthorFile}
                                file={authorFile}
                                
                                />

                                <div className="flex justify-center space-x-4 mt-6 ">
                                <button
                                    type="submit"
                                    className="bg-blue-500 text-white px-6 py-2 rounded hover:bg-blue-600 focus:outline-none focus:shadow-outline-blue"
                                >
                                    Add
                                </button>
                                
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </>
           ) : <></>
           }

           {showNotificationb === 'openEntreprise' ? (
                <form onSubmit={handleSubmitEntr} className={`fixed top-0 left-0 right-0 bottom-0 bg-black bg-opacity-50 flex justify-center items-center `}>
                    <div className="bg-white p-4 rounded-lg shadow-lg">
                        <h2 className="text-lg font-semibold mb-2">Confirmation</h2>
                        <p className="text-sm text-gray-700 mb-4">Vous êtes sûr de vouloir postuler.</p>
                        <div className="mt-4 flex justify-center space-x-2">
                            <button type="submit" className='bg-green-500 hover:bg-green-700 text-white px-4 py-2 rounded'>
                            Oui
                            </button>
                            <button
                            onClick={() =>setShowNotificationb('') }
                            className="bg-red-500 hover:bg-red-700 text-white px-4 py-2 rounded"
                            >
                            Nom
                            </button>
                        </div>
                    </div>
                </form>
             ) : <></>
           }
            
        </div>
    </>
  )
}

export default ListOfferFiltered