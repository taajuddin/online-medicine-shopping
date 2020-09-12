import { API } from '../config';
import axios from 'axios'


export const CreateOrder = (orders) => {
    return {type:"ADD_ORDER", payload: orders }
}

export const createOrder=(userId,createOrderData)=>{
    return (dispatch)=>{
    fetch(`${API}/order/create/${userId}`,{
        method:"POST",
        headers:{
            Accept:"application/json",
            "Content-Type":"application/json",
            Authorization:localStorage.getItem('jwt')
        },
        body:JSON.stringify({order:createOrderData})

        })
    .then(response=>{
        const orders=response.json()
        dispatch(createOrder(orders))
    })
    .catch(err=>console.log(err))
}
}

// export const createOrder= (userId,createOrderData) => {
//     console.log("order", createOrderData)
//     return (dispatch) => {
//         axios.post(`${API}/order/create/${userId}`, createOrderData, {
//             headers: ({
//                 'Authorization': localStorage.getItem('jwt')
//             })
//         })
//         .then((response) => {
//             //console.log("add" ,response.data)
//             if(response.data.hasOwnProperty('errors')){
//                 alert(response.data.message)
//             }
//             else{
//                 alert('successfully added')
//                 const orders = response.data
//                 dispatch(CreateOrder(orders))
//             }
//         })
//     }
// }
console.log("abe bata ",localStorage.getItem('jwt'))

export const ListOrder = (orders) => {
    return {type: "READ_ORDER", payload: orders }
}

export const listOrder=(userId)=>{
    return (dispatch) => {
        axios.post(`${API}/order/create/${userId}`, {
            headers: ({
                'Authorization': localStorage.getItem('jwt')
            })
        })
    .then(response=>{
        const orders=response.json()
        dispatch(ListOrder(orders))
    })
    .catch(err=>console.log(err))
}
}


// export const listOrder=(userId)=>{
//     return (dispatch)=>{
//     axios.get(`${API}/order/list/${userId}`,{
//          headers: ({
//                 'Authorization': localStorage.getItem('jwt')
//             })
//     })
//     .then((response)=>{
//        const orders=response.data;
//        dispatch(ListOrder(orders))
//     })
//     .catch((err)=>{
//         console.log((err))
//     })
// }
// }

// export const GetProduct = (product) => {
//     return {type: "GET_PRODUCT", payload: product }
// }

// export const getProducts = (sortBy) => {
//     return (dispatch) => {
//         axios.get(`${API}/products?sortBy=${sortBy}&order=desc&limit=6`)
//         .then((response) => {
//             const product = response.data
//             // console.log("companyData", company)
//             dispatch(GetProduct(product))
//         })
//     }
// }

