import React, { useContext } from 'react'
import { AuthContext } from '../../../../context/AuthContext'
import { Navigate } from 'react-router-dom'

const AdminProtectedComponent = ({children}) => {
    let {loginData} =useContext(AuthContext)
    if(localStorage.getItem("token") && loginData?.userGroup == "SuperAdmin"){
        return children
    
    }else if(localStorage.getItem("token") && loginData?.userGroup == "SystemUser"){
        return <Navigate to="/login" />


    }
}

export default AdminProtectedComponent

