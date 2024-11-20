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




function App() {
  const[loginData , setLoginData] = useState(null)

  const saveLoginData =() => {
    const encodedToken = localStorage.getItem('token')
    const decodedToken = jwtDecode(encodedToken)
    setLoginData(decodedToken)
  }

  useEffect(() => {
    if (localStorage.getItem('token'))
      saveLoginData();
  }, [])
  
 
  const routes = createBrowserRouter([
    {
      path: '',
      element: <AuthLayout />,
      errorElement: <NotFound />,
      children:[
        {index:true,element:<Login saveLoginData={saveLoginData} />},
        {path:'login',element:<Login saveLoginData={saveLoginData} />},
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
        <ProtectedComponent loginData={loginData}>
            <MasterLayout loginData={loginData}/>
        </ProtectedComponent>
      ) ,
      errorElement: <NotFound />,
      children:[
        {index:true,element:<Dashboard loginData={loginData} />},
        {path:'recipes',element:<RecipesList />},
        {path:'recipes/recipe-form',element:<RecipeForm />},
        {path:'recipes/:recipeId',element:<RecipeForm />},
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
