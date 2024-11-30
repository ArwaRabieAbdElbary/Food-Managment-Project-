import React from 'react'
import noDATA from '../../../../../assets/images/confirmdelete.svg'
const NoData = () => {
  return (
    <div className='text-center mt-5'>
      <img src={noDATA} />
      <h3>No Data !</h3>
      <p className='text-muted'>are you sure you want to delete this item ? if you are sure just click on delete it</p>
       
    
    </div>
  )
}

export default NoData