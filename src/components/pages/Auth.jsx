import React from 'react'
import { Outlet } from 'react-router-dom'
import "./Auth.css"
const Auth = () => {
  return (
    <div className='auth'>
        <Outlet/>
    </div>
  )
}

export default Auth