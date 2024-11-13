import React from 'react'

const ItemDetails = ({items , item}) => {
  return (
    <div className=" d-flex justify-content-between my-4">
    <div>
        <h3>{items} Table Details</h3>
        <p className=''>You can check all details</p>
    </div>
    <div>
        <button className='btn btn-success'>Add New {item}</button>
    </div>
  </div>
    
  )
}

export default ItemDetails