import React, { useEffect, useState } from 'react'
import Header from '../../../shared/components/Header/Header'
import ItemDetails from '../../../shared/components/ItemDetails/ItemDetails'
import axios from 'axios'
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import confirmationLogo from '../../../../../assets/images/confirmdelete.svg'
import DeleteConfirmation from '../../../shared/components/DeleteConfirmation/DeleteConfirmation';

const RecipesList = () => {
  const[selecteId,setSelectedId] = useState(0)
  const [show, setShow] = useState(false);
  const handleShow = (id) => {
    setShow(true);
    setSelectedId(id)
  }
  const handleClose = () => setShow(false);

  let deleteReceipe= () => {
    handleClose();
    try {
      const response = axios.delete(`https://upskilling-egypt.com:3006/api/v1/Recipe/${selecteId}`,
        {
          headers:{Authorization:localStorage.getItem("token")}
        }
      )
      toast.success("item deleted successfully")
      
    } catch (error) {
      console.log(error);
      toast.error("Error deleting item")
      
    }

  }



  const[recipeItems , setRecipeItems] = useState([])
  let getrecipeItems= async() =>{
    try {
      const response =await axios.get("https://upskilling-egypt.com:3006/api/v1/Recipe/?pageSize=10&pageNumber=1",
        {
          headers:{Authorization:localStorage.getItem('token')}
        }
      )
      setRecipeItems(response.data.data)
      
    } catch (error) {
      console.log(error)

    }
  }
  useEffect(() =>{
    getrecipeItems();

  });
  return (
    <div>
       <Header first={"Recipes"}
       title={"  Items"}
       description={"You can now add your items that any user can order it from the Application and you can edit"}
        />
        <ItemDetails items={"Recipe"} item={"item"} />

        <DeleteConfirmation deleteItem={"Recipe"} deleteFun={deleteReceipe}
        show={show} handleClose={handleClose} />



        <div className='table'>
        <table className="table">
        <thead>
          <tr>
            <th scope='col'>Item Name</th>
            <th scope="col">Image</th>
            <th scope="col">Price</th>
            <th scope="col">Description</th>
            <th scope="col">Tag</th>
            <th scope="col">Category</th>
            <th scope="col">Actions</th>
          </tr>
        </thead>
        <tbody>
        {recipeItems.map(item =>
          <tr>
            <td>{item.name}</td>
            <td><img src={`https://upskilling-egypt.com:3006/${item.imagePath}`} className='w-25 h-25' /></td>
            <td>{item.price}</td>
            <td>{item.description}</td>
            <td>{item.tag.name}</td>
            <td>{item.category}</td>
            <td className='text-success'>
            <i className="fa-solid fa-eye"></i>
            <i className='fa fa-edit mx-3'></i>
            <i className='fa fa-trash' onClick={() =>handleShow(item.id)}></i>
         </td>
          </tr>
        )}

        
        </tbody>
      </table>
      </div>
       








    </div>


  )
}

export default RecipesList