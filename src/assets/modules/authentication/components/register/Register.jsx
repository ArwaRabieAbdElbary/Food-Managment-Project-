import React, { useState } from 'react'
import logo from '../../../../images/logo.png'
import { Link, useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import axios from 'axios'
import { toast } from 'react-toastify';

const Register = () => {
  const [passwordVisibleOne ,setpasswordVisibleOne] =useState(false)
  const [passwordVisibleTwo ,setPasswordVisibleTwo] =useState(false)

  let{
    register,
    formState:{errors},
    watch,
    handleSubmit,
  }=useForm()

  let navigate = useNavigate()
  let password = watch("password");

  const onSubmit = async (data) =>{
    try {
      let response = await axios.post("https://upskilling-egypt.com:3006/api/v1/Users/Register" , data)
      navigate('/verify') 
      toast.success('Register done successfully')
    } catch (error) {
      toast.error(error.response?.data?.message)
      
    }
  };

  return (
    <div className='auth-container register-form'>
    <div className='container-fluid bg-overlay'>
       <div className='row vh-100 justify-content-center align-items-center p-3'>
          <div className='col-md-7 bg-white rounded rounded-2 px-5 py-3'>
              <div className=''>
                 <div className='logo-container text-center'>
                    <img src={logo} className='w-50' />
                 </div>
                 <div className='titles my-4'>
                    <h3>Register</h3>
                    <span className='text-muted'>Welcome Back!Please enter your details</span>
                 </div>
                 <form onSubmit={handleSubmit(onSubmit)}>
                    <div className='row'>
                        <div className='col-md-6'>
                          
                          <div className="input-group mb-3">
                          <span className="input-group-text" id="basic-addon1">
                             <i class="fa-solid fa-mobile-screen text-muted"></i>
                          </span>
                          <input type="text"
                            className="form-control"
                            placeholder="UserName"
                            aria-label="name"
                            aria-describedby="basic-addon1" 
                            {...register('userName',{
                              required: 'Please enter your name',
                            })}
                            />
                          </div>
                          {errors.userName&&<span className="text-danger">{errors.userName.message}</span>}
                          <div className="input-group mb-3">
                          <span className="input-group-text" id="basic-addon1">
                          <i class="fa-solid fa-lock text-muted"></i>
                          </span>
                          <input type="text"
                            className="form-control"
                            placeholder="Country"
                            aria-label="country"
                            aria-describedby="basic-addon1" 
                            {...register('country',{
                              required: 'Please enter country'
                            })}
                            />
                          </div>
                          {errors.country&&<span className="text-danger">{errors.country.message}</span>}
                          <div className="input-group mb-3">
                          <span className="input-group-text" id="basic-addon1">
                            <i class="fa-solid fa-lock text-muted"></i>
                          </span>
                          <input type={passwordVisibleOne? "text" : "password" }
                            className="form-control"
                            placeholder="Password"
                            aria-label="password"
                            aria-describedby="basic-addon1" 
                            {...register('password',{
                              required: 'Please enter password'
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
                          {errors.password&&<span className="text-danger">{errors.password.message}</span>}
                          
                        </div>

                        <div className='col-md-6'>
                          
                          <div className="input-group mb-3">
                          <span className="input-group-text" id="basic-addon1">
                            <i class="fa-solid fa-mobile-screen text-muted"></i>
                          </span>
                          <input type="text"
                            className="form-control"
                            placeholder="Enter your E-mail"
                            aria-label="email"
                            aria-describedby="basic-addon1" 
                            {...register('email',{
                              required: 'Please enter Email',
                              pattern :{
                                value:/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                                message:"email is not vaild"
                              },
                            })}
                            />
                          </div>
                          {errors.email&&<span className="text-danger">{errors.email.message}</span>}
                          <div className="input-group mb-3">
                          <span className="input-group-text" id="basic-addon1">
                            <i class="fa-solid fa-mobile-screen text-muted"></i>
                          </span>
                          <input type="text"
                            className="form-control"
                            placeholder="PhoneNumber"
                            aria-label="phoneNumber"
                            aria-describedby="basic-addon1" 
                            {...register('phoneNumber',{
                              required: 'Please enter phone Number'
                            })}
                            />
                          </div>
                          {errors.phoneNumber&&<span className="text-danger">{errors.phoneNumber.message}</span>}
                          <div className="input-group mb-3">
                          <span className="input-group-text" id="basic-addon1">
                             <i class="fa-solid fa-mobile-screen text-muted"></i>
                          </span>
                          <input type={passwordVisibleTwo? "text" : "password" }
                            className="form-control"
                            placeholder="confirm-password"
                            aria-label="confirmPassword"
                            aria-describedby="basic-addon1" 
                            {...register('confirmPassword',{
                              required: 'Please enter confirm Password',
                              validate: (value) =>
                                value === password || "Passwords do not match",
                            })}
                            />
                            <button type='button'
                            onMouseDown={(e) => e.preventDefault()}
                            onMouseUp={(e) => e.preventDefault()}
                            onClick={()=>( setPasswordVisibleTwo(!passwordVisibleTwo))}
                             className="input-group-text eye-btn"
                              id="basic-addon1">
                              {passwordVisibleTwo?<i className='fa-solid fa-eye-slash text-muted'></i> :
                                <i className='fa-solid fa-eye text-muted'></i>}
                            </button>
                          </div>
                          {errors.confirmPassword&&<span className="text-danger">{errors.confirmPassword.message}</span>}
                        
                      </div>
                    </div>


                 
                     <div className='text-end'>        
                      <Link to='/login' className='text-decoration-none text-success'>Login Now?</Link>
                    </div>
                    <div className='text-center'>
                    <button className='btn btn-success w-75 my-4'>
                    Register</button>
                    </div>

                 
                 </form>
                 
              </div>
          
          </div>
       </div>
    </div>
    </div>
  )
}

export default Register