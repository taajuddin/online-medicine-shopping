import React,{Fragement} from 'react';
import {BrowserRouter, Switch, Route} from 'react-router-dom'
import {connect} from 'react-redux'
import Signin from './components/user/Signin'
import Signup from './components/user/Signup'
import Home from './components/core/Home'
import Shop from './components/core/Shop'
import Dashboard from './components/auth/AdminDashboard'
import UserDashboard from './components/auth/UserDashboard'
import AddCategory from './components/admin/AddCategory'
import AddProduct from './components/admin/AddProduct'
import Product from './components/core/Product'
import Cart from './components/core/Cart'



const App=(props)=>{
	return (
		<BrowserRouter>
			<Switch>
				<Route path="/" exact component={Home} />
				<Route path="/shop" exact component={Shop} />
				<Route path="/cart" exact component={Cart} />
				<Route path="/signin" exact component={Signin} />
				<Route path="/signup" exact component={Signup} />
				<Route path="/product/:productId" exact component={Product} />
				{props.user.role===1 && (<>
					<Route path="/admin/dashboard" exact component={Dashboard} /> 
					<Route path="/create/category" exact component={AddCategory} /> 
					<Route path="/create/product" exact component={AddProduct} /> 
					</>
					)}

				{props.user.role===0 && (<>
					<Route path="/user/dashboard" exact component={UserDashboard} /> 
					</>)}
				<Route path="/user/dashboard" exact component={UserDashboard} /> 
				
				
			</Switch>

		</BrowserRouter>
		)
}
const mapStateToProps=(state)=>{
	return {
		user:state.users
	}
}

export default connect(mapStateToProps)(App);
