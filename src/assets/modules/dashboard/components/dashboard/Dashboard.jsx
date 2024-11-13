import React from 'react'
import Header from '../../../shared/components/Header/Header'

const Dashboard = ({loginData}) => {
  return (
    <div>
      <Header first={"welcome"}
      title={`  ${loginData?.userName}`}
       description={"This is a welcoming screen for the entry of the application , you can now see the options"}
        />
      <div>Dashboard</div>
    </div>

  )
}

export default Dashboard