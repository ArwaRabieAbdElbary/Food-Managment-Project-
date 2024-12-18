import React, { useContext, useState } from 'react'
import logo from '../../../../images/logo.png'
import { Link, useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import axios from 'axios'
import { toast } from 'react-toastify';
import { AuthContext } from '../../../../context/AuthContext'

const Login = () => {
  const[isVisible , setIsVisible]=useState("")
  let {saveLoginData} = useContext(AuthContext)
  let navigate = useNavigate()

  let{
    register,
    formState:{errors , isSubmitting},
    handleSubmit,
  }=useForm()

  const onSubmit = async (data) =>{
    try {
      let response = await axios.post("https://upskilling-egypt.com:3006/api/v1/Users/Login" , data)
      navigate('/dashboard')
      toast.success('Login Successfully')
      localStorage.setItem('token',response?.data?.token)
      saveLoginData()

    } catch (error) {
      toast.error(error.response?.data?.message)
      
    }
  };
  return (
    
    <div className='auth-container'>
    <div className='container-fluid bg-overlay'>
       <div className='row vh-100 justify-content-center align-items-center p-3'>
          <div className='col-lg-5 col-md-4 bg-white rounded rounded-2 px-5 py-3'>
              <div className=''>
                 <div className='logo-container text-center'>
                    <img src={logo} className='w-50' />
                 </div>
                 <div className='titles my-4'>
                    <h3>Log in</h3>
                    <span className='text-muted'>Welcome Back!Please enter your details</span>
                 </div>
                 <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="input-group mb-3">
                      <span className="input-group-text" id="basic-addon1">
                        <i className='fa fa-envelope text-muted'></i>
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
                    {errors.email&&<span className="text-danger error-span">{errors.email.message}</span>}

                    
                 
                    <div className="input-group mb-3">
                      <span className="input-group-text" id="basic-addon1">
                        <i className='fa fa-key text-muted'></i>
                      </span>
                      <input type={isVisible? 'text' :'password'}
                        className="form-control"
                        placeholder="Password"
                        aria-label="password"
                        aria-describedby="basic-addon1" 
                        {...register('password',{
                          required: 'Please enter password',
                        })}
                        />
                        <button type='button'
                        onMouseDown={(e) => e.preventDefault()}
                        onMouseUp={(e) => e.preventDefault()}
                        onClick={()=> (setIsVisible(!isVisible))}
                         className="input-group-text eye-btn"
                          id="basic-addon1">
                          {isVisible?<i className='fa-solid fa-eye-slash text-muted'></i> :
                            <i className='fa-solid fa-eye text-muted'></i>}
                        </button>
                    </div>
                    {errors.password&&<span className="text-danger error-span">{errors.password.message}</span>}
                    
                    
                    <div className='links d-flex justify-content-between'>
                      <Link to='/register' className='text-decoration-none text-black'>Register Now?</Link>
                      <Link to='/forget-password' className='text-decoration-none text-success'>Forgot Password?</Link>
                    </div>
                    <button disabled={isSubmitting} className='btn btn-success w-100 my-4'>
                    {isSubmitting? "Loading ..." : "Login"}
                    </button>
                 
                 </form>
                 
              </div>
          
          </div>
       </div>
    </div>
    </div>
  

  );
}

export default Login