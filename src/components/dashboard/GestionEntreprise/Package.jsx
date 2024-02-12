import React, { useEffect, useState } from 'react'
import authService from '../../../services/authService';

const Package = ({publication_id}) => {

    //function to handle Charge points:
    const [packages, setPackages] = useState([]);

    useEffect(() => {
        authService.indexPricing()
            .then(response => setPackages(response))
            .catch(error => console.error('Error fetching packages:', error));
    }, []);


  const HandlCharge= (e,packge)=>{
    e.preventDefault();
      authService.chargePoint(packge,publication_id)
          .then(response => console.log('Pricing :', response.data))
          .catch(error => console.error('Error packge:', error));
  }
  return (
    <div className='w-[70%] max-h-[70%] overflow-y-auto mx-auto px-4 py-6'>
        <table className="min-w-full">
            <thead className="bg-gray-800 sticky top-0 left-0 right-0 text-white">
                <tr>
                <th className="py-2 px-4">Name</th>
                <th className="py-2 px-4">Price</th>
                <th className="py-2 px-4">Pointsold</th>
                <th className="py-2 px-4">Duration</th>
                <th className="py-2 px-4">DurationSolde</th>
                </tr>
            </thead>
            <tbody className="bg-gray-300 text-center">
                { packages && packages.map((packge) => (
                
                <tr key={packge.id} className="hover:bg-gray-200">
                    <td className="py-2 px-4">{packge.name}</td>
                    <td className="py-2 px-4">{packge.price}</td>
                    <td className="py-2 px-4">{packge.pointsold}</td>
                    <td className="py-2 px-4">{packge.duration}</td>
                    <td className="py-2 px-4">{packge.durationSolde}</td>
                    <td className="py-2 px-4">
                      <button onClick={(e) => HandlCharge(e,packge.id)}>
                        Charge
                      </button>
                    </td>
                    </tr>
                ))}
            </tbody>
        </table>
    </div>
  )
}

export default Package