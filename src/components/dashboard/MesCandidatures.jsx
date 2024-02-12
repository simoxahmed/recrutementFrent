import React from 'react'
import OfferCand from './MesCandidatures/OfferCand'
import ListDemand from './MesCandidatures/ListDemand';
import ListFavorate from './MesCandidatures/ListFavorate';
import MsgList from './MesCandidatures/MsgList';


const MesCandidatures = ({activeSub}) => {
  

  

  // console.log(activeSub);
  return (

    <div>
        <h2 className="text-3xl font-semibold mb-4">Mes Candidatures</h2>
        {/* <div className="bg-white p-6 rounded shadow">
            <h3 className="text-xl font-semibold mb-4">Candidatures en Cours</h3>
            <ul>
            <li>Ingénieur Développeur - Entreprise A</li>
            <li>Designer UI/UX - Entreprise B</li>
            


            </ul>
        </div> */}
        <div className='my-5'>
          
        {activeSub === 'mesCandidatures' && <OfferCand />}
        {activeSub === 'listmespostuler' && <OfferCand />}
        {activeSub === 'mesdemandes' && <ListDemand />}
        {activeSub === 'mesfavorites' && <ListFavorate />}
        {activeSub === 'mesmessages' && <MsgList />}

        </div>
    </div>

  )
}

export default MesCandidatures