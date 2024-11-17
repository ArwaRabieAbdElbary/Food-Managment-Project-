import React from 'react'
import headerMan from '../../../../images/header-boy.png'
import headerGirl from '../../../../images/Header-girl.png'
import { useLocation } from 'react-router-dom'

const Header = ({title , description,first}) => {
  const location = useLocation();
  return (
    <div className='header-container row d-flex  align-items-center mt-3 px-5 text-white mx-1'>
      <div className='header-caption col-md-6'>
         <h3><span className='fw-bold'>{first}</span>{title}!</h3>
         <p>{description}</p>
      </div>
      <div className='header-img col-md-6 text-end'>
         <img 
         className='img-fluid'
         src={location.pathname === "/dashboard" ? headerGirl : headerMan} alt='' />
      </div>
    
    </div>
  )
}

export default Header