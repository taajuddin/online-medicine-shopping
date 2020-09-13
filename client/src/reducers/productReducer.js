const productReducer = (state = [], action) => {
    const productInitialState=[]
    switch(action.type){ 
        case 'ADD_PRODUCT': {
            return [...state, action.payload]
        }
        case 'READ_PRODUCT': {
            return [...state, action.payload]
        }

        case 'SINGLE_PRODUCT': {
            return [...state, action.payload]
        }

        case 'GET_PRODUCT': {
            //console.log("checkhere", action.payload)
            return [].concat(state = productInitialState, action.payload)
        }

        case 'UPDATE_PRODUCT': return state.map(product=>{
                                    if(product._id == action.payload._id){
                                            return Object.assign({},product,action.payload)
                                    } else {
                                    return Object.assign({},product)
                                    }
                             })

        //  case 'FILTERED_PRODUCT': {
        //     //console.log("checkhere", action.payload)
        //     return [].concat(state = categoryInitialState, action.payload)
        // }
        //  case 'LIST_PRODUCT': {
        //     //console.log("checkhere", action.payload)
        //     return [].concat(state = categoryInitialState, action.payload)
        // }
         
        //  case 'RELATED_PRODUCT': {
        //     //console.log("checkhere", action.payload)
        //     return [].concat(state = categoryInitialState, action.payload)
        // }


        default: {
            return [...state]
        }
    }
}

export default productReducer