import React from 'react'
import { Navigate } from 'react-router-dom'

const ProtectedComponent = ({loginData , children}) => {
    if(localStorage.getItem('token') || loginData) return children
    else return <Navigate to="/login" />

}

export default ProtectedComponent

