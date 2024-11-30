import React, { useEffect, useState } from 'react'
import Header from '../../../shared/components/Header/Header'
import axios from 'axios'
import noData from '../../../../images/confirmdelete.svg'
import NoData from '../../../shared/components/NoData/NoData';
import { Link } from 'react-router-dom';
import DeleteConfirmation from '../../../shared/components/DeleteConfirmation/DeleteConfirmation';
import { toast } from 'react-toastify';

const UsersList = () => {
  const[noOfPages , setNoOfPages] = useState([])
  const[selecteId,setSelectedId] = useState(0)
  const [show, setShow] = useState(false);
  const handleShow = (id) => {
    setShow(true);
    setSelectedId(id)
  }
  const handleClose = () => setShow(false);

  let deleteUser = async () =>{
    try {
      const response =await axios.delete(`https://upskilling-egypt.com:3006/api/v1/Users/${selecteId}`,
        {
          headers:{Authorization:localStorage.getItem('token')}
        }
      )
      console.log(response?.data?.data)
      toast.success("User deleted successfully")
      handleClose()
      getUserItems()
      
    } catch (error) {
      console.log(error)

    }
  }


  const[userItems , setUserItems] = useState([])

  let getUserItems= async(pageNo,pageSize,name) =>{
    try {
      const response =await axios.get("https://upskilling-egypt.com:3006/api/v1/Users/",
        {
          params: {userName:name , pageNumber:pageNo , pageSize:pageSize},
          headers:{Authorization:localStorage.getItem('token')}
        }
      )
      console.log(response?.data?.data)
      setUserItems(response?.data?.data)
      setNoOfPages(Array(response?.data?.totalNumberOfPages).fill().map((_,i) => i+1))

      
    } catch (error) {
      console.log(error)

    }
  }
  let getNameValue = async(e) => {
    getUserItems(1,50,e.target.value)

  }
  useEffect(() =>{
    getUserItems(1,50);

  },[]);



  return (
    <div>
      <Header first={"Users"}
      title={"  List"} 
      description={"You can now add your items that any user can order it from the Application and you can edit"} />

      <div className="my-4">
            <h3>Users Table Details</h3>
            <p className=''>You can check all details</p>
     </div>
     
     <DeleteConfirmation deleteItem={"user"} deleteFun={deleteUser}
     show={show} handleClose={handleClose} />

     <div className='row mb-4'>
     <div className='col-md-6'>
       <input type='text' 
       className='form-control' 
       placeholder='Search Here'
       onChange={getNameValue}
       />
     </div>
     </div>

     <div className='table'>
     <table className="table">
     <thead>
       <tr className='row-table'>
         <th scope='col'>Name</th>
         <th scope="col">Image</th>
         <th scope="col">Country</th>
         <th scope="col">phone Number</th>
         <th scope="col">Email</th>
         <th scope="col"></th>
       </tr>
     </thead>
     <tbody>
     {userItems.length > 0 ?( userItems.map(item =>
       <tr key={item.id}>
         <td>{item.userName}</td>
         <td>
         {item.imagePath ?(
           <img src={`https://upskilling-egypt.com:3006/${item.imagePath}`} className='recipe-img' />
         ):(
           <img src={noData} className='recipe-img' />

         )}
         </td>
         <td>{item.country}</td>
         <td>{item.phoneNumber}</td>
         <td>{item.email}</td>
         <td>
         <div className="dropdown">       
         <i 
           className="fa-solid fa-ellipsis text-center" 
           type="button" 
           data-bs-toggle="dropdown" 
           aria-expanded="false">
         </i>
       
         <ul className="dropdown-menu">
           <li className="dropdown-item">
             <i className="fa-solid fa-eye text-success"></i> View
           </li>
           <li 
             className="dropdown-item" 
             onClick={() => handleShow(item.id)}>
             <i className="fa fa-trash mx-1 text-success"></i> Delete
           </li>
         </ul>
       </div>
       
         </td>


       </tr>
    
     )) : (
      <tr>
      <td colSpan="6">
          <div className="noData">
            <img src={noData} alt="No data" />
            <h3>No Data!</h3>
          </div>
      </td>
    </tr>
     )
   }     
     </tbody>
   </table>
     </div>

    {userItems.length > 0 ? (
   <nav aria-label="Page navigation example">
   <ul className="pagination justify-content-center">
    <li className="page-item disabled">
      <a className="page-link">Previous</a>
    </li>
    {noOfPages.map((pageNo) => (
      <li
        className="page-item"
        key={pageNo}
        onClick={() => getUserItems(pageNo, 50)}
      >
        <a className="page-link" href="#">
          {pageNo}
        </a>
      </li>
    ))}

    <li className="page-item">
      <a className="page-link" href="#">Next</a>
    </li>
  </ul>
   </nav>

  ):(
    ""
  )
}




     
     
     

    
  </div>

  )
}

export default UsersList