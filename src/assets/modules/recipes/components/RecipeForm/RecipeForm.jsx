import React, { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import './RecipeForm.css'
import { get, useForm } from 'react-hook-form'
import axios from 'axios'
import { toast } from 'react-toastify'

const RecipeForm = () => {
  const navigate = useNavigate()
  const[tags , setTags] = useState([])
  const[categories , setCategories] = useState([])

  let {
    register,
    handleSubmit,
    formState:{errors , isSubmitting},
    setValue

  } = useForm()
  
  const params = useParams()
  console.log(params)

  const recipeId = params.recipeId


  let onSubmitFunction =async (data) =>{
    const formData = new FormData()

/*     formData.append("name", data.name)
    formData.append("description", data?.description)
    formData.append("price", data?.price)
    formData.append("tagId", data?.tagId)
    formData.append("categoriesIds", data?.categoriesIds)
    formData.append("recipeImage", data?.recipeImage[0]) */

    for(const key in data){
      if(key!=="recipeImage"){
        formData.append(key, data?.[key])
      }else{
        formData.append("recipeImage", data?.[key]?.[0])
      }
    }
    
    
    console.log(data)

    try {
      let response = await axios[isNewRecipe? "post" : "put"]( 
        isNewRecipe?"https://upskilling-egypt.com:3006/api/v1/Recipe/" :
        `https://upskilling-egypt.com:3006/api/v1/Recipe/${recipeId}`
        , 
        formData ,
        {
          headers:{Authorization:localStorage.getItem("token")}
        })
      console.log(response)
      navigate('/dashboard/recipes')
      {isNewRecipe? toast.success("Recipe created successfully") : toast.success("Recipe updated successfully")}
    } catch (error) {
      console.log(error)
    }
  }

  const isNewRecipe = params.recipeId == undefined
  useEffect(() => {
    let getTags = async() =>{
    try {
      let response =await axios.get("https://upskilling-egypt.com:3006/api/v1/tag/" ,
        {
        headers:{Authorization:localStorage.getItem("token")}
      })
      setTags(response?.data)
      console.log(response?.data?.data)
      
    } catch (error) {
      console.log(error)
    }}
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
    getTags()
    getCategories()

    if(!isNewRecipe){
      let getRecipe = async() =>{
        try {
          let response = await axios.get(`https://upskilling-egypt.com:3006/api/v1/Recipe/${recipeId}`,
            {
              headers:{Authorization:localStorage.getItem("token")}
            }
          )
          console.log(response)
          const recipe = response?.data
         
          setValue("name",recipe?.name )
          setValue("description",recipe?.description )
          setValue("price",recipe?.price )
          setValue("tagId",recipe?.tag.id )
          setValue("categoriesIds",recipe?.category?.[0].id )
         

          
        } catch (error) {
          console.log(error)
        }

    }
      getRecipe()
    }
    
  },[])
/*   useEffect(() =>{
    getTags()
    getCategories()

  },[]) */

  useEffect(() =>{
    const beforeUnLoadHandler = (e) =>{
      e.preventDefault()
    }
    window.addEventListener("beforeunload",beforeUnLoadHandler)
    return () => window.removeEventListener("beforeunload",beforeUnLoadHandler)
  },[])

  return (
    <main>
        <div className='fill-recipe row'>
        <div className='fill-content col-md-6'>
        <h3>Fill the <span>Recipes</span>!</h3>
        <p>you can now fill the meals easily using the table and form , 
        click here and sill it with the table !</p>
        </div>
        <div className='fill-btn col-md-6 text-end'>
        <Link to="/dashboard/recipes" className='btn btn-success'>All Recipes
        <svg width="18" height="15" viewBox="0 0 18 15" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M17.9927 7.70752C17.9927 8.01676 17.8783 8.28271 17.6494 8.50537L11.5542 14.5913C11.4367 14.7088 11.313 14.7954 11.1831 14.8511C11.0532 14.9067 10.9202 14.9346 10.7842 14.9346C10.4749 14.9346 10.2214 14.8356 10.0234 14.6377C9.82552 14.446 9.72656 14.2048 9.72656 13.9141C9.72656 13.7656 9.75749 13.6265 9.81934 13.4966C9.875 13.3667 9.95231 13.2523 10.0513 13.1533L12.1294 11.0566L15.5156 7.94873L15.8867 8.58887L12.6118 8.78369H1.46045C1.13883 8.78369 0.879069 8.68473 0.681152 8.48682C0.477051 8.2889 0.375 8.02913 0.375 7.70752C0.375 7.39209 0.477051 7.13542 0.681152 6.9375C0.879069 6.73958 1.13883 6.64063 1.46045 6.64063L12.6118 6.64062L15.8867 6.83545L15.5156 7.46631L12.1294 4.36768L10.0513 2.271C9.95231 2.17204 9.875 2.05762 9.81934 1.92773C9.75749 1.79785 9.72656 1.65869 9.72656 1.51025C9.72656 1.21956 9.82552 0.978353 10.0234 0.786621C10.2214 0.588704 10.4749 0.489746 10.7842 0.489746C11.0625 0.489746 11.3161 0.601074 11.5449 0.82373L17.6494 6.91895C17.8783 7.13542 17.9927 7.39827 17.9927 7.70752Z" fill="white"/>
            </svg>
        </Link>
        </div>
        </div>

        <div className='recipe-form'>
          <div className='container w-75'>
            <form className='py-5 m-auto' onSubmit={handleSubmit(onSubmitFunction)}>
            <div className="input-group ">
                <input type="text"
                    className="form-control w-75 m-auto mb-3"
                    placeholder="Recipe Name"
                    aria-label="name"
                    aria-describedby="basic-addon1" 
                    {...register("name",{
                      required:"This field is required"
                    })}
                    />
            </div>
            {errors.name&&<div className="text-danger mb-2">{errors.name.message}</div>}
            
            <div className="input-group">
                <select className="form-control w-75 m-auto mb-3"
                {...register("tagId",{
                  required:"This field is required"
                })} >
                  <option value="">tag</option>
                  {tags.map(({id,name})=> (
                    <option value={id} key={id}>{name}</option>
                  ))}

                </select>
            </div>
            {errors.tagId&&<div className="text-danger mb-2">{errors.tagId.message}</div>}


            <div className="input-group">
                <input type="number"
                    className="form-control w-75 m-auto mb-3"
                    placeholder="Price"
                    aria-label="name"
                    aria-describedby="basic-addon1" 
                    {...register("price",{
                      required:"This field is required",
                      min:0
                    })}
                    />
                </div>
                {errors.price&&<div className="text-danger mb-2">{errors.price.message}</div>}

      

            <div className='input-group'>
                <select className="form-control w-75 m-auto mb-3"
                {...register("categoriesIds",{
                  required:"This field is required"
                })}>
                <option value="">Category</option>
                {categories.map(({id,name})=> (
                  <option value={id} key={id}>{name}</option>
                ))}

                </select>
            </div>
            {errors.categoriesIds&&<div className="text-danger mb-2">{errors.categoriesIds.message}</div>}

          

          <div className='input-group'>
            <textarea className='form-control w-75 m-auto mb-3'  rows='6'
             placeholder='Description *'
             {...register("description",{
              required:"This field is required"
            })}
             
             ></textarea>
          </div>
          {errors.description&&<div className="text-danger mb-2">{errors.description.message}</div>}

          

          <div className='input-group'>
              <input type='file'
              className='form-control m-auto w-75 mb-3'
              {...register("recipeImage")}
              />
          </div>

          <div className='form-btn'>
              <Link to="/dashboard/recipes" type='button' className='btn border border-success text-success'>Cancel</Link>
              <button className='btn btn-success' disabled={isSubmitting}>
              {isSubmitting? "Saving ..." : "Save"}
              </button>
          </div>

       </form>
                
        
         </div>       
       </div>
    </main>
 
  )
}

export default RecipeForm