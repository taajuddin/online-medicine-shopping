
const categoryReducer = (state = [], action) => {
   const categoryInitialState=[]
    switch(action.type){ 
        case 'ADD_CATEGORY': {
            return [...state, action.payload]
        }

        case 'GET_CATEGORY': {
            //console.log("checkhere", action.payload)
            return [].concat(state = categoryInitialState, action.payload)
        }

        default: {
            return [...state]
        }
    }
}

export default categoryReducer