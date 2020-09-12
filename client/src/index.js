
// import React from 'react';
// import ReactDOM from 'react-dom';
// import App from './App';

// // import {Provider} from 'react-redux'
// // import configureStore from './store/configureStore'

// // const store=configureStore()

// // const ele = (
// //         //<Provider store = {store}>
// //             <App/>
// //         //</Provider>
// // )
// <App/>


// ReactDOM.render( document.getElementById('root'))

import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import {Provider} from 'react-redux'
import configureStore from './store/configureStore'
import { startSetUser } from './actions/users';
import { getCategories } from './actions/categories';
import {getProducts}  from './actions/products'
import {list} from './actions/products'
import {read} from './actions/products'
import {listRelated} from './actions/products'
import {listOrder} from './actions/orders'
 


const store = configureStore()


store.subscribe(() => {
  console.log(store.getState())
})
	store.dispatch(getCategories())
	store.dispatch(getProducts())

if(localStorage.getItem('jwt')){
	 store.dispatch(startSetUser())
	 //  store.dispatch(list())
	 store.dispatch(read())
	 store.dispatch(listOrder())
	 //  store.dispatch(listRelated())
}

const ele = (
		<Provider store = {store}>
			<App/>
		</Provider>
)


ReactDOM.render(ele, document.getElementById('root'));
