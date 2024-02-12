import React from 'react'
import Navbar from '../components/Navbar';
import Search from '../components/Search';
// import { Navbar, Nav, NavDropdown } from 'react-bootstrap';

const Home = ({userData}) => {
  return (
    <div>
      <Navbar img={userData} />
    </div>
  )
}

export default Home