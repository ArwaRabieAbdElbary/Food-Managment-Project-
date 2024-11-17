import axios from "axios"

export const baseUrl="https://upskilling-egypt.com:3006/api/v1"
export const axiosInstance = axios.create({
    baseURL: baseUrl,
    headers: {Authorization:localStorage.getItem("token")}
})


//USERs URLS
export const UESRS_URLS ={
    LOGIN : `/Users/Login`,
}

//CATEGORIES URLS
export const CATEGORY_URLS ={
    GET_CATEGORIES : `/Category/`
}