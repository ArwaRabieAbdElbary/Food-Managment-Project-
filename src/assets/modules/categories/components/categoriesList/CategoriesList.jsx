import React, { useEffect, useState } from 'react'
import Header from '../../../shared/components/Header/Header'
import axios from 'axios'
import { toast } from 'react-toastify';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import confirmationLogo from '../../../../../assets/images/confirmdelete.svg'
import ItemDetails from '../../../shared/components/ItemDetails/ItemDetails';
import DeleteConfirmation from '../../../shared/components/DeleteConfirmation/DeleteConfirmation';

const CategoriesList = () => {
  const[selecteId,setSelectedId] = useState(0)
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);

  
  const handleShow = (id) => {
    setShow(true)
    setSelectedId(id);
  }

  const deleteCategory = () =>{
    handleClose();
    try {
      const response = axios.delete(`https://upskilling-egypt.com:3006/api/v1/Category/${selecteId}`,
        {
          headers:{Authorization:localStorage.getItem("token")}
        }
      );
      getCategoryItems()
      toast.success("Category deleted successfully")
       
      
    } catch (error) {
      console.log(error);
      toast.error("Error deleting category")
    }
  }

  const[CategoryItems , setCategoryItems] = useState([])
  let getCategoryItems= async () => {
    try {
      const response =await axios.get("https://upskilling-egypt.com:3006/api/v1/Category/?pageSize=10&pageNumber=1",
        {
          headers:{Authorization:localStorage.getItem("token")}
        }
      )
      setCategoryItems(response.data.data)
      
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(()=>{
    getCategoryItems()
  }
  )
  return (
    <div>
      <Header first={"Categories"}
      title={"  item"}
      description={"You can now add your items that any user can order it from the Application and you can edit"}
      />
      <ItemDetails items={"Categories"} item={"Category"} />

      <DeleteConfirmation deleteItem={"Categories"} deleteFun={deleteCategory}
      show={show} handleClose={handleClose} />




        <div className='table'>
          <table class="table">
          <thead>
            <tr>
              <th >Name</th>
              <th >Creation Date</th>
              <th >Actions</th>
            </tr>
          </thead>
          <tbody>
          {CategoryItems.map(category =>
            <tr>
              <td>{category.name}</td>
              <td>{category.creationDate}</td>
              <td className='text-success'>
                 <i className="fa-solid fa-eye"></i>
                 <i className='fa fa-edit mx-3'></i>
                 <i className='fa fa-trash'  onClick={()=>handleShow(category.id)}></i>
              </td>
            </tr>

          )}
          </tbody>
        </table>
        </div>
    </div>
    
  )
}

export default CategoriesList