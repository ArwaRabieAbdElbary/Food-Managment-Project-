import React from 'react'
import logo from '../../../../images/logo.png'
import { useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import axios from 'axios'
import { toast } from 'react-toastify';


const ForgetPass = () => {
  let navigate = useNavigate()

  let{
    register,
    formState:{errors},
    handleSubmit,
  }=useForm()

  const onSubmit = async (data) =>{
    try {
      let response = await axios.post("https://upskilling-egypt.com:3006/api/v1/Users/Reset/Request" , data)
      console.log(response)
      navigate('/reset-pass')
      toast.success('Please check your email')
    
    } catch (error) {
      toast.error(error.response.data.message) 
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
                    <h3>Forgot Your Password?</h3>
                    <span className='text-muted'>No worries! Please enter your email and we will send a password reset link </span>
                 </div>
                 <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="input-group mb-3">
                      <span className="input-group-text" id="basic-addon1">
                        <i className='fa fa-envelope text-muted'></i>
                      </span>
                      <input type="text"
                        className="form-control"
                        placeholder="Enter your email"
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
                    
                    <button className='btn btn-success w-100 my-5'>Submit</button>
                 
                 </form>
                 
              </div>
          
          </div>
       </div>
    </div>
    </div>
  )
}

export default ForgetPass