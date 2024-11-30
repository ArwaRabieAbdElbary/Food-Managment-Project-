import React, { useContext } from 'react'
import { AuthContext } from '../../../../context/AuthContext'
import { Navigate } from 'react-router-dom'

const UserProtectedComponent = ({children}) => {
    let {loginData } =useContext(AuthContext)
    if(localStorage.getItem("token") && loginData?.userGroup == "SystemUser"){
        return children
    }
    else if(localStorage.getItem("token") && loginData?.userGroup == "SuperAdmin"){
        return <Navigate to="/dashboard" />
    }
}

export default UserProtectedComponent

