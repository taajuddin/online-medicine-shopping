import { API } from '../config';
import queryString from 'query-string'
import axios from 'axios'


export const CreateProduct = (product) => {
    return {type:"ADD_PRODUCT", payload: product }
}


export const createProduct= (userId,formData) => {
    console.log("companyAction", formData)
    return (dispatch) => {
        axios.post(`${API}/product/create/${userId}`, formData, {
            headers: ({
                'Authorization': localStorage.getItem('jwt')
            })
        })
        .then((response) => {
            //console.log("add" ,response.data)
            if(response.data.hasOwnProperty('errors')){
                alert(response.data.message)
            }
            else{
                alert('successfully added')
                const product = response.data
                dispatch(CreateProduct(product))
            }
        })
    }
}

export const ReadProduct = (product) => {
    return {type: "READ_PRODUCT", payload: product }
}


export const read=(productId)=>{
    return (dispatch)=>{
    axios.get(`${API}/product/${productId}`)
    .then((response)=>{
       const product=response.data;
       dispatch(ReadProduct(product))
    })
    .catch((err)=>{
        console.log((err))
    })
}
}

export const GetProduct = (product) => {
    return {type: "GET_PRODUCT", payload: product }
}

export const getProducts = (sortBy) => {
    return (dispatch) => {
        axios.get(`${API}/products?sortBy=${sortBy}&order=desc&limit=6`)
        .then((response) => {
            const product = response.data
            // console.log("companyData", company)
            dispatch(GetProduct(product))
        })
    }
}

export const UpdateProduct = (product) => {
    return {type: "UPDATE_PRODUCT", payload: product }
}

export const updateProduct = (productId, userId,product) => {
    return (dispatch)=>{
    axios.put(`${API}/product/${productId}/${userId}`,product, {
        headers: ({
                'Authorization': localStorage.getItem('jwt')
            })
    })
       .then((response) => {
            //console.log("add" ,response.data)
            if(response.data.hasOwnProperty('errors')){
                alert(response.data.message)
            }
            else{
                alert('successfully added')
                const product = response.data
                dispatch(UpdateProduct(product))
            }
        })
    }
};



// export const GetFilteredProduct = (product) => {
//     return {type: "FILTERED_PRODUCT", payload: product }
// }


// export const getFilteredProducts= (skip,limit,filters={})=> {
//     const data={
//         limit,skip,filters
//     }
//     return (dispatch)=>{
//     	axios.post(`${API}/products/by/search`,data, {
//         headers: {
//              'Authorization': localStorage.getItem('jwt')
//           }
        
//     })
//         .then(response => {
//             if(response.data.hasOwnProperty('errors')){
//                 alert(response.data.message)
//             }
//             else{
//                 alert('successfully added')
//                 const product = response.data
//                 dispatch(getFilteredProducts(product))
//             }
//        })
// }

// export const ListProduct = (product) => {
//     return {type: "LIST_PRODUCT", payload: product }
// }

// export const list=(params)=>{
//     const query=queryString.stringify(params)
//     //console.log('query',query)
//     return (dispatch)=>{
//     axios.get(`${API}/products/search?${query}`,{
//              headers: {
//                 'Authorization': localStorage.getItem('jwt')
//             }
//     })
//     .then((response)=>{
//         const product=response.data;
//        dispatch(ListProduct(product))
//     })
//     .catch((err)=>{
//         console.log((err))
//     })
// }
// }



export const singleProduct = (product) => {
    return {type: "SINGLE_PRODUCT", payload: product }
}


export const getProduct=(productId)=>{
    return (dispatch)=>{
    axios.get(`${API}/products/${productId}`,{
         headers: {
                'Authorization': localStorage.getItem('jwt')
            }
    })
    .then((response)=>{
        const product=response.data
        dispatch(singleProduct(product))
    })
    .catch((err)=>{
        console.log((err))
    })

}
}
