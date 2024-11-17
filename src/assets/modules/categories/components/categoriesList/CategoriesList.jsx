import React, { useEffect, useState } from 'react'
import Header from '../../../shared/components/Header/Header'
import axios from 'axios'
import { toast } from 'react-toastify';
import DeleteConfirmation from '../../../shared/components/DeleteConfirmation/DeleteConfirmation';
import NoData from '../../../shared/components/NoData/NoData';
import Modal from 'react-bootstrap/Modal';
import { useForm } from 'react-hook-form';


const CategoriesList = () => {
  let{
    register,
    formState:{errors},
    handleSubmit,
    setValue
  }=useForm()


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
            handleCloseEdit()
            getCategoryItems(); 
        
    } catch (error) {
        console.error(error);
        toast.error("Error updating category");
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
      toast.success("Successfully added category")
      console.log(response.data.data);
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
  let getCategoryItems= async () => {
    try {
      const response =await axios.get("https://upskilling-egypt.com:3006/api/v1/Category/?pageSize=10&pageNumber=1",
        {
          headers:{Authorization:localStorage.getItem("token")}
        }
      )
      console.log(response.data);
      setCategoryItems(response.data.data)
      
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(()=>{
    getCategoryItems()
  },[])
  return (
    <div>
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
                  required: "please enter name"
                })
              }
                />
                </div>
                {errors.name&&<span className="text-danger">{errors.name.message}</span>}
                <div className='text-end'>
                <button className='btn btn-success w-25 my-2'
                >
                Save
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
                >
                Save
                </button>
              </div>
              

         </form>
              
        </Modal.Body>

        </Modal>


      <DeleteConfirmation deleteItem={"Categories"} deleteFun={deleteCategory}
      show={show} handleClose={handleClose} />

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
              <td className='text-success text-end'>
                 <i className="fa-solid fa-eye"></i>
                 <i className='fa fa-edit mx-3' onClick={() => handleShowEdit(category)} ></i>
                 <i className='fa fa-trash'  onClick={()=>handleShow(category.id)}></i>
              </td>
            </tr>

          )): (
            <NoData />
          )
        }
          </tbody>
        </table>
        </div>
    </div>
    
  )
}

export default CategoriesList