import React, {useEffect, useState} from 'react'

const Search = ({onSearchVille,onSearchMetier , domain}) => {

    const [searchVille, setSearchVille] = useState('');
    const [searchMetier, setSearchMetier] = useState('');
    

    const inputChangeV = (e) => {
        setSearchVille(e.target.value);
    };

    useEffect(() => {
        if(domain !== undefined){
            setSearchMetier(domain)
        }
    }, [])
    


    const inputChangeM = (e) => {
        setSearchMetier(e.target.value);
    };

    const searchClickVM = () => {
        onSearchMetier(searchMetier);
        onSearchVille(searchVille);
    };


  return (

                
    
        <div className="flex justify-center mt-2 z-[-10]">
            <input type="text" className='block mx-4 p-2.5 w-[20%]  text-sm text-gray-900 bg-gray-50 rounded-lg border-s-gray-50 border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-s-gray-700  dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:border-blue-500' placeholder="Domain" id="metier" value={searchMetier} onChange={inputChangeM} />
        
            <div class="flex w-[40%] ">
                <button id="dropdown-button" data-dropdown-toggle="dropdown" class="flex-shrink-0  inline-flex items-center py-2.5 px-4 text-sm font-medium text-center text-gray-900 bg-gray-100 border border-gray-300 rounded-s-lg hover:bg-gray-200 focus:ring-4 focus:outline-none focus:ring-gray-100 dark:bg-gray-700 dark:hover:bg-gray-600 dark:focus:ring-gray-700 dark:text-white dark:border-gray-600" type="button">All categories 
                    <svg class="w-2.5 h-2.5 ms-2.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 4 4 4-4"/>
                    </svg>
                </button>

                <div id="dropdown" class=" hidden bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700">
                    <ul class="py-2 text-sm text-gray-700 dark:text-gray-200" aria-labelledby="dropdown-button">
                        <li>
                            <button type="button" class="inline-flex w-full px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Mockups</button>
                        </li>
                        <li>
                            <button type="button" class="inline-flex w-full px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Templates</button>
                        </li>
                        <li>
                            <button type="button" class="inline-flex w-full px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Design</button>
                        </li>
                        <li>
                            <button type="button" class="inline-flex w-full px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Logos</button>
                        </li>
                    </ul>
                </div>

                <div class="relative w-full">
                    <input type="search" id="search-dropdown" class="block p-2.5 w-full  text-sm text-gray-900 bg-gray-50 rounded-e-lg border-s-gray-50 border-s-2 border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-s-gray-700  dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:border-blue-500" placeholder="Search Ville" value={searchVille} required onChange={inputChangeV} />
                    <button onClick={searchClickVM} type="button" class="absolute top-0 end-0 p-2.5 text-sm font-medium h-full text-white bg-[#00df9a] border hover:bg-[#00df7a] focus:ring-4 focus:outline-none ">
                        <svg class="w-4 h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"/>
                        </svg>
                        <span class="sr-only">Search</span>
                    </button>
                </div>
            </div>
        </div>


 
  )
}

export default Search