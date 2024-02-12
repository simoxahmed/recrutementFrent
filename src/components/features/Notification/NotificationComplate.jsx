import React, { useState } from 'react'

const NotificationComplate = () => {
    const [showNotification, setShowNotification] = useState(true);
  
    return (
      <div >
        {/* Your component content */}
        {showNotification && (
        <div style={{ zIndex: 100 }} className='absolute bg-[#2a2a2a69]  top-0 right-0 w-full h-full'>
            <div className="fixed top-1/4 right-1/4 bg-white border border-gray-300 text-gray-800 px-6 py-4 rounded-lg shadow-lg">
                <p className="text-lg font-semibold mb-2">Merci d'avoir créé votre compte !</p>
                <p className="text-sm mb-4">N'oubliez pas de compléter vos informations de profil pour profiter pleinement de nos services.</p>

                <button
                    className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded focus:outline-none"
                    onClick={() => setShowNotification(false)}
                >
                    Close
                </button>
            </div>
        </div>
        )}
      </div>
    );
}

export default NotificationComplate