import { faTrashAlt } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { useState } from 'react'
import { UrlStorage } from '../../../Requests';

const DropDownMsg = ({ options, handleOptionchange, handleDeleteClick}) => {
  const [dropDown, setdropDown] = useState(false);
  const [dropDownb, setdropDownb] = useState(false);
  const handlDropdown =()=>{
    setdropDown(!dropDown)
  }

  const handlDropdownb =()=>{
    setdropDownb(!dropDownb)
  }

  return (
    <div onClick={handlDropdown}>
        {dropDown&&<div style={{ zIndex: 30 }} className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
          <div className="py-1">
            <div>
                <select 
                    onChange={handleOptionchange}
                >
                    <option value="new">Nevelle</option>
                    <option value="ready">Ready</option>
                    <option value="favorate">Favorate</option>
                    <option value="archive">Archive</option>
                </select>
            </div>
            <form onSubmit={handleDeleteClick}>
                <button className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left" type="submit">
                <FontAwesomeIcon icon={faTrashAlt} className="mr-2" />
                Supprimier
                </button>
            </form>
            <div onClick={handlDropdownb} className='h-6 w-[60%] bg-white border rounded'>
                {dropDownb && options && <div>
                        <a className='px-2 py1.5 bg-cyan-800' download={UrlStorage+options.cv} >Cv</a>
                        <a className='px-2 py1.5 bg-cyan-800' download={UrlStorage+options.lettre} >Letter Motivation</a>
                        <a className='px-2 py1.5 bg-cyan-800' download={UrlStorage+options.fichier} >Fichier</a>
                    </div>}
            </div>
          </div>
        </div>}
    </div>
  )
}

export default DropDownMsg