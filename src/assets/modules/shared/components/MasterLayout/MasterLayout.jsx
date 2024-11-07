import React from 'react'
import Navbar from '../Navbar/Navbar'
import Header from '../Header/Header'
import { Outlet } from 'react-router-dom'

function MasterLayout() {
  return (
    <div className='d-flex'>
       <div className='w-25 bg-info'>SideBar</div>
       <div className='w-75 bg-success'>
          <Navbar />
          <Header />
          <Outlet />
       </div>
    
    </div>
  )
}

export default MasterLayout