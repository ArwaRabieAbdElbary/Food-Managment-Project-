import React, { useContext, useEffect, useState } from 'react'
import Header from '../../../shared/components/Header/Header'
import axios from 'axios'
import DeleteConfirmation from '../../../shared/components/DeleteConfirmation/DeleteConfirmation';
import NoData from '../../../shared/components/NoData/NoData';
import noData from '../../../../images/confirmdelete.svg'
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { AuthContext } from '../../../../context/AuthContext';

const RecipesList = () => {
  let {loginData} = useContext(AuthContext)
  const[nameValue,setNameValue] = useState("")
  const[tagValue,setTagValue] = useState("")
  const[catValue,setCatValue] = useState("")
  const[noOfPages , setNoOfPages] = useState([])
  const[selecteId,setSelectedId] = useState(0)
  const [show, setShow] = useState(false);
  const handleShow = (id) => {
    setShow(true);
    setSelectedId(id)
  }
  const handleClose = () => setShow(false);
 
  const[tags , setTags] = useState([])
  let getTags = async() =>{
    try {
      let response =await axios.get("https://upskilling-egypt.com:3006/api/v1/tag/" ,
        {
        headers:{Authorization:localStorage.getItem("token")}
      })
      setTags(response?.data)
      console.log(response?.data)
      
    } catch (error) {
      console.log(error)
    }}

   
   
    const[categories , setCategories] = useState([])
    let getCategories = async() =>{
      try {
        let response = await axios.get("https://upskilling-egypt.com:3006/api/v1/Category/?pageSize=5&pageNumber=1" ,
          {
          headers:{Authorization:localStorage.getItem("token")}
        })
        setCategories(response?.data?.data)
        
      } catch (error) {
        console.log(error)
      }
    }

  let deleteReceipe= () => {
    handleClose();
    try {
      const response = axios.delete(`https://upskilling-egypt.com:3006/api/v1/Recipe/${selecteId}`,
        {
          headers:{Authorization:localStorage.getItem("token")}
        }
      )
      toast.success("item deleted successfully")
      getrecipeItems()
      
    } catch (error) {
      console.log(error);
      toast.error(response?.data?.data||"Error deleting item")
      
    }
  }



  const[recipeItems , setRecipeItems] = useState([])
  let getrecipeItems= async(pageNo , pageSize , name , tag , category) =>{
    try {
      const response =await axios.get("https://upskilling-egypt.com:3006/api/v1/Recipe/",
        {
          params: {pageSize:pageSize , pageNumber:pageNo , name:name , tagId:tag , categoryId:category},
          headers:{Authorization:localStorage.getItem('token')}
        }
      )
      setRecipeItems(response.data.data)
      setNoOfPages(Array(response.data.totalNumberOfPages).fill().map((_,i)=> i+1))
      
    } catch (error) {
      console.log(error)

    }
  }

  let getNameValue =(e) => {
    getrecipeItems(1,3,e.target.value , tagValue , catValue)
    setNameValue(e.target.value)
  }
  let getTagValue =(e) => {
    getrecipeItems(1,3,nameValue,e.target.value,catValue)
    setTagValue(e.target.value)
  }
  let getCatValue =(e) => {
    getrecipeItems(1,3,nameValue,tagValue,e.target.value)
    setCatValue(e.target.value)
  }

  
  let addToFav =async (id) =>{
    try {
        let response = await axios.post("https://upskilling-egypt.com:3006/api/v1/userRecipe/" , { recipeId:id},
            {
                headers:{Authorization:localStorage.getItem("token")},
               
            })

            toast.success("added successfully")
        
    } catch (error) {
        console.error(error)
    }
}



  useEffect(() =>{
    getrecipeItems(1,3);
    getTags()
    getCategories()

  },[]);
  return (
    <div className='recipes-container'>
       <Header first={"Recipes"}
       title={"  Items"}
       description={"You can now add your items that any user can order it from the Application and you can edit"}
        />

        <div className="row justify-content-between my-4">
          <div className='col-md-6'>
              <h3>Recipe Table Details</h3>
              <p className=''>You can check all details</p>
          </div>
            <div className='col-md-6 text-end'>
        {loginData?.userGroup != "SystemUser" ?  (

               <Link to="/dashboard/recipes/recipe-form" className='btn btn-success' onClick={handleShow}>
                 Add New Item
               </Link>)
            :(
              ""
             )}
          </div>
        </div>

        <DeleteConfirmation deleteItem={"Recipe"} deleteFun={deleteReceipe}
        show={show} handleClose={handleClose} />

        <div className='row mb-4'>
            <div className='col-md-6'>
              <input type='text' 
              className='form-control' 
              placeholder='Search Here'
              onChange={getNameValue}
              />
            </div>
            <div className='col-md-3' >
               <select className='form-control' onChange={getTagValue}>
                   <option hidden>tag</option>
                   {tags.map(({id,name}) => (
                    <option value={id} key={id}>{name}</option>
                   ))}
               </select>
            </div>
            <div className='col-md-3'>
                <select className='form-control' onChange={getCatValue}>
                    <option hidden>Category</option>
                    {categories.map(({id,name}) => (
                      <option value={id} key={id}>{name}</option>
                    ))}
                </select>
            </div>
        </div>



        <div className='table'>
        <table className="table">
        <thead>
          <tr className='row-table'>
            <th scope='col'>Item Name</th>
            <th scope="col">Image</th>
            <th scope="col">Price</th>
            <th scope="col">Description</th>
            <th scope="col">Tag</th>
            <th scope="col">Category</th>
            <th scope="col"></th>
          </tr>
        </thead>
        <tbody>
        {recipeItems.length > 0 ?( recipeItems.map(item =>
          <tr key={item.id}>
            <td>{item.name}</td>
            <td>
            {item.imagePath ?(
              <img src={`https://upskilling-egypt.com:3006/${item.imagePath}`} className='recipe-img' />
            ):(
              <img src={noData} className='recipe-img' />

            )}
            </td>
            <td>{item.price}</td>
            <td>{item.description}</td>
            <td>{item.tag.name}</td>
            <td>{item.category[0]?.name}</td>
 
            {loginData?.userGroup != "SystemUser" ?  (
              <td>
              <div className="dropdown text-center">       
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
                  className="dropdown-item" >
                  <Link to={`/dashboard/recipes/${item?.id}`} >
                    <i className='fa fa-edit text-success'></i>
                    </Link> Edit
                </li>
                <li className="dropdown-item"  onClick={() =>handleShow(item.id)}>
                  <i className='fa fa-trash text-success'></i> Delete
               </li>
              </ul>
              </div>
            
              </td>
           ):(
              <td>
                <i
                 onClick={() => addToFav(item.id)}
                 className='fa fa-heart mx-1 text-success'></i>
                 
              </td>
          )}
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


      {recipeItems.length > 0 ?(
       <nav aria-label="Page navigation example">
          <ul className="pagination justify-content-center">
            <li className="page-item">
              <a className="page-link" href="#" aria-label="Previous">
                <span aria-hidden="true">&laquo;</span>
              </a>
            </li>
            {noOfPages.map((noPage) => (
                <li className="page-item" key={noPage} onClick={() => getrecipeItems(noPage , 3)}>
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
)}






    </div>


  )
}

export default RecipesList