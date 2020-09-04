import React,{useState,useEffect} from 'react'
import Layout from './Layout'
import  {getProducts} from './apiCore'
import Box from './Box'
import Search from './Search'
const Home=()=>{
	
	const [productsBySell,setProductsBySell]=useState([])
	const[productsByArrival,setProductsByArrival]=useState([])
	const[error,setError]=useState(false)

	const loadProductsBySell=()=>{
		getProducts('sold').then((data)=>{
			if(data.error){
				setError(data.error)
			}else{
				setProductsBySell(data)
			}
		})
	}

	const loadProductsByArrival=()=>{
		getProducts('createdAt').then((data)=>{
			if(data.error){
				setError(data.error)
			}else{
				setProductsByArrival(data)
			}
		})
	}

	useEffect(()=>{
		loadProductsBySell()
		loadProductsByArrival()
	},[])

	return(
		<Layout title="Home Page" description="This Is Online Medicine Shopping" className="container-fluid">
		<Search />
		<h3 className="mb-4">New Arrival</h3>
			<div className="row">
				{productsByArrival.map((product,i)=>(
				<div key={i} className="col-4 mb-3">
					<Box  product={product} />
				</div>
			))}

			</div>
			<h3 className="mb-4">Best Seller</h3>
			<div className="row">
				{productsBySell.map((product,i)=>(
				<div key={i} className="col-4 mb-3">
					<Box  product={product} />
				</div>
			))}

			</div>
			
		</Layout>
		)
}

export default Home