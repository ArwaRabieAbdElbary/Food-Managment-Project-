import React from 'react'
import avatar from '../../../../images/avatar.png'

const Navbar = ({loginData}) => {
  return (
    <div className='navbar-container d-flex justify-content-between align-items-center px-4'>
       <div className='navbar-search'>
           <input type='search' className="form-control" placeholder= 'Search Here' />
       </div>
       <div className='navbar-text'>
           <img src={avatar} className='navbar-img mx-2' />
           <span>{loginData?.userName}</span>
           <i className="fas fa-chevron-down mx-2"></i>
           <i className="fas fa-bell mx-3"></i>
       </div>

    </div>
  )
}

export default Navbar