import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import AuthLayout from './assets/modules/shared/components/AuthLayout/AuthLayout'
import Login from './assets/modules/authentication/components/login/Login'
import Register from './assets/modules/authentication/components/register/Register'
import ForgetPass from './assets/modules/authentication/components/forgetPass/ForgetPass'
import ChangePass from './assets/modules/authentication/components/changePass/ChangePass'
import Resetpass from './assets/modules/authentication/components/resetPass/Resetpass'
import NotFound from './assets/modules/shared/components/NotFound/NotFound'
import MasterLayout from './assets/modules/shared/components/MasterLayout/MasterLayout'
import Dashboard from './assets/modules/dashboard/components/dashboard/Dashboard'
import RecipesList from './assets/modules/recipes/components/recipesList/RecipesList'
import RecipeData from './assets/modules/recipes/components/recipeData/RecipeData'
import CategoriesList from './assets/modules/categories/components/categoriesList/CategoriesList'
import CategoriesData from './assets/modules/categories/components/categoriesData/CategoriesData'
import UsersList from './assets/modules/users/components/usersList/UsersList'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  const routes = createBrowserRouter([
    {
      path: '',
      element: <AuthLayout />,
      errorElement: <NotFound />,
      children:[
        {index:true,element:<Login />},
        {path:'login',element:<Login />},
        {path:'register',element:<Register />},
        {path:'forget-pass',element:<ForgetPass />},
        {path:'change-pass',element:<ChangePass />},
        {path:'reset-pass',element:<Resetpass />},
      ]
    },
    {
      path: 'dashboard',
      element: <MasterLayout />,
      errorElement: <NotFound />,
      children:[
        {index:true,element:<Dashboard />},
        {path:'recipes',element:<RecipesList />},
        {path:'recipe-data',element:<RecipeData />},
        {path:'categories',element:<CategoriesList />},
        {path:'category-data',element:<CategoriesData />},
        {path:'users',element:<UsersList />},
      ]

    }

  ])


  return (
    <div>
      <ToastContainer position="top-center" />
      <RouterProvider router={routes}></RouterProvider>
    </div>

  );
}

export default App
