import './App.css';
import React, { useEffect, useState } from 'react'
import {BrowserRouter as Router, Route, Routes, useParams } from 'react-router-dom';
import ListPage from './pages/ListPage';
import LogIn from './pages/LoginSingup/LogIn';
import SingUp from './pages/LoginSingup/SingUp';
import Home from './pages/Home';
import Dashboard from './pages/Dashboard';
// import DashboardV5 from './pages/DashboardV5';
import authService from './services/authService';
import Cookies from 'js-cookie';
import TestSeletOpt from './pages/testSeletOpt';





function App() {

  const [userData, setUserData] = useState({});
  // const { domain }=useParams();



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
    

    // console.log('***********');


  return (
    // <div>
    //   <ListPage />
    // </div>
    <Router>
      <Routes>
        <Route path="/" element={<Home userData={userData}/>} />
        <Route path="/emploi/:domain" element={<ListPage type="emploi"  />} />
        <Route path="/demand_emploi/:domain" element={<ListPage type="demand_emploi" />} />
        <Route path="/stage/:domain" element={<ListPage type="stage" />}  />
        <Route path="/demand_stage/:domain" element={<ListPage type="demand_stage" />} />
        <Route path="/emploi" element={<ListPage type="emploi"  />} />
        <Route path="/demand_emploi" element={<ListPage type="demand_emploi" />} />
        <Route path="/stage" element={<ListPage type="stage" />}  />
        <Route path="/demand_stage" element={<ListPage type="demand_stage" />} />
        <Route path="/login" element={<LogIn />} />
        <Route path="/register" element={<SingUp />} />
        <Route path="/dashboard" element={<Dashboard userData={userData} />} />
        <Route path="/testselect" element={<TestSeletOpt />} />
      </Routes>
    </Router>
  );
}

export default App;
