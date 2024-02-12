import React, { useEffect, useState } from 'react'
import authService from '../../../services/authService';

const PublishDemand = ({publication_id}) => {
  const [pricings, setPricings] = useState([]);

    useEffect(() => {
        authService.indexPricing()
            .then(response => setPricings(response))
            .catch(error => console.error('Error fetching pricings:', error));
    }, []);


  const HandlPublishing= (e,pricing)=>{
    e.preventDefault();
      authService.publicDemand(pricing,publication_id)
          .then(response => console.log('Pricing :', response.data))
          .catch(error => console.error('Error pricing:', error));
  }

  return (
    <div className='w-[70%] max-h-[70%] overflow-y-auto mx-auto px-4 py-6'>
        <table className="min-w-full">
            <thead className="bg-gray-800 sticky top-0 left-0 right-0 text-white">
                <tr>
                <th className="py-2 px-4">Name</th>
                <th className="py-2 px-4">Pricepoint</th>
                <th className="py-2 px-4">Duration</th>
                </tr>
            </thead>
            <tbody className="bg-gray-300 text-center">
                { pricings && pricings.map((pricing) => (
                
                <tr key={pricing.id} className="hover:bg-gray-200">
                    <td className="py-2 px-4">{pricing.name}</td>
                    <td className="py-2 px-4">{pricing.pricepoint}</td>
                    <td className="py-2 px-4">{pricing.duration}</td>
                    <td className="py-2 px-4">
                      <button onClick={(e) => HandlPublishing(e,pricing.id)}>
                        publish
                      </button>
                    </td>
                    </tr>
                ))}
            </tbody>
        </table>
    </div>
  )
}

export default PublishDemand