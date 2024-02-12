import React, { useState, useEffect } from 'react';
import authService from '../../../services/authService';
import { UrlStorage } from "../../../Requests";
import ListOfferFiltered from '../../ListOfferFiltered';
import Cookies from 'js-cookie';

const OfferCand = () => {
  const [lists, setList]=useState([])  
  const [showPost, setShowPost]=useState(false)  
  const [listInfo, setListInfo]=useState({})  

  useEffect(() => {
    const fetchDataList = async (entreprise_id=Cookies.get('entreprise_id')) => {
      try {
        // console.log(Cookies.get('entreprise_id'));
        let response = {data: Array(0)}
        if (Cookies.get('TypeCompte')==='entreprise') {
           response = await authService.listPostulationEntre(entreprise_id); 
        }else{
           response = await authService.listPostulation();
        }
        // console.log(response);
        const listPostuler = Object.values(response.data);
        // console.log(listPostuler);
        setList(listPostuler);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    }; 
    fetchDataList(); 
  }, []); // Empty dependency array to run only once on component mount

  const infoPostulation=() =>{
    setShowPost(!showPost)
  }

  const handlListInfo=(list) =>{
    setListInfo(list)
  }
// console.log(listInfo)

  return (
    <div className=" border rounded-t-lg overflow-y-scroll max-h-[70vh]">
      {!showPost && <div >
        <table className="min-w-full">
          <thead className="bg-gray-800 sticky top-0 left-0 right-0 text-white">
            <tr>
              <th className="py-2 px-4">Photo</th>
              <th className="py-2 px-4">N°Post</th>
              <th className="py-2 px-4">Titre</th>
              <th className="py-2 px-4">Location</th>
              <th className="py-2 px-4">Metier</th>
              <th className="py-2 px-4">Type</th>
            </tr>
          </thead>
          <tbody className="bg-gray-300 text-center">
            { lists && lists.map((list) => (
              
              <tr key={list.id} className="hover:bg-gray-200" onClick={()=>{infoPostulation();handlListInfo(list)}}>
                <td className="py-2 px-4"><img className='object-cover w-36 rounded-md' src={UrlStorage+list.publication_id.photopost} alt="" srcset="" /></td>
                <td className="py-2 px-4">{list.publication_id.id}</td>
                <td className="py-2 px-4">{list.publication_id.titre}</td>
                <td className="py-2 px-4">{list.ville.name_ville}</td>
                <td className="py-2 px-4">{list.domain.metier}</td>
                <td className="py-2 px-4">{list.publication_id.type}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>}
      {showPost && <>
        <div className='sticky top-0 bg-white w-full  h-[50px]'>
          <div className='border-[1px] p-1 m-2 border-black hover:bg-slate-500 rounded-full max-w-10' onClick={infoPostulation}>
            <svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 -960 960 960" width="24"><path d="m313-440 224 224-57 56-320-320 320-320 57 56-224 224h487v80H313Z"/></svg>
          </div>
        </div>
        <div className='mx-auto'>
          <ListOfferFiltered clicksPost={listInfo.publication_id} />
        </div>
          
        </>}
    </div>
  );
};

export default OfferCand;
