import '../App.css';
import React, { useEffect, useState } from 'react';
import { AiOutlineClose, AiOutlineDown, AiOutlineMenu } from 'react-icons/ai';
import { UrlWeb } from '../Constants';
import authService from '../services/authService';
import { Link, useNavigate } from 'react-router-dom';
import ProfileDropup from './features/ProfileDropup';
import Cookies from 'js-cookie';
import { EmptyHeartIcon, RedHeartIcon } from './features/icons/icons';
import { faHeart } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

// import authService from "./services/authService";
// import { authHeaders } from '../services/authService';

const Navbar = (img) => {
    // const imagProfile=img.employee.photo;
    const [nav, setNav] = useState(false);
    const navigate = useNavigate();
    const [domains,setDomain]=useState([]);
    // setDomain(response)
    const handleDataDomain = async() => {
        try {
            const response = await authService.domain();
            setDomain(response)
            // console.log(response.data);
            } catch (error) {
            console.error('Error fetching data:', error);
            }
    }
    
    useEffect(() => {
        handleDataDomain();
    }, []);
    
    

    const handleNav = () => {
        setNav(!nav);
    };

    const [dropdowns, setDropdowns] = useState({
        Offers: false,
        DemandO: false,
        Stages: false,
        DemandS: false,
      });

    const Dropdown = (dropdownKey) => () => {
        setDropdowns((prevDropdowns) => ({
          ...Object.fromEntries(Object.entries(prevDropdowns).map(([key, _]) => [key, false])),
          [dropdownKey]: !prevDropdowns[dropdownKey],
        }));
      };

    const handleLogout = () =>{

        const logout = async () => {
            const response = await authService.logout();
            Cookies.set('notification','')
            Cookies.set('TypeCompte','')
            console.log(response);
            
        };
        logout();
        localStorage.removeItem('accessToken');
        console.log(localStorage.getItem('accessToken'));
        navigate('/');
    }

    const handlFavorate=()=>{
        // window.location.reload()
        navigate('/dashboard')
        // Cookies.set('activeCategory','mesfavorites')
    }
    
  return (
    <>
        
        
        <div className="z-10">
            <div className='flex justify-between items-center min-h-[12vh] max-w-[1240px] mx-auto px-4 text-black'>
                <h1 className='text-3xl font-bold text-[#00df9a]'>LOGO</h1>
                <ul className='hidden md:flex '>
                    <div className="relative ">
                        <li className='p-4 flex ' onMouseEnter={Dropdown('Offers')} >Offer d'Emploi <span className='p-1'><AiOutlineDown className='w-5 h-4' /></span></li>
                        
                            {dropdowns.Offers && (
                                <div style={{ zIndex: 30 }} onMouseLeave={Dropdown('Offers')} className='px-4 absolute top-[75px] left-0 bg-white border font-medium text-gray-500 border-gray-400 w-[350px]'>
                                    <ul className="mx-auto ">
                                    {domains && domains.map((domain) => (
                                        <li className='p-3' ><Link className='p-3' to={`${UrlWeb}emploi/${domain}`}>IT / DATA</Link></li>
                                    ))}
                                    </ul>
                                </div>
                            )}
                    </div>
                    
                    <div className=" relative">
                        <li className='p-4 flex ' onMouseEnter={Dropdown('DemandO')} >Demand d'Emploi <span className='p-1'><AiOutlineDown className='w-5 h-4' /></span></li>
                            {dropdowns.DemandO && (
                                <div style={{ zIndex: 30 }} onMouseLeave={Dropdown('DemandO')} className='px-4 absolute top-[75px] left-0 bg-white border font-medium text-gray-500 border-gray-400 w-[350px]'>
                                    <ul className="mx-auto ">
                                    {domains && domains.map((domain) => (
                                        <li className='p-3' ><Link className='p-3' to={`${UrlWeb}demand_emploi/${domain}`}>IT / DATA</Link></li>
                                    ))}
                                    </ul>
                                </div>
                            )}
                        </div>

                    <div className=" relative">
                        <li className='p-4 flex ' onMouseEnter={Dropdown('Stages')} >Offer de Stage <span className='p-1'><AiOutlineDown className='w-5 h-4' /></span></li>
                            {dropdowns.Stages && (
                                <div style={{ zIndex: 30 }} onMouseLeave={Dropdown('Stages')} className='px-4 absolute top-[75px] left-0 bg-white border font-medium text-gray-500 border-gray-400 w-[350px]'>
                                    <ul className="mx-auto ">
                                    {domains && domains.map((domain) => (
                                        <li className='p-3' ><Link className='p-3' to={`${UrlWeb}stage/${domain}`}>IT / DATA</Link></li>
                                    ))}
                                    </ul>
                                </div>
                            )}
                        </div>

                    <div className=" relative">
                        <li className='p-4 flex ' onMouseEnter={Dropdown('DemandS')} >Demand de Stage <span className='p-1'><AiOutlineDown className='w-5 h-4' /></span></li>
                            {dropdowns.DemandS && (
                                <div style={{ zIndex: 30 }} onMouseLeave={Dropdown('DemandS')} className='px-4 absolute top-[75px] left-0 bg-white border font-medium text-gray-500 border-gray-400 w-[350px]'>
                                    <ul className="mx-auto ">
                                    {domains && domains.map((domain) => (
                                        <li className='p-3' ><Link className='p-3' to={`${UrlWeb}demand_stage/${domain}`}>IT / DATA</Link></li>
                                    ))}
                                    </ul>
                                </div>
                            )}
                        </div>
                </ul>
                <div className="hidden md:flex items-center">
                {localStorage.getItem('accessToken') ? (
                    <div className='flex items-center space-x-1'>

                    <FontAwesomeIcon icon={faHeart} className='hover:cursor-pointer' onClick={handlFavorate}/>
                    <ProfileDropup handleLogoutClick={handleLogout} imgProfile={img} />
                    </div>
                ) : (
                    <>
                    <a className="bg-[#00df9a] text-white px-4 py-2 rounded" href={UrlWeb + "login"}>
                        Login
                    </a>
                    <a className="bg-[#00df9a] text-white px-4 py-2 rounded ml-4" href={UrlWeb + "register"}>
                        Sign Up
                    </a>
                    </>
                )}
                </div>



                <div onClick={handleNav} className='block md:hidden'>
                    {nav ? <AiOutlineClose size={20}/> : <AiOutlineMenu size={20} />}
                </div>
                <div className={nav ? 'fixed left-0 top-0 w-[60%] h-full border-r border-r-gray-900 bg-[#000300] ease-in-out duration-500 md:hidden' : 'ease-in-out duration-500 fixed left-[-100%]'}>
                    <ul >
                        <h1 className='w-full text-3xl font-bold text-[#00df9a] m-4'>LOGO</h1>
                            <div className='border-b border-gray-600'>
                                <li className='p-4 flex justify-between font-medium text-white' onClick={Dropdown('Offers')}>Offer d'Emploi <span className='p-1'><AiOutlineDown className='w-5 h-4' /></span></li>
                                    <div className="pl-3">
                                        {dropdowns.Offers && (
                                            <div className='px-4 text-gray-300 w-[350px]'>
                                                <ul className="mx-auto ">
                                                    <li className='p-3' href="#">IT / DATA</li>
                                                    <li className='p-3' href="#">Management opérationnel</li>
                                                    <li className='p-3' href="#">Marketing client et digital</li>
                                                    <li className='p-3' href="#">IT / DATA</li>
                                                    <li className='p-3' href="#">Management opérationnel</li>
                                                    <li className='p-3' href="#">Marketing client et digital</li>
                                                </ul>
                                            </div>
                                        )}
                                    </div>
                            </div>
                            <div className='border-b border-gray-600'>
                                <li className='p-4 flex justify-between font-medium text-white' onClick={Dropdown('DemandO')}>Demand d'Emploi <span className='p-1'><AiOutlineDown className='w-5 h-4' /></span></li>
                                    <div className="pl-3">
                                        {dropdowns.DemandO && (
                                            <div className='px-4 text-gray-300 w-[350px]'>
                                                <ul className="mx-auto ">
                                                    <li className='p-3' href="#">IT / DATA</li>
                                                    <li className='p-3' href="#">Management opérationnel</li>
                                                    <li className='p-3' href="#">Marketing client et digital</li>
                                                    <li className='p-3' href="#">IT / DATA</li>
                                                    <li className='p-3' href="#">Management opérationnel</li>
                                                    <li className='p-3' href="#">Marketing client et digital</li>
                                                </ul>
                                            </div>
                                        )}
                                    </div>
                            </div>
                            <div className='border-b border-gray-600'>
                                <li className='p-4 flex justify-between font-medium text-white' onClick={Dropdown('Stages')}>Offer de Stage <span className='p-1'><AiOutlineDown className='w-5 h-4' /></span></li>
                                    <div className="pl-3">
                                        {dropdowns.Stages && (
                                            <div className='px-4 text-gray-300 w-[350px]'>
                                                <ul className="mx-auto ">
                                                    <li className='p-3' href="#">IT / DATA</li>
                                                    <li className='p-3' href="#">Management opérationnel</li>
                                                    <li className='p-3' href="#">Marketing client et digital</li>
                                                    <li className='p-3' href="#">IT / DATA</li>
                                                    <li className='p-3' href="#">Management opérationnel</li>
                                                    <li className='p-3' href="#">Marketing client et digital</li>
                                                </ul>
                                            </div>
                                        )}
                                    </div>
                            </div>

                            <div className='border-b border-gray-600'>
                                <li className='p-4 flex justify-between  font-medium text-white' onClick={Dropdown('DemandS')}>Demand de Stage <span className='p-1'><AiOutlineDown className='w-5 h-4' /></span></li>
                                    <div className="pl-3">
                                        {dropdowns.DemandS && (
                                            <div className='px-4 text-gray-300 w-[350px]'>
                                                <ul className="mx-auto ">
                                                    <li className='p-3' href="#">IT / DATA</li>
                                                    <li className='p-3' href="#">Management opérationnel</li>
                                                    <li className='p-3' href="#">Marketing client et digital</li>
                                                    <li className='p-3' href="#">IT / DATA</li>
                                                    <li className='p-3' href="#">Management opérationnel</li>
                                                    <li className='p-3' href="#">Marketing client et digital</li>
                                                </ul>
                                            </div>
                                        )}
                                    </div>
                            </div>
                    </ul>

                {/* <div className="hidden md:flex items-center"> */}
                {/* {statusUser ?  */}
                {/* ( */}
                    {/* <> */}
                    <a className="p-4 mt-4 ml-3 bg-[#00df9a] text-white px-4 py-2 rounded" href={UrlWeb +"login"} >Login</a>
                    <a className="p-4 mt-4 bg-[#00df9a] text-white px-4 py-2 rounded ml-4" href={UrlWeb +"/register"}>Sign Up</a>
                    {/* </> */}
                    {/* ) : ( */}
                        {/* <> */}
                        <div className="p-4 mt-4 bg-[#00df9a] text-white px-4 py-2 rounded ml-4">
                            <form onSubmit={handleLogout}>
                                <button type="submit">Logout</button>
                            </form>
                        </div>
                        {/* </> */}
                        {/* )} */}
                </div>
            </div>
        </div>
    </>
  );
};

export default Navbar