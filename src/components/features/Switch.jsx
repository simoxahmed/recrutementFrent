import Cookies from 'js-cookie';
import React, { useState } from 'react'

const Switch = () => {
  const stateBisic =Cookies.get('TypeCompte') === 'employee'
    const [isChecked, setIsChecked] = useState(!stateBisic);
    const [TypeCompte, setTypeCompte] = useState(Cookies.get('TypeCompte'));
    
    if (isChecked) {
      Cookies.set('TypeCompte','entreprise')
      Cookies.set('entreprise_id','*')
    }else{
      Cookies.set('TypeCompte','employee')
    }

  const handleToggle = () => {
    if (!isChecked) {
      setTypeCompte('entreprise')
      Cookies.set('TypeCompte','entreprise')
        
    }else{
      setTypeCompte('employee')
      Cookies.set('TypeCompte','employee')
    }
    setIsChecked(!isChecked);
  }
  return (
    <div className="flex items-center">
      <label htmlFor="toggle" className="flex items-center cursor-pointer">
        <div className="relative">
          <input
            id="toggle"
            type="checkbox"
            className="sr-only"
            checked={isChecked}
            onChange={handleToggle}
          />
          <div className="ml-3 w-5 h-3 bg-gray-400 rounded-full shadow-inner"></div>
          <div
            className={`${
                isChecked ? "bg-blue-500 translate-x-full" : "bg-gray-200"
              } absolute left-2.5 top-0 w-3 h-3 rounded-full shadow-md transform transition-transform duration-300 ease-in-out`}
            ></div>
        </div>
        <div className="ml-3 text-gray-700 font-medium">Toggle</div>
      </label>
    </div>
  )
}

export default Switch