import React, { useEffect, useState } from 'react';
import { AiOutlineClose } from 'react-icons/ai';
import authService from '../../../services/authService';

const CheckboxGroup = () => {
  const [selectedItems, setSelectedItems] = useState([]);
  const [domins, setDomain] = useState([]);


  const handleCheckboxChange = (value) => {
    if (selectedItems.includes(value)) {
      setSelectedItems(selectedItems.filter((item) => item !== value));
    } else {
      setSelectedItems([...selectedItems, value]);
    }
  };

  const removeSelectedItem = (itemToRemove) => {
    
    setSelectedItems((prevSelectedItems) =>
    prevSelectedItems.filter((item) => item !== itemToRemove)
    );
    
  };

  const fetchDataDomain = async () => {
    try {
        const response = await authService.domainAll();
        const arrayOffer = Object.values(response.data);
        setDomain(arrayOffer);
    } catch (error) {
        console.error('Error fetching data:', error);
    }
};

useEffect(() => {
    fetchDataDomain();
}, []);

  return (
    <div>
      
        <div className='mx-auto  w-full overflow-y-scroll h-[40vh]'>
          <h3 className="mb-4  font-semibold text-gray-900 dark:text-white">Technology</h3>
          <ul className="text-sm mx-10 font-medium text-gray-900 bg-white border border-gray-200 rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white">
            <li className="w-full  border-b border-gray-200 rounded-t-lg dark:border-gray-600">
              {domins && domins.map((domin) => (
                <div key={domin.id} className='py-1'>
                  <div className="flex items-center ps-3">
                    <input
                      id={`checkbox-group-${domin.id}`}
                      type="checkbox"
                      checked={selectedItems.includes(domin.name_domain)}
                      onChange={() => handleCheckboxChange(domin.name_domain)}
                      className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
                    />
                    <label htmlFor={`checkbox-group-${domin.id}`} className="w-full py-3 ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">{domin.name_domain}</label>
                  </div>
                  {domins.map((chV2) => (
                    <>
                      {chV2&& chV2.name_domain ===domin.name_domain&&
                        <div key={chV2.id + '-' + domin.id} className="flex items-center ml-6 px-2 ">
                          <input
                            id={`checkbox-${chV2.id + '-' + domin.id}`}
                            type="checkbox"
                            checked={selectedItems.includes(chV2.metier)}
                            onChange={() => handleCheckboxChange(chV2.metier)}
                            className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
                          />
                          <label htmlFor={`checkbox-${chV2.id + '-' + domin.id}`} className="w-full py-3 ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">{chV2.metier}</label>
                        </div>
                      }
                    </>
                  ))}
                </div>
              ))}
            </li>
          </ul>
        

        </div>
        <div className='bg-gray-500 w-full rounded-b-md'>
          <div className="mt-4 mx-12  sticky bottom-0 left-0 right-0">
            <span className='text-white font-medium '>Selected Items:</span>
            <ul className='grid grid-cols-6 gap-3 py-2 '>
              {selectedItems.map((item, index) => (
                <li key={index} className=' flex py-2 px-2 text-xs font-medium text-center mx-auto rounded-md border bg-blue-700 text-white'>
                  {item}
                  <div
                    className="ml-2 text-red-300"
                    onClick={() => removeSelectedItem(item)}
                  >
                    <AiOutlineClose />
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>

    </div>
  );
};

export default CheckboxGroup;
