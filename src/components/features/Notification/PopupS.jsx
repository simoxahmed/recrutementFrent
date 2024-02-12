import React from 'react';
import { AiOutlineClose } from 'react-icons/ai';
import { FiAlertCircle } from 'react-icons/fi';

const PopupS = ({ onClose, show, message }) => {
  const handleCloseClick = () => {
    onClose();
    // Additional logic to handle closing the popup
  };

  return (
    <>
      {show && (
        <>
        
        <div id="alert-3" class="flex items-center p-4 mb-4 text-green-800 rounded-lg bg-green-50 dark:bg-gray-800 dark:text-green-400" role="alert">
            <FiAlertCircle size={24} color="red" />
            <span class="sr-only">Poste Success</span>
            <div class="ms-3 text-sm font-medium">
                {message}
            </div>
            <button type="button" class="ms-auto -mx-1.5 -my-1.5 bg-green-50 text-green-500 rounded-lg focus:ring-2 focus:ring-green-400 p-1.5 hover:bg-green-200 inline-flex items-center justify-center h-8 w-8 dark:bg-gray-800 dark:text-green-400 dark:hover:bg-gray-700" onClick={()=>handleCloseClick()}>
                
                <AiOutlineClose className="cursor-pointer"/>
            </button>
        </div>

        </>
      )}
    </>
  );
};

// const YourComponent = () => {
//   const [showPopup, setShowPopup] = useState(true);

//   const handleClosePopup = () => {
//     setShowPopup(false);
//   };

//   return (
//     <>
//       <Popup show={showPopup} onClose={handleClosePopup} />
//       {/* Rest of your component */}
//     </>
//   );
// };

export default PopupS;
