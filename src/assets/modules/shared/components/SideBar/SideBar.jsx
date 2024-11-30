import React, { useContext, useState } from 'react'
import { Sidebar, Menu, MenuItem } from 'react-pro-sidebar';
import { Link } from 'react-router-dom';
import side from '../../../../images/side.png'
import Modal from 'react-bootstrap/Modal';
import { useForm } from 'react-hook-form';
import logo from '../../../../images/logo.png'
import axios from 'axios';
import { toast } from 'react-toastify';
import { AuthContext } from '../../../../context/AuthContext';

const SideBar = () => {
  let{loginData} = useContext(AuthContext)
  const [activeMenuItem, setActiveMenuItem] = useState(null);
  const [passwordVisibleOne ,setpasswordVisibleOne] =useState(false)
  const [passwordVisibleTwo ,setPasswordVisibleTwo] =useState(false)
  const [passwordVisibleThree ,setPasswordVisibleThree] =useState(false)

  let{
    register,
    formState:{errors},
    handleSubmit,
  }=useForm()


  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const[isCollapsed , setIsCollapsed] = useState(false)

  const onSubmit = async (data) =>{
    try {
      let response = await axios.put("https://upskilling-egypt.com:3006/api/v1/Users/ChangePassword" , data,
        {
          headers:{Authorization:localStorage.getItem("token")}
        }
      )
      console.log(response)
      handleClose()
      toast.success('Password Changed Successfully')
    } catch (error) {
      toast.error(error.response?.data?.message)
      
    }
  };
  
 
 
  let toggleCollapse = () =>{
    setIsCollapsed(!isCollapsed)
  }
  
  const handleMenuItemClick = (itemName) => {
    setActiveMenuItem(itemName);
  };
  return (
    <div className='sideBar-container'>
    <Sidebar className='vh-100' collapsed={isCollapsed}>
      <Menu>
        <MenuItem className='my-5 sideBar-img' icon={<img src={side}/>} onClick={toggleCollapse}></MenuItem>
        <MenuItem component={<Link to="/dashboard" />} icon={ <i className='fa fa-home mx-2'></i>}
        onClick={() => handleMenuItemClick('home')}
        className={activeMenuItem === 'home' ? 'active-menu-item' : ''}
        > Home </MenuItem>
        {loginData?.userGroup != "SystemUser" ?  (
        <MenuItem component={<Link to="/dashboard/users" />} 
        icon={ <i className="fa-solid fa-user-group mx-2"></i>}
        onClick={() => handleMenuItemClick('users')}
        className={activeMenuItem === 'users' ? 'active-menu-item' : ''}
        > Users </MenuItem>
        ) : (
          " "
        ) }
        <MenuItem component={<Link to="/dashboard/recipes" />} 
        icon={<i className="fa-brands fa-medium mx-2"></i>}
        onClick={() => handleMenuItemClick('recipes')}
        className={activeMenuItem === 'recipes' ? 'active-menu-item' : ''}
        >  Recipes </MenuItem>
        {loginData?.userGroup != "SystemUser" ?  (
          <MenuItem component={<Link to="/dashboard/categories" />} 
          icon={<i className="fa-regular fa-calendar-days mx-2"></i>}
          onClick={() => handleMenuItemClick('categories')}
          className={activeMenuItem === 'categories' ? 'active-menu-item' : ''}
           > Categories </MenuItem>
        ):(
          ""
        )}
        {loginData?.userGroup == "SystemUser" ? (
        <MenuItem component={<Link to="/dashboard/favorites" />} 
        icon={<i class="fa-regular fa-heart"></i>}
        onClick={() => handleMenuItemClick('favorites')}
        className={activeMenuItem === 'favorites' ? 'active-menu-item' : ''}
        > Favorites</MenuItem>
        ):(
          ""
        )}

        <MenuItem 
        icon={<i className="fa-solid fa-lock-open mx-2"></i>}
        className={activeMenuItem === 'change-password' ? 'active-menu-item' : ''}
        onClick={() => {
          handleMenuItemClick('change-password'); // تحديث العنصر النشط
          handleShow(); // فتح المودال
        }}> 
        Change Password
         </MenuItem>
        <MenuItem component={<Link to="/login" />} 
        icon={ <i className="fa-solid fa-right-from-bracket mx-2"></i>}
        onClick={() => handleMenuItemClick('logout')}
        className={activeMenuItem === 'logout' ? 'active-menu-item' : ''}> 
        Logout 
        </MenuItem>
      </Menu>

      <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
      </Modal.Header>
      <Modal.Body>
      <div className='row d-flex justify-content-center align-items-center p-1'>
        <div className='bg-white rounded rounded-2 px-5'>
        
        <div className=''>
          <div className='logo-container text-center'>
              <img src={logo} className='w-100' />
          </div>
          <div className='titles my-4'>
              <h3>Change Your Password</h3>
              <span className='text-muted'>Enter your details below</span>
          </div>
        </div>
        <form onSubmit={handleSubmit(onSubmit)}>
        <div className="input-group mb-3">
        <span className="input-group-text" id="basic-addon1">
          <i className="fa-solid fa-lock text-muted"></i>
        </span>
        <input type={passwordVisibleOne? "text" : "password" }
          className="form-control"
          placeholder="old Password"
          aria-label="password"
          aria-describedby="basic-addon1" 
          {...register('oldPassword',{
            required: 'Please enter old Password'
          })}
          />
          <button type='button'
          onMouseDown={(e) => e.preventDefault()}
          onMouseUp={(e) => e.preventDefault()}
          onClick={()=> (setpasswordVisibleOne(!passwordVisibleOne))}
          className="input-group-text eye-btn"
            id="basic-addon1">
            {passwordVisibleOne?<i className='fa-solid fa-eye-slash text-muted'></i> :
              <i className='fa-solid fa-eye text-muted'></i>}
          </button>
        </div>
        {errors.oldPassword&&<span className="text-danger">{errors.oldPassword.message}</span>}
        <div className="input-group mb-3">
        <span className="input-group-text" id="basic-addon1">
          <i className="fa-solid fa-lock text-muted"></i>
        </span>
        <input type={passwordVisibleTwo? "text" : "password" }
          className="form-control"
          placeholder="new Password"
          aria-label="password"
          aria-describedby="basic-addon1" 
          {...register('newPassword',{
            required: 'Please enter new Password',
             pattern: {
              value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/,
              message:
                'At least 6 characters: UPPER/lowercase, numbers and special characters',
            },
          })}
          />
          <button type='button'
          onMouseDown={(e) => e.preventDefault()}
          onMouseUp={(e) => e.preventDefault()}
          onClick={()=> (setPasswordVisibleTwo(!passwordVisibleTwo))}
          className="input-group-text eye-btn"
            id="basic-addon1">
            {passwordVisibleTwo?<i className='fa-solid fa-eye-slash text-muted'></i> :
              <i className='fa-solid fa-eye text-muted'></i>}
          </button>
        </div>
        {errors.newPassword&&<span className="text-danger">{errors.newPassword.message}</span>}
        <div className="input-group mb-3">
        <span className="input-group-text" id="basic-addon1">
          <i className="fa-solid fa-lock text-muted"></i>
        </span>
        <input type={passwordVisibleThree? "text" : "password" }
          className="form-control"
          placeholder="confirm New Password"
          aria-label="password"
          aria-describedby="basic-addon1" 
          {...register('confirmNewPassword',{
            required: 'Please confirm New Password'
          })}
          />
          <button type='button'
          onMouseDown={(e) => e.preventDefault()}
          onMouseUp={(e) => e.preventDefault()}
          onClick={()=> (setPasswordVisibleThree(!passwordVisibleThree))}
          className="input-group-text eye-btn"
            id="basic-addon1">
            {passwordVisibleThree?<i className='fa-solid fa-eye-slash text-muted'></i> :
              <i className='fa-solid fa-eye text-muted'></i>}
          </button>
        </div>
        {errors.confirmNewPassword&&<span className="text-danger">{errors.confirmNewPassword.message}</span>}

        <button className='btn btn-success w-100 my-4'>
        Change Password</button>
      </form>


      </div>
       </div>


      
      
      
      
      </Modal.Body>

    </Modal>
   </Sidebar>
    
    
    
    </div>


  )
}

export default SideBar

