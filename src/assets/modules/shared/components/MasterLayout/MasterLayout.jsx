import React from 'react'
import Navbar from '../Navbar/Navbar'
import Header from '../Header/Header'
import { Outlet } from 'react-router-dom'
import SideBar from '../SideBar/SideBar'


function MasterLayout() {
  return (
    <div className='d-flex'>
      <SideBar />
       <div className='w-100'>
           <div className='container-fluid'>
              <Navbar />
              <Outlet />
           </div>
       </div>
    </div>
  )
}

export default MasterLayout