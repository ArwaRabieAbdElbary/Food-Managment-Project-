import React, { useContext } from 'react'
import { Navigate } from 'react-router-dom'
import { AuthContext } from '../../../../context/AuthContext'

const ProtectedComponent = ({children}) => {
    let {loginData} = useContext(AuthContext)
    if(localStorage.getItem('token') || loginData) return children
    else return <Navigate to="/login" />
}

export default ProtectedComponent

