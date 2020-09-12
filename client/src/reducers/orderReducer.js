const orderReducer = (state = [], action) => {
    const orderInitialState=[]
    switch(action.type){ 
        case 'ADD_ORDER': {
            return [...state, action.payload]
        }
        case 'READ_ORDER': {
            return [].concat(state = orderInitialState, action.payload)
        }

        // case 'GET_PRODUCT': {
        //     //console.log("checkhere", action.payload)
        //     return [].concat(state = categoryInitialState, action.payload)
        // }

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

export default orderReducer