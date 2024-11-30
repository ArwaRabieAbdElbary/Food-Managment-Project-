import React, { useEffect, useState } from 'react'
import Header from '../../../shared/components/Header/Header'
import axios from 'axios'
import { toast } from 'react-toastify';
import DeleteConfirmation from '../../../shared/components/DeleteConfirmation/DeleteConfirmation';
import NoData from '../../../shared/components/NoData/NoData';
import Modal from 'react-bootstrap/Modal';
import { useForm } from 'react-hook-form';
import noData from '../../../../images/confirmdelete.svg'


const CategoriesList = () => {
  let{
    register,
    reset,
    formState:{errors , isSubmitting},
    handleSubmit,
    setValue
  }=useForm()


  const [noOfPages , setNoOfPages] = useState([])
  const [showEdit, setShowEdit] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null); 


  const handleCloseEdit = () => setShowEdit(false);
  const handleShowEdit = (category) =>{
    setShowEdit(true);
    setSelectedCategory(category);
    setValue("name", category.name);
  } 
  
  
  const onSubmitEdit = async (data) => {
    try {
           let response= await axios.put(`https://upskilling-egypt.com:3006/api/v1/Category/${selectedCategory.id}`, data, {
                headers: { Authorization: localStorage.getItem("token") },
            });
            toast.success("Category updated successfully");
            reset()
            handleCloseEdit()
            getCategoryItems(); 
        
    } catch (error) {
        console.error(error);
        toast.error(response?.data?.data||"Error updating category");
    }
};


  const[selecteId,setSelectedId] = useState(0)
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);

  
  const handleShow = (id) => {
    setShow(true)
    setSelectedId(id);
  }

  const [showAdd, setShowAdd] = useState(false);

  const handleCloseAdd = () => setShowAdd(false);
  const handleShowAdd = () => setShowAdd(true);

  let onSubmitAdd = async(data) =>{
    try {
      let response =await axios.post("https://upskilling-egypt.com:3006/api/v1/Category/" , data,
        {
          headers:{Authorization:localStorage.getItem("token")}
        }
      );
      console.log(response?.data)
      toast.success("Successfully added category")
      reset()
      handleCloseAdd()
      getCategoryItems()
    
    } catch (error) {
      console.error(error);
    }
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
  let getCategoryItems= async ( pageNo , pageSize , name ) => {
    try {
      const response =await axios.get("https://upskilling-egypt.com:3006/api/v1/Category/",
        {
          params:{ name:name , pageSize:pageSize , pageNumber:pageNo },
          headers:{Authorization:localStorage.getItem("token")}
        }
      )
      console.log(response.data);
      setCategoryItems(response?.data?.data)
      setNoOfPages(Array(response?.data?.totalNumberOfPages).fill().map((_,i) => i+1))
      
    } catch (error) {
      console.log(error)
    }
  }
  let getNameValue = async(e) => {
    getCategoryItems(1,5,e.target.value)
    console.log(e.target.value)

  }

  useEffect(()=>{
    getCategoryItems(1,8)
  },[])
  return (
    <div className='category-container'>
      <Header first={"Categories"}
      title={"  item"}
      description={"You can now add your items that any user can order it from the Application and you can edit"}
      />
      
      <div className=" d-flex justify-content-between my-4">
        <div>
            <h3>Categories Table Details</h3>
            <p className=''>You can check all details</p>
        </div>
        <div>
            <button className='btn btn-success' onClick={handleShowAdd}>Add New category</button>
        </div>
      </div>

      
        <Modal show={showAdd} onHide={handleCloseAdd}>
        <Modal.Header closeButton>
          <Modal.Title>Add Category</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form onSubmit={handleSubmit(onSubmitAdd)}>
            <div className="input-group mb-3">
              <input type="text"
                className="form-control"
                placeholder="Category Name"
                aria-label="name"
                aria-describedby="basic-addon1" 
                {...register('name',{
                  required: "please enter name", 
                })
              }
                />
                </div>
                {errors.name&&<span className="text-danger">{errors.name.message}</span>}
                <div className='text-end'>
                <button className='btn btn-success w-25 my-2'
                disabled={isSubmitting}
                >
                {isSubmitting? "Saving ..." : "Save"}
                </button>
                </div>
          </form>
        </Modal.Body>
        </Modal>

        <Modal show={showEdit} onHide={handleCloseEdit}>
        <Modal.Header closeButton>
          <Modal.Title>Update Category</Modal.Title>
        </Modal.Header>
        <Modal.Body>
    
        <form onSubmit={handleSubmit(onSubmitEdit)}>
          <div className="input-group mb-3">
            <input type="text"
              className="form-control"
              placeholder="Category Name"
              aria-label="name"
              aria-describedby="basic-addon1" 
              {...register('name',{
                required: "please enter name"
              })
            }
              />
              </div>
              {errors.name&&<span className="text-danger">{errors.name.message}</span>}

              <div className="text-end">
                <button className='btn btn-success w-25 my-2'
                type='submit'
                disabled={isSubmitting}
                >
                {isSubmitting? "Saving ..." : "Save"}
                </button>
              </div>
              

         </form>
              
        </Modal.Body>

        </Modal>


      <DeleteConfirmation deleteItem={"Categories"} deleteFun={deleteCategory}
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
              <th > Item Name</th>
              <th className='text-end' >Actions</th>
            </tr>
          </thead>
          <tbody>
          {CategoryItems.length > 0 ? (CategoryItems.map((category) =>
            <tr key={category.id} >
              <td>{category.name}</td>
              <td>
              <div className="dropdown text-end">       
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
                  className="dropdown-item" onClick={() => handleShowEdit(category)}>
                  <i className='fa fa-edit text-success'></i> Edit
                </li>
                <li className="dropdown-item" onClick={()=>handleShow(category.id)}>
                  <i className='fa fa-trash text-success' ></i> Delete
               </li>
              </ul>
              </div>
            
              </td>
            </tr>

          )): (
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

        {CategoryItems.length > 0?(
        <nav aria-label="Page navigation example">
        <ul className="pagination justify-content-center">
          <li className="page-item">
            <a className="page-link" href="#" aria-label="Previous">
              <span aria-hidden="true">&laquo;</span>
            </a>
          </li>
          {noOfPages.map((noPage) => (
              <li className="page-item" key={noPage} onClick={() => getCategoryItems(noPage , 8)}>
              <a className="page-link" href="#">
              {noPage}
              </a></li>
           ))}
        

          <li className="page-item">
            <a className="page-link" href="#" aria-label="Next">
              <span aria-hidden="true">&raquo;</span>
            </a>
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

export default CategoriesList