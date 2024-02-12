// Dashboard.js
import React, { useEffect, useState } from 'react';
import Reglage from '../components/dashboard/Reglage';
import MesCandidatures from '../components/dashboard/MesCandidatures';
import Sidebar from '../components/dashboard/Sidebar';
import Navbar from '../components/Navbar';
import FichierProfessionnel from '../components/dashboard/FichierProfessionnel ';
import PopUpForm from '../components/features/PopUpForm';
import Cookies from 'js-cookie';
import GestionEntreprise from '../components/dashboard/GestionEntreprise';
import NotificationPage from '../components/dashboard/Notification/NotificationPage';


const Dashboard = ({userData}) => {
  
  useEffect(() => {
    const handlePageReload = () => {
  // if (PerformanceNavigationTiming.type == PerformanceNavigationTiming.TYPE_RELOAD) {
  //   alert('page reloaded')
  //   }
        if (PerformanceNavigationTiming.type === PerformanceNavigationTiming.TYPE_RELOAD) {
          Cookies.set('activeCategory', 'reglage')
        } else {
            console.log('Page not reloaded');
        }
    };

    handlePageReload();

    // Cleanup function
    return () => {
        // Clean up any subscriptions or timers if needed
    };
}, []);
const [activeCategory, setActiveCategory] = useState(Cookies.get('activeCategory'));


const switchCategory = (category) => {
  setActiveCategory(category);
};

  // if (Object.keys(userData).length!==0 && Cookies.get('TypeCompte') === 'entreprise' && Cookies.get('entreprise_id')==='*') {
    // Cookies.set('entreprise_id',userData.userEntreprise[0].entreprise_id.id)
  // }

  
  return (
    <>
        <Navbar img={userData}/>
    <div className="bg-gray-100 h-[85vh] flex flex-col md:flex-row">
      
      {/* Sidebar */}
      <Sidebar switchCategory={switchCategory} userData={userData}/>

      {/* Main Content */}
      <div className="flex-1 p-8">
        {activeCategory === 'reglage' && <Reglage />}
        {activeCategory === 'fichierProfessionnel' && Cookies.get('TypeCompte')=== 'employee' && (
          <FichierProfessionnel  userData={userData} />
        )}

        {activeCategory === 'mesCandidatures' && <MesCandidatures activeSub={activeCategory} />}
        {activeCategory === 'listmespostuler' && <MesCandidatures activeSub={activeCategory} />}
        {activeCategory === 'mesdemandes' && <MesCandidatures activeSub={activeCategory} />}
        {activeCategory === 'mesfavorites' && <MesCandidatures activeSub={activeCategory} />}
        {activeCategory === 'mesmessages' && <MesCandidatures activeSub={activeCategory} />}
          
        {activeCategory === 'gestionEntreprise' && <GestionEntreprise activeSub={activeCategory} />}
        {activeCategory === 'listEntre' && <GestionEntreprise activeSub={activeCategory} />}
        {activeCategory === 'ListUserEntre' && <GestionEntreprise activeSub={activeCategory} />}
        {activeCategory === 'auth' && <GestionEntreprise activeSub={activeCategory} />}
        {activeCategory === 'notification' && <NotificationPage />}

        {activeCategory === 'ChangeToEntreprise' && <PopUpForm onClose={()=>switchCategory('reglage')}/>}


        
      </div>
    </div>
    </>
  );
};

export default Dashboard;
