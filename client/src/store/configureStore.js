import {createStore, combineReducers, applyMiddleware} from 'redux'
import thunk from 'redux-thunk'
import userReducer from '../reducers/userReducer'
import categoryReducer from '../reducers/categoryReducer'
import productReducer from '../reducers/productReducer'
import cartReducer from '../reducers/cartReducer'
import orderReducer from '../reducers/orderReducer'


const configureStore = () => {
    const store = createStore(combineReducers({
       users: userReducer,
       categories:categoryReducer,
       products:productReducer,
 		cartData:cartReducer ,
 		orders:orderReducer   
 	}), applyMiddleware(thunk))
    return store
}

export default configureStore