import React, { useEffect, useState } from 'react'
import Header from '../shared/components/Header/Header'
import axios from 'axios'
import noData from '../../images/confirmdelete.svg'
import NoData from '../shared/components/NoData/NoData'
import './FavoritesList.css'
import { toast } from 'react-toastify'
const FavoritesList = () => {
    const[favoriteList , setFavoriteList] = useState([])
    let getFavsList = async () =>{
        try {
            let response =await axios.get("https://upskilling-egypt.com:3006/api/v1/userRecipe/" ,
                {
                    headers:{Authorization:localStorage.getItem("token")}
                })

            setFavoriteList(response.data.data)
            console.log(response?.data?.data)
            
        } catch (error) {
            console.error(error)
        }
    }
 

    let deleteFromFav = async (id) =>{
        try {
            let response =await axios.delete(`https://upskilling-egypt.com:3006/api/v1/userRecipe/${id}` ,
                {
                    headers:{Authorization:localStorage.getItem("token")}
                })
          
            getFavsList()
            toast.success("removed successfully")
                
        } catch (error) {
            console.error(error)
        }
    }
    useEffect(()=>{
        getFavsList()
    },[])
  return (
    <div>
        <Header first={"Favorite"}
        title={"  Items"}
        description={"You can now add your items that any user can order it from the Application and you can edit"}
        />
       
            <div className='container w-75'>
              <div class="row row-cols-1 row-cols-md-3 g-4 mt-4">
            {favoriteList.length > 0 ? (favoriteList.map((favItem) => 

                    <div class="col">
                            <div class="card">
                            {favItem.recipe.imagePath ?(
                                <img src={`https://upskilling-egypt.com:3006/${favItem.recipe.imagePath}`} className='card-img-top img-fluid w-100' />
                              ):(
                                <img src={noData} className='recipe-img' />
                  
                              )}
                              <i className='fa fa-heart text-success'
                                 onDoubleClick={() => deleteFromFav(favItem.id)}
                              ></i>
                            <div class="card-body">
                                <h5 class="card-title">{favItem.recipe.name}</h5>
                                <p class="card-text">{favItem.recipe.description}</p>
                            </div>
                        </div>
                    </div>
               
           


            )):(
                    <div className="noData m-auto mt-5">
                      <img src={noData} alt="No data" />
                      <h3>No Data!</h3>
                    </div>               
                  )
                } 
    </div>
    </div>
    </div>
  )
}

export default FavoritesList