import React, { useEffect, useState } from 'react'
import { CiClock1 } from 'react-icons/ci'
import { PiGridFour } from 'react-icons/pi'
import "./Root.css"
import { Link, Outlet, useNavigate } from 'react-router-dom'
import { GiPowerButton } from 'react-icons/gi'
import NavBar from './NavBar'

const Root = () => {
  const navigate = useNavigate()
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    if (!localStorage.getItem("token")) {
      navigate("/");
    }
  }, []);

  const confirmLogout = () => {
    setShowModal(true); 
  };

  const logout = () => {
    fetch("https://vica.website/api/logout", {
      method: "POST",
      headers: {
        Accept: "application/json",
        AUTHORIZATION: localStorage.getItem("token")
      },
    }).then(res => res.json())
      .then(res => {
        console.log(res);
        localStorage.removeItem("token");
        navigate("/");
      });

    setShowModal(false);
  };

  return (
    <div className="root">
      <aside className='sideBar'>
        <h1 className="logo">
          <span className="part1">Dash</span><span className="part2">Stack</span>
        </h1>
        <div className="parent">
          <ul className='links'>
            <li>
              <Link to="/dashboard"><CiClock1 className='clock' style={{fill:'#202224',fontWeight:"500",fontSize:"22px"}}/> Dashboard</Link>
            </li>
            <li className='active'>
            <Link to="/dashboard"><PiGridFour className='grid-icon' style={{fill:'#fff',fontWeight:"500",fontSize:"22px"}} /> Products</Link>
            </li>
          </ul>
          <div className='logout-btn'>
            <button onClick={confirmLogout}>
            <GiPowerButton className='powerIcon'/>Logout
            </button>
          </div>
        </div>
      </aside>
      <div className="content">
        <NavBar/>
        <Outlet/>
      </div>
      {showModal && (
        <div className="modal-overlay">
          <div className="modal"> 
            <p>Are you sure you want to logout?</p>
            <div className="modal-buttons">
              <button className="yes-btn" onClick={logout}>Yes</button>
              <button className='no-btn' onClick={() => setShowModal(false)}>No</button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default Root;
