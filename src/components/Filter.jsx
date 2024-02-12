import React, { useEffect, useState } from 'react';
import { AiOutlineDown } from 'react-icons/ai';
import authService from '../services/authService';

const Filter = ({ onMetierChange, onContratChange, typePage }) => {
    const [selectedMetier, setSelectedCategories] = useState([]);
    const [selectedContrat, setSelectedContrat] = useState([]);
    const [dropdownVisible, setDropdownVisible] = useState({});
    const [dropdownContVisible, setDropdownContVisible] = useState(false);
    const [domins, setDomain] = useState([]);
    const [dropdownDomiVisible, setDropdownDomiVisible] = useState(false);

    const DropdownDomain = () => {
        setDropdownDomiVisible(!dropdownDomiVisible);
    };
    const DropdownMetier = (domainId) => {
        setDropdownVisible(prevState => ({
            ...prevState,
            [domainId]: !prevState[domainId]
        }));
    };

    const DropdownContrat = () => {
        setDropdownContVisible(!dropdownContVisible);
    };

    const handleMetierChange = (metier) => {
        const updatedSelectedMetier = selectedMetier.includes(metier)
            ? selectedMetier.filter(selected => selected !== metier)
            : [...selectedMetier, metier];
        setSelectedCategories(updatedSelectedMetier);
        onMetierChange(updatedSelectedMetier);
    };

    const handleContratChange = (contrat) => {
        const updatedSelectedContrat = selectedContrat.includes(contrat)
            ? selectedContrat.filter(selected => selected !== contrat)
            : [...selectedContrat, contrat];
        setSelectedContrat(updatedSelectedContrat);
        onContratChange(updatedSelectedContrat);
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
        <div className='flex justify-start w-[25%] border border-gray-900 bg-[#fff]'>
            <div className='flex flex-col'>
                <div className='m-4 w-full'>
                    <h1 className='w-full my-3 text-2xl font-bold text-[#00263a]'>FILTRER LES OFFRES</h1>
                    
                    <h2 className='w-full px-2 flex justify-between items-center text-xl font-bold text-[#00263a]' onClick={DropdownDomain}>Domains
                            <AiOutlineDown className={`w-5 h-4 ms-3 ${dropdownDomiVisible ? 'transform rotate-180 duration-300' : 'duration-300'}`} />
                    </h2>

                    {dropdownDomiVisible&&<div className='max-h=[20%] overflow-y-auto'>
    
                        {domins&&domins.map((domain, index) => (
                            <div key={index}>
                                <h2
                                    className='w-full px-2 flex justify-between items-center my-3 text-base font-bold text-[#00263ae2] cursor-pointer'
                                    onClick={() => DropdownMetier(domain.id)}
                                >
                                    {domain.name_domain}
                                    <AiOutlineDown className={`w-5 h-4 ms-3 ${dropdownVisible[domain.id] ? 'transform rotate-180 duration-300' : 'duration-300'}`} />
                                </h2>
                                <div className="pb-4 border-b border-gray-600">
                                    {dropdownVisible[domain.id] && (
                                        <div className="">
                                            {domins&&domins.map((metier, index) => (
                                                <>
                                                    {metier && domain.name_domain === metier.name_domain &&
                                                        <div key={index}>
                                                            <input
                                                                type="checkbox"
                                                                value={metier}
                                                                checked={selectedMetier.includes(metier)}
                                                                onChange={() => handleMetierChange(metier)}
                                                                className="w-4 h-4" />
                                                            <label className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-100">
                                                                {metier}
                                                            </label>
                                                        </div>
                                                    }
                                                </>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            </div>
                        ))}

                    </div>}

                </div>

                <div className='m-4 w-full'>
                    <h2 className='w-full px-2 flex justify-between items-center my-3 text-xl font-bold text-[#00263ae2] cursor-pointer' onClick={DropdownContrat}>Types de contrat
                        <AiOutlineDown className={`w-5 h-4 ms-3 ${dropdownContVisible ? 'transform rotate-180 duration-300' : 'duration-300'}`} />
                    </h2>
                    <div className="pb-4 border-b border-gray-600">
                        {dropdownContVisible && (
                            <>
                                {typePage === 'emploi' || typePage === 'demand_emploi' ? (
                                    <div className="">
                                        <div>
                                            <input id="apple" type="checkbox" 
                                            value={'cdi'}
                                            checked={selectedContrat.includes('cdi')}
                                            onChange={() => handleContratChange('cdi')}
                                            className="w-4 h-4" />
                                            <label htmlFor="apple" className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-100">
                                                CDI
                                            </label>
                                        </div>

                                        <div>
                                            <input id="apple" type="checkbox" 
                                            value={'cdd'}
                                            checked={selectedContrat.includes('cdd')}
                                            onChange={() => handleContratChange('cdd')}
                                            className="w-4 h-4" />
                                            <label htmlFor="apple" className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-100">
                                                CDD
                                            </label>
                                        </div>

                                        <div>
                                            <input id="apple" type="checkbox" 
                                            value={'anapec'}
                                            checked={selectedContrat.includes('anapec')}
                                            onChange={() => handleContratChange('anapec')}
                                            className="w-4 h-4" />
                                            <label htmlFor="apple" className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-100">
                                                Anapec
                                            </label>
                                        </div>

                                    </div>

                                ) : (
                                    <div className="">
                                        <div>
                                            <input id="apple" type="checkbox" 
                                            value={'no-pay'}
                                            checked={selectedContrat.includes('no-pay')}
                                            onChange={() => handleContratChange('no-pay')}
                                            className="w-4 h-4" />
                                            <label htmlFor="apple" className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-100">
                                                No-pay
                                            </label>
                                        </div>

                                        <div>
                                            <input id="apple" type="checkbox" 
                                            value={'pay'}
                                            checked={selectedContrat.includes('pay')}
                                            onChange={() => handleContratChange('pay')}
                                            className="w-4 h-4" />
                                            <label htmlFor="apple" className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-100">
                                                Pay
                                            </label>
                                        </div>

                                    </div>
                                )}
                            </>
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Filter;
