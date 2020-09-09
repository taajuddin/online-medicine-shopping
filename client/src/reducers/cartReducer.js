
import { ADD_CART_ITEM, REMOVE_CART_ITEM, GET_CART } from "../actions/types";

const initialState = {
  cart: [],
  loading: false
};

export default function(state = initialState, action) {
  switch (action.type) {
    case ADD_CART_ITEM:
      let cartState = JSON.parse(localStorage.getItem("Cart"));
      cartState = cartState ? cartState : [];

      localStorage.setItem(
        "Cart",
        JSON.stringify([...cartState, action.payload])
      );

      return {
        ...state,
        cart: JSON.parse(localStorage.getItem("Cart"))
      };
    case GET_CART:
      return {
        ...state,
        cart: action.payload
      };
    case REMOVE_CART_ITEM:
      cartState = JSON.parse(localStorage.getItem("Cart"));
      cartState = cartState ? cartState : [];

      localStorage.setItem(
        "Cart",
        JSON.stringify([
          ...cartState.filter(cartItem => cartItem._id !== action.payload)
        ])
      );

      return {
        ...state,
        cart: JSON.parse(localStorage.getItem("Cart"))
      };
    default:
      return state;
  }
}







// const cartInitState = []

// const cartReducer = (state = cartInitState ,action) => {
//     switch (action.type) {
//         case 'CREATE_CART': {              
//             return [].concat(action.payload)
//         } 

//         case 'EDIT_CART' :{
//             return state.map (cart =>{
//                 if(cart._id === action.payload._id) {
//                     return Object.assign({},cart,action.payload)
//                 } else {
//                     return Object.assign({},cart)
//                 }
//             })
//         }

         
//         default: {  
//             return [].concat(state)
//         }          
//     }
// }

// export default cartReducer





// const cartReducer = (state = [], action) => {
//    const cartInitialState=[]
//     switch(action.type){ 
//         case 'GET_CART': {
//             //console.log("checkhere", action.payload)
//             return [].concat(state = cartInitialState, action.payload)
//         }

//         default: {
//             return [...state]
//         }
//     }
// }

// export default cartReducer