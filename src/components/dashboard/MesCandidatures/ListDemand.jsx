import React, { useEffect, useState } from 'react'
import CreateDemand from './CreateDemand';
import {FaTimes} from 'react-icons/fa';
import { UrlStorage } from '../../../Requests';
import authService from '../../../services/authService';
import ListOfferFiltered from '../../ListOfferFiltered';
import UpdateDemand from './UpdateDemand';
import Cookies from 'js-cookie';
import PublishDemand from './PublishDemand';

const ListDemand = () => {
    const [addFormShow, setAddFormShow] = useState(false);
  const [listDemands, setListDemand] = useState([]);
  const [demandData, setDemandData] = useState({});
  const [infoDemand, setInfoDemand] = useState({});
  const [demandState, setDemandState] = useState(false);
  const [updateFormShow, setUpdateFormShow] = useState(false);
  const [popUpPublish, setPopUpPublish] = useState(false);

  const handlAddPublication=()=>{
    setAddFormShow(!addFormShow);
  }

  useEffect(() => {
    const fetchDataList = async () => {
      try {
        let response = ''
        if (Cookies.get('TypeCompte')==='entreprise') {
          response = await authService.listDemand(Cookies.get('entreprise_id'));
        } else {
          response = await authService.listDemand();
        }
        const list = Object.values(response.data);
        // console.log(list);
        setListDemand(list);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchDataList();
  }, [listDemands]); // Empty dependency array to run only once on component mount

  const ShowInfoDemand=()=>{
    setDemandState(!demandState)
  }

  const HandlInfoDemand=(demand)=>{
    setInfoDemand(demand);
    ShowInfoDemand()
  }

  const HandlDemandDelete= async(id='')=>{
    try {
      const response = await authService.Demanddestroy(id);
      const msg = response;
    //   console.log(msg);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  }

  const HandlUpdateShow=()=>{
    setUpdateFormShow(!updateFormShow)
  }

  const HandlUpdateDemand= (demand)=>{
    setDemandData(demand)
    HandlUpdateShow()
  }
  
  const handlPublish=()=>{
    setPopUpPublish(true)
  }

  return (
    <div>
        <div className='overflow-y-scroll relative max-h-[70vh]'>
            {addFormShow && <div >
                <div className="absolute p-2 top-5 right-8 border border-gray-400 rounded-full w-9 h-9 text-white bg-red-500" onClick={handlAddPublication} >
                <FaTimes className='w-5 h-5'/>
                </div>
                <CreateDemand />
            </div>}

            {updateFormShow && <div >
                <div className="absolute p-2 top-5 right-8 border border-gray-400 rounded-full w-9 h-9 text-white bg-red-500" onClick={HandlUpdateShow} >
                <FaTimes className='w-5 h-5'/>
                </div>
                <UpdateDemand demandData={demandData} />
            </div>}
            
            {!addFormShow && !updateFormShow && !demandState && <div >
                <table className="min-w-full">
                    <thead className="bg-gray-800 sticky top-0 left-0 right-0 text-white">
                        <tr>
                        <th className="py-2 px-4">Photo</th>
                        <th className="py-2 px-4">N°Post</th>
                        <th className="py-2 px-4">Titre</th>
                        <th className="py-2 px-4">Location</th>
                        <th className="py-2 px-4">Metier</th>
                        <th className="py-2 px-4">Type</th>
                        <th className="py-2 px-4">Action</th>
                        </tr>
                    </thead>
                    
                    <tbody className="bg-gray-300 text-center">
                        { listDemands && listDemands.map((demand) => (
                        
                        <tr key={demand.id} className="hover:bg-gray-200">
                            <td onClick={()=>{HandlInfoDemand(demand)}} className="py-2 px-4"><img className='object-cover w-36 rounded-md' src={UrlStorage+demand.photopost} alt="" srcset="" /></td>
                            <td onClick={()=>{HandlInfoDemand(demand)}} className="py-2 px-4">{demand.id}</td>
                            <td onClick={()=>{HandlInfoDemand(demand)}} className="py-2 px-4">{demand.titre}</td>
                            <td onClick={()=>{HandlInfoDemand(demand)}} className="py-2 px-4">{demand.ville_id.name_ville}</td>
                            <td onClick={()=>{HandlInfoDemand(demand)}} className="py-2 px-4">{demand.domain_id.metier}</td>
                            <td onClick={()=>{HandlInfoDemand(demand)}} className="py-2 px-4">{demand.type}</td>
                            <td className="py-2 px-4">
                                
                                <button
                                    className="border rounded-md py-1 px-2 text-white bg-blue-500 hover:bg-blue-700"
                                    onClick={() => HandlInfoDemand(demand)}
                                >
                                    Info
                                </button>
                                <button
                                    className="border rounded-md py-1 px-2 text-white bg-yellow-500 hover:bg-yellow-700"
                                    onClick={()=>HandlUpdateDemand(demand)}
                                >
                                    Modify
                                </button>
                                <button
                                    className="border rounded-md py-1 px-2 text-white bg-red-500 hover:bg-red-700"
                                    onClick={() =>HandlDemandDelete(demand.id)}
                                >
                                    Delete
                                </button>

                                <button
                                    className="border rounded-md py-1 px-2 text-white bg-green-500 hover:bg-red-700"
                                    onClick={() =>handlPublish(demand.id)}
                                >
                                    Publish
                                </button>
                            </td>
                        </tr>
                        ))}
                    </tbody>
                </table>
            </div>}

            {demandState && <>
                <div className='sticky top-0 bg-white w-full  h-[50px]'>
                    <div className='border-[1px] p-1 m-2 border-black hover:bg-slate-500 rounded-full max-w-10' onClick={ShowInfoDemand}>
                        <svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 -960 960 960" width="24"><path d="m313-440 224 224-57 56-320-320 320-320 57 56-224 224h487v80H313Z"/></svg>
                    </div>
                </div>
                <div className='mx-auto'>
                    <ListOfferFiltered clicksPost={infoDemand} />
                </div>
                
            </>}

        </div>

        {/* <>PopUp for publish with list of pricing</> */}

        {popUpPublish&&<PublishDemand publication_id={Cookies.get('entreprise_id')}/>}

        {!addFormShow && !updateFormShow && !demandState && <button
        className="fixed bottom-7 right-4 bg-blue-500 hover:bg-blue-700 text-white p-4 rounded-full shadow-md"
        onClick={handlAddPublication}>
            <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                className="h-7 w-7"
            >
                <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                />
            </svg> 
        </button>}
    </div>
  )
}

export default ListDemand