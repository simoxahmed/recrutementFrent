import React, {useState, useEffect} from 'react';
import '../App.css';
import Search from '../components/Search';
import Navbar from '../components/Navbar';
import Filter from '../components/Filter';
import ListOffer from '../components/ListOffer';
import ListOfferFiltered from '../components/ListOfferFiltered';
import NotificationComplate from '../components/features/Notification/NotificationComplate';
import Cookies from 'js-cookie';
import { useNavigate, useParams } from 'react-router-dom';
import authService from '../services/authService';

const ListPage = ({type}) => {
    const { domain } = useParams();
    const [selectedMetiers, setSelectedMetiers] = useState([]);
    const [selectedContrats, setSelectedContrats] = useState([]);
    // const [filteredLists, setFilteredLists] = useState([]);
    const [searchVille, setSearchVille] = useState('');
    const [searchMetier, setSearchMetier] = useState('');
    const [clicks, setClicks] = useState();
    const [clickPosts, setClickPosts] = useState();
    const [typePage, setTypePage] = useState('emploi');
    const [showNotification, setShowNotification] = useState(false);
    const navigate = useNavigate();

    const [userData, setUserData] = useState({});
// console.log(domain);


    const fetchDataUser = async () => {
      try {
        const response = await authService.getUser();
        const [data]=response.data;
      //   console.log(data.employee);
        setUserData(data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    useEffect(() => {
      fetchDataUser();
    })
    


if (localStorage.getItem('accessToken')) {
    if ( Object.keys(userData).length!==0 && (userData.employee?.tele===null || userData.employee?.lettre===null || userData.employee?.cv===null)&& Cookies.get('notification')!== 'read') {
        setShowNotification(true);

        Cookies.set('notification','read')
      }
    }else{
        navigate('/')
    }
    // console.log(showNotification);
    const handleSearchV = (ville) => {
        setSearchVille(ville);
    }

    
    const handleSearchM = (metier) => {
        setSearchMetier(metier);
    }

    const handleMetierChange = (metiers) => {
        setSelectedMetiers(metiers);

    };

    const handleContratChange = (contrats) => {
        setSelectedContrats(contrats);

    };


    const handleClicks =(clicksChange) => {
        setClicks(clicksChange);
        // console.log(clicksChange);
    }

    const handleClickPosts =(clicksPost) => {
        setClickPosts(clicksPost);
        // console.log(clicksChange);
    }
    
    useEffect(() => {
        setTypePage(type);
    }, [type]);
    
    
    

  return (
    <div>
        <Navbar img={userData} />
        <Search onSearchVille={handleSearchV} onSearchMetier={handleSearchM} domain={domain} />
        {/* <Search/> */}
        <div style={{ zIndex: -10 }} className='flex -z-30 justify-start infineted w-full min-h-[75vh] px-10 py-4 my-6 bg-[#00263a]'>
            {!clicks ? <Filter onMetierChange={handleMetierChange} onContratChange={handleContratChange} typePage={typePage}/>:<></> }

            <ListOffer 
                searchVille={searchVille} 
                searchMetier={searchMetier} 
                metiers={selectedMetiers} 
                contrats={selectedContrats} 
                onClicksList={handleClicks}
                onClicksPost={handleClickPosts}
                type={typePage}
                domain={domain}
            />
            {clicks && <div className="flex w-[65%]  h-[75vh] overflow-y-scroll bg-white">
                <ListOfferFiltered clicksPost={clickPosts} userData={userData} />
            </div>}
        </div>
        <div >
            {showNotification&&<NotificationComplate notShow={showNotification} />}
        </div>
    </div>
  )
}

export default ListPage