import React, { useState, useEffect } from 'react'
import authService from '../services/authService';

const ListOffer = ({searchVille, searchMetier, metiers, contrats , onClicksList, onClicksPost, type,domain}) => {
    const [offers, setOffers] = useState([]);
    const [filteredOffers, setFilteredOffers] = useState([]);
    const [clicks, setClicks] = useState(false);
    const [clicksPost, setClicksPost] = useState({});
    
    // console.log(domain,searchMetier);
    // const [typePage, setTypePage] = useState('emlpoi');
    // const type= typePage;
    const fetchDataByType = async (type) => {
      try {
        const response = await authService.navigate(type);
        const arrayOffer = Object.values(response.data);
        setOffers(arrayOffer);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    
    
    useEffect(() => {
      if (Object.prototype.toString.call(type) === '[object Object]') {
        const [typePage] = Object.values(type);
        fetchDataByType(typePage);
         
      } else {
        fetchDataByType(type);
      }
    }, [type]);

        
            let domainSelect='';
            if (domain !== undefined && searchMetier === '') {
              domainSelect=domain
            }else if(searchMetier !== ''){
              domainSelect=searchMetier
            }
            useEffect(() => {
              // Filter the offers based on the search query and selected metiers and contrats
              const filtered = offers.filter((offer) => {
                const matchesSearchVille = offer.ville_id.name_ville.toLowerCase().startsWith(searchVille.toLowerCase());
                const matchesSearchMetier = offer.domain_id.name_domain.toLowerCase().startsWith(domainSelect.toLowerCase());
            
                const metierArray = Array.isArray(offer.domain_id.metier) ? offer.domain_id.metier : [offer.domain_id.metier];
                const contratArray = Array.isArray(offer.contrat) ? offer.contrat : [offer.contrat];
            
                if (metiers.length === 0 && contrats.length === 0) {
                  // Show all items if no metier or contrat is selected
                  return matchesSearchVille && matchesSearchMetier;
                }
            
                if (metiers.length === 0) {
                  // Filter by contrat only
                  return (
                    matchesSearchVille &&
                    matchesSearchMetier &&
                    contratArray.some((contratType) => contrats.includes(contratType))
                  );
                }
            
                if (contrats.length === 0) {
                  // Filter by metier only
                  return (
                    matchesSearchVille &&
                    matchesSearchMetier &&
                    metierArray.some((category) => metiers.includes(category))
                  );
                }
            
                // Filter by both metier and contrat
                return (
                  matchesSearchVille &&
                  matchesSearchMetier &&
                  metierArray.some((category) => metiers.includes(category)) &&
                  contratArray.some((contratType) => contrats.includes(contratType))
                );
              });
            
              setFilteredOffers(filtered);
            }, [searchVille, domainSelect, metiers, contrats, offers]);
            
              // onFilteredList(filteredOffers)
              
              //clicksPost:
              const handlClicksEnter = (idSearch) =>{
                
                // });
                let post = []
                setClicks(true);
                
                filteredOffers.forEach(element => {
                  
                  if(element.id === idSearch ){  
                  post = element; 
                  // console.log(post);
                  }
                });
                setClicksPost(post);
              }

              const handlClicksToBack = () =>{
                setClicks(false);
              }
              // console.log(clicks);
              onClicksList(clicks);
              onClicksPost(clicksPost);
    
  return (
    <div className={clicks ? 'mx-4 -z-29 w-[35%] h-[75vh] bg-[#F2F2F2] transform duration-1000 overflow-y-scroll' : 'transform duration-1000 mx-4 w-full h-[75vh] bg-[#F2F2F2] overflow-y-scroll'} >

    {
      clicks?
      
        <div className="flex justify-start items-center sticky top-0 right-0 left-0 bg-white">
          <div className='border-[1px] p-1 m-2 border-black hover:bg-slate-500 rounded-full' onClick={handlClicksToBack}>
            <svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 -960 960 960" width="24"><path d="m313-440 224 224-57 56-320-320 320-320 57 56-224 224h487v80H313Z"/></svg>
          </div>
          <div >
            <div className='flex justify-between space-x-14'>
              <span className='text-xl '>Retour aux critères</span>
              <span className='text-xl font-bold'>{filteredOffers.length} offers d'emplois</span>
            </div>
          </div>
        </div>
        :
        <div className="mb-4 text-xl text-center font-medium shadow-md px-8 py-6 border-2 sticky top-0 right-0 left-0 bg-white shadow-slate-500">
            {filteredOffers.length} emplois correspondent à vos critères
        </div> 
        
    }

    {offers && filteredOffers.map((offer) => (

        <div key={offer.id} className=" mx-4 flex justify-start items-center border-b-2 border-gray-300 m-1" onClick={()=>handlClicksEnter(offer.id)} >
                {/* <div className=""><img src="https://picsum.photos/100/100" alt="" className="w-full mb-4" /></div> */}
                
            <div className="flex flex-col mr-auto w-[50%] ml-3">
                <div className="py-3">
                    <p className="flex font-sans text-gray-700">{/*Date*/}
                        <svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 -960 960 960" width="24"><path d="M477.89-176.5q-115.2 0-200.795-74.75Q191.5-326 177.5-440.5H203Q219.5-338 296.482-270t181.29 68Q594-202 675-283.013q81-81.013 81-196.982t-81.063-196.987Q593.873-758 477.5-758q-59.27 0-111.635 24T272.5-667.853H367v25.353H228.5V-781H254v95.5q44.5-46 101.959-72t121.457-26q63.084 0 118.291 23.852 55.207 23.853 96.5 65Q733.5-653.5 757.5-598.316q24 55.184 24 118.25t-24 118.316q-24 55.25-65.25 96.5t-96.536 65Q540.427-176.5 477.89-176.5Zm132.61-156L469-474.435V-677.5h25.5v192L629-351l-18.5 18.5Z"/></svg> Il y a 2 jours
                    </p>
                </div>

                <div className="py-3">
                    <h2 className="text-2xl font-semibold mb-2 text-[#18415D]">
                        {/*Titre*/} {offer.metier}
                    </h2>

                </div>
            </div>
            
            <div className="flex flex-col mr-auto w-[50%] ml-3">
                <div className="py-3">
                    <p className="flex mt-2 font-sans text-gray-700"> {/*Ville*/}
                    <svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 -960 960 960" width="24"><path d="M480.261-495.5q24.239 0 41.489-17.261 17.25-17.261 17.25-41.5t-17.365-41.489Q504.27-613 479.885-613T438.5-595.635q-17 17.365-17 41.75t17.261 41.385q17.261 17 41.5 17Zm-.261 325q108.771-94.069 175.635-197.785Q722.5-472 722.5-546.5q0-109-68.573-180.5-68.574-71.5-174-71.5Q374.5-798.5 306-727q-68.5 71.5-68.5 180.5 0 74.5 66.865 178.215Q371.229-264.569 480-170.5Zm0 34.5Q347-256.5 279.5-359.75T212-546.313q0-117.47 77-197.078Q366-823 480-823t191 79.609q77 79.608 77 197.078Q748-463 680.5-359.75 613-256.5 480-136Zm0-418Z"/></svg>{offer.ville_id.name_ville}
                    </p>
                </div>
                <div className="py-3">
                    <p className="flex text-gray-700"> {/*Contrat*/}
                    <svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 -960 960 960" width="24"><path d="M242.5-137q-27.542 0-46.521-18.625T177-202v-108.5h115V-823h491v621q0 27.75-18.979 46.375T717.5-137h-475Zm475-25.5q17 0 28.5-11.356 11.5-11.357 11.5-28.144v-595.5h-440v487H678v108.562q0 16.513 11.356 27.976Q700.712-162.5 717.5-162.5ZM380-637v-25.5h315v25.5H380Zm0 108v-25.5h315v25.5H380ZM242.7-162.5h409.8V-285h-450v83q0 16.787 11.557 28.144Q225.615-162.5 242.7-162.5Zm-.18 0H202.5h450-409.98Z"/></svg>{offer.contrat}
                    </p>
                </div>
            </div>
            
                
        </div>
    ))}




        
        
    </div>
  )
}

export default ListOffer