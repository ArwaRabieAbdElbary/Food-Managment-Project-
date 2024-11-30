import { useEffect, useState } from 'react'
import './App.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import AuthLayout from './assets/modules/shared/components/AuthLayout/AuthLayout'
import Login from './assets/modules/authentication/components/login/Login'
import Register from './assets/modules/authentication/components/register/Register'
import ForgetPass from './assets/modules/authentication/components/forgetPassword/ForgetPass'
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
import { jwtDecode } from 'jwt-decode'
import ProtectedComponent from './assets/modules/shared/components/ProtectedComponent/ProtectedComponent'
import RecipeForm from './assets/modules/recipes/components/RecipeForm/RecipeForm'
import Verify from './assets/modules/authentication/components/register/Verify'
import FavoritesList from './assets/modules/Favorites/FavoritesList'
import AdminProtectedComponent from './assets/modules/shared/components/ProtectedComponent/AdminProtectedComponent'
import UserProtectedComponent from './assets/modules/shared/components/ProtectedComponent/UserProtectedComponent'




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
        {path:'verify',element:<Verify />},
        {path:'forget-password',element:<ForgetPass />},
        {path:'change-password',element:<ChangePass />},
        {path:'reset-password',element:<Resetpass />},
      ]
    },
    {
      path: 'dashboard',
      element:(
        <ProtectedComponent >
          <MasterLayout />
        </ProtectedComponent>
      ) ,
      errorElement: <NotFound />,
      children:[
        {index:true,element:<Dashboard  />},
        {path:'recipes',element:<RecipesList />},
        {path:'recipes/recipe-form',element:<AdminProtectedComponent><RecipeForm /></AdminProtectedComponent>},
        {path:'recipes/:recipeId',element:<AdminProtectedComponent><RecipeForm /></AdminProtectedComponent>},
        {path:'recipe-data',element:<RecipeData />},
        {path:'favorites',element:<UserProtectedComponent><FavoritesList /></UserProtectedComponent>},
        {path:'categories',element:<AdminProtectedComponent><CategoriesList /></AdminProtectedComponent>},
        {path:'category-data',element:<AdminProtectedComponent><CategoriesData /></AdminProtectedComponent>},
        {path:'users',element:<AdminProtectedComponent><UsersList /></AdminProtectedComponent>},
      ]

    }

  ])


  return (
    <div>
      <ToastContainer position="top-center" autoClose={3000}/>
      <RouterProvider router={routes}></RouterProvider>
    </div>

  );
}

export default App
