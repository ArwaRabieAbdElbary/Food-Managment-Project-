import React, { useContext } from 'react'
import Header from '../../../shared/components/Header/Header'
import { Link } from 'react-router-dom'
import { AuthContext } from '../../../../context/AuthContext'

const Dashboard = () => {
  let{loginData} = useContext(AuthContext)
  return (
    <div>
      <Header first={"welcome "}
      title={loginData?.userName}
       description={"This is a welcoming screen for the entry of the application , you can now see the options"}
        />
        <div className='fill-recipe row'>
        <div className='fill-content col-md-6'>
        <h3>{loginData?.userGroup !== "SystemUser" ? "Fill":"Show"} the <span>Recipes</span>!</h3>
        <p>you can now fill the meals easily using the table and form , 
        click here and sill it with the table !</p>
        </div>
        <div className='fill-btn col-md-6 text-end'>
        <Link to="/dashboard/recipes" className='btn btn-success'>All Recipes
        <svg width="18" height="15" viewBox="0 0 18 15" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M17.9927 7.70752C17.9927 8.01676 17.8783 8.28271 17.6494 8.50537L11.5542 14.5913C11.4367 14.7088 11.313 14.7954 11.1831 14.8511C11.0532 14.9067 10.9202 14.9346 10.7842 14.9346C10.4749 14.9346 10.2214 14.8356 10.0234 14.6377C9.82552 14.446 9.72656 14.2048 9.72656 13.9141C9.72656 13.7656 9.75749 13.6265 9.81934 13.4966C9.875 13.3667 9.95231 13.2523 10.0513 13.1533L12.1294 11.0566L15.5156 7.94873L15.8867 8.58887L12.6118 8.78369H1.46045C1.13883 8.78369 0.879069 8.68473 0.681152 8.48682C0.477051 8.2889 0.375 8.02913 0.375 7.70752C0.375 7.39209 0.477051 7.13542 0.681152 6.9375C0.879069 6.73958 1.13883 6.64063 1.46045 6.64063L12.6118 6.64062L15.8867 6.83545L15.5156 7.46631L12.1294 4.36768L10.0513 2.271C9.95231 2.17204 9.875 2.05762 9.81934 1.92773C9.75749 1.79785 9.72656 1.65869 9.72656 1.51025C9.72656 1.21956 9.82552 0.978353 10.0234 0.786621C10.2214 0.588704 10.4749 0.489746 10.7842 0.489746C11.0625 0.489746 11.3161 0.601074 11.5449 0.82373L17.6494 6.91895C17.8783 7.13542 17.9927 7.39827 17.9927 7.70752Z" fill="white"/>
            </svg>
        </Link>
        </div>
        </div>
    </div>

  )
}

export default Dashboard