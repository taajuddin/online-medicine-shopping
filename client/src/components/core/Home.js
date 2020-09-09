import React,{useState,useEffect} from 'react'
import Layout from './Layout'
import {connect} from 'react-redux'
import  {getProducts} from '../../actions/products'
import Box from './Box'
import Search from './Search'
// import Search from './Search'
const Home=(props)=>{
	
	// const [productsBySell,setProductsBySell]=useState([])
	// const[productsByArrival,setProductsByArrival]=useState([])
	// const[error,setError]=useState(false)

	// const loadProductsByArrival=()=>{
	// 	props.dispatch(getProducts('createdAt'))
	// 		if(error){
	// 			setError(error)
	// 		}
		
	// }
	// // const loadProductsBySell=()=>{
	// // 	props.dispatch(getProducts('sold'))
	// // 		if(error){
	// // 			setError(error)
	// // 		}
		
	// // }

	// useEffect(()=>{
	// 	loadProductsByArrival()
	// },[])

	return(
		<Layout title="Home Page" description="This Is Online Medicine Shopping" className="container-fluid">
		<Search />
		<h3 className="mb-4">New Arrival</h3>
			<div className="row">
				{props.products.map((product,i)=>(
				<div key={i} className=" col-sm-12 col-lg-4 mb-3">
					<Box  product={product} />
				</div>
			))}

			</div>
			
		</Layout>
		)
}

const mapStateToProps=(state)=>{
	return {
		products:state.products
	}
}

export default connect(mapStateToProps)(Home)