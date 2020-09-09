import { ADD_CART_ITEM, REMOVE_CART_ITEM, GET_CART } from "./types";

// Add TO Cart






export const addToCart = cartItem => dispatch => {
  dispatch({
    type: ADD_CART_ITEM,
    payload: cartItem
  });
};

export const getCart = () => dispatch => {
  dispatch({
    type: GET_CART,
    payload: JSON.parse(localStorage.getItem("Cart"))
  });
};

export const removeFromCart = id => dispatch => {
  dispatch({
    type: REMOVE_CART_ITEM,
    payload: id
  });
};



// import { API } from '../config';
// import axios from 'axios'


// export const addCartInfo = (cart) =>{
//     return {type: 'CREATE_CART' ,  payload:cart}
// }

// export const addProducttoCart = (formdata,redirect)=>{
//     return(dispatch) => {
         
//          const product = {
//             productQuantity : -1,
//             cartQuantity : 1,
//             currentQuantity : 1,
//             id : formdata.productID
//          }
//         axios.put(`${API}/products/quantity/update`,product)
//         .then( response =>{
//             console.log(response.data)
//             if(response.data.hasOwnProperty('message')) {
//                 alert(response.data.message)
//             } else if(response.data.hasOwnProperty('error') ){
//                 alert(response.data.error)
//             } else { 
            
//                 axios.post(`${API}/cart`, formdata,{  headers : {
//                     'Authorization' : localStorage.getItem('jwt') 
//                     }
//                     })
//                 .then(response => {  
//                     dispatch( addCartInfo(response.data) )
//                     redirect()
//                 })
//                 .catch(err =>{
//                     console.log(err)
//                 })    
//             } 
//         }) 
//         .catch(err =>{
//             console.log(err)
//         })      
//     }
// }

// export const getProducttoCart = ()=>{
//     return(dispatch) => {
         
//         axios.get(`${API}/cart`, {  headers : {
//             'Authorization' : localStorage.getItem('jwt') 
//              }
//             })
//          .then(response => {  
//              dispatch( addCartInfo(response.data) )
              
//          })
//          .catch(err =>{
//              console.log(err)
//          })         
//     }
// }

// export const UpdateCartInfo = (cart) =>{
//     return {type: 'EDIT_CART' ,  payload:cart}
// }


// export const updateCartQuantity = (formData,refresh) =>{
//     return(dispatch) =>{
      
//         axios.put(`${API}/products/quantity/update`,formData)
//         .then( response =>{
//             if(response.data.hasOwnProperty('message')) {
//                 alert(response.data.message)
//             } else if(response.data.hasOwnProperty('error') ){
//                 alert(response.data.error)
//             } else { 
//                 axios.put(`${API}/cart/qunatity/update`,formData , {  headers : {
//                     'Authorization' : localStorage.getItem('jwt') 
//                      }
//                     })
//                  .then( response =>{
//                      dispatch(UpdateCartInfo(response.data))
//                      refresh()
//                  })   

//                  .catch(err=> {
//                      console.log(err)
//                  })
//             }
//         })

//         .catch(err =>{
//             console.log(err)
//         })
//     }
// }


// export const deleteProducttoCart = (id,refresh)=>{
    
//     return(dispatch) => {         
//         axios.delete(`${API}/cart/${id}`, {  headers : {
//             'Authorization' : localStorage.getItem('jwt') 
//              }
//             })
//          .then(response => {  
//               if( response.data.hasOwnProperty('error')){
//                   alert (response.data)
//               } else {
//                 dispatch(getProducttoCart())
//                 refresh()
//                 const product = {
//                     productQuantity : response.data.quantity,
//                     cartQuantity : -1,
//                     currentQuantity : response.data.quantity,
//                     id : response.data.productID
//                  }
//                 axios.put(`${API}/products/quantity/update`,product)
//                 .then( response =>{
                  
//                     if(response.data.hasOwnProperty('message')) {
//                         alert(response.data.message)
//                     } else if(response.data.hasOwnProperty('error') ){
//                         alert(response.data.error)
//                     }  
//                 })
//                 .catch(err=>{
//                     console.log(err)
//                 })
//               }
            
              
//          })
//          .catch(err =>{
//              console.log(err)
//          })         
//     }
// }
