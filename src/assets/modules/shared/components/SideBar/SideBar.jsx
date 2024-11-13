import React, { useState } from 'react'
import { Sidebar, Menu, MenuItem } from 'react-pro-sidebar';
import { Link } from 'react-router-dom';
import side from '../../../../images/side.png'

const SideBar = () => {
  const[isCollapsed , setIsCollapsed] = useState(false)
  
  let toggleCollapse = () =>{
    setIsCollapsed(!isCollapsed)
  }
  return (
    <div className='sideBar-container'>
    <Sidebar className='vh-100' collapsed={isCollapsed}>
      <Menu>
        <MenuItem className='my-5 sideBar-img' icon={<img src={side}/>} onClick={toggleCollapse}></MenuItem>
        <MenuItem component={<Link to="/dashboard" />} icon={ <i className='fa fa-home mx-2'></i>}> Home </MenuItem>
        <MenuItem component={<Link to="/dashboard/users" />} icon={ <i className="fa-solid fa-user-group mx-2"></i>}> Users </MenuItem>
        <MenuItem component={<Link to="/dashboard/recipes" />} icon={<i className="fa-brands fa-medium mx-2"></i>}>  Recipes </MenuItem>
        <MenuItem component={<Link to="/dashboard/categories" />} icon={<i className="fa-regular fa-calendar-days mx-2"></i>} > Categories </MenuItem>
        <MenuItem component={<Link to="/" />} icon={<i className="fa-solid fa-lock-open mx-2"></i>}> Change Password </MenuItem>
        <MenuItem component={<Link to="/login" />} icon={ <i className="fa-solid fa-right-from-bracket mx-2"></i>}> Logout </MenuItem>
      </Menu>
   </Sidebar>
    
    
    
    </div>


  )
}

export default SideBar