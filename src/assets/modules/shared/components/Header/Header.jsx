import React from 'react'
import headerImg from '../../../../images/Header.png'

const Header = ({title , description,first}) => {
  return (
    <div className='header-container d-flex justify-content-between align-items-center mt-3 px-5 text-white'>
      <div className='header-caption'>
         <h3><span className='fw-bold'>{first}</span>{title}!</h3>
         <p>{description}</p>
      </div>
      <div className='header-img'>
         <img src={headerImg} className=''/>
      </div>
    
    </div>
  )
}

export default Header