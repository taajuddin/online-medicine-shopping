import { API } from '../config';
import axios from 'axios'

export const CreateCategory = (category) => {
    return {type: "ADD_CATEGORY", payload: category }
}




export const createCategory= (userId,formData) => {
    console.log("companyAction", formData)
    return (dispatch) => {
        axios.post(`${API}/category/create/${userId}`, formData, {
            headers: ({
                'Authorization': localStorage.getItem('jwt')
            })
        })
        .then((response) => {
            console.log("add" ,response.data)
            if(response.data.hasOwnProperty('errors')){
                alert(response.data.message)
            }
            else{
                alert('successfully added')
                const category = response.data
                dispatch(CreateCategory(category))
            }
        })
    }
}

//Set Category
 export const GetCategory = (category) => {
   return {type: "GET_CATEGORY", payload: category }
    }



export const getCategories = () => {
    return (dispatch) => {
        axios.get(`${API}/categories`)
        .then((response) => {
            const category = response.data
            // console.log("companyData", company)
            dispatch(GetCategory(category))
        })
    }
}
