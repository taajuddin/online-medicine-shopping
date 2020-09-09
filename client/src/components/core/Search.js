import React,{useState,useEffect} from 'react'
import Layout from './Layout'
import {connect} from 'react-redux'
import { API } from '../../config';
import queryString from 'query-string'
import Box from './Box'


const Search=(props)=>{

	const [data,setData]=useState({
		category:'',
		serach:'',
		results:[],
		searched:false
	})

	const {category,search,results,searched}=data

	const list=(params)=>{
    	const query=queryString.stringify(params)
	    console.log('query',query)
	    return fetch(`${API}/products/search?${query}`,{
	        method:'GET'
	    })
	    .then((response)=>{
	        return response.json()
	    })
	    .catch((err)=>{
	        console.log((err))
	    })
}

	const searchData=()=>{
		//console.log(search,category)
		if(search){
			list({search:search || undefined , category:category}).then((response)=>{
				if(response.error){
					console.log(response.error)
				}
				else{
					setData({...data, results:response, searched:true})
				}

			})
		}
	}

	const searchSubmit=(e)=>{
			e.preventDefault()
			searchData()
	}

	const handleChange=name=>(event)=>{
		setData({...data, [name]:event.target.value, searched:false})

	}

	const searchForm=()=>(
		<form onSubmit={searchSubmit}>
			<span className="input-group-text">
				<div className="input-group input-group-lg">

				<div className="input-group-prepend">
					<select className="btn mr-2" onChange={handleChange("category")}>
						<option value="All">All</option>
						{
							props.categories.map((c,i)=>{
								return <option key={i} value={c._id}>{c.name}</option>
							})
						}
					</select>
				</div>

					<input type="search" 
						className="form-control" 
						onChange={handleChange('search')} 
						placeholder="Search by name"
					/>
				</div>
				<div className="btn input-group-append" style={{border:'none'}}>
					<button className="input-group-text">Search</button>
				</div>
			</span>
		</form>
		)

const searchMessage=(searched,results)=>{
	if(searched && results.length>0){
		return `Found ${results.length} products`
	}
	if(searched && results.length<1){
		return `No products found`
	}

}

	const searchedProducts=(results=[])=>{
		return (
			<div>
				<h2 className="mt-4 mb-4">
					{searchMessage(searched,results)}
				</h2>
				<div className="row">
					{results.map((product,i)=>(<Box key={i} product={product} />))}
				</div>
			</div>
		)
	}	

	return(
			<div className="row">
				<div className="container mb-3">
					{searchForm()}
				</div>
				<div className="container-fluid mb-3">
					{searchedProducts(results)}
				</div>
			</div>
		)
}
const mapStateToProps=(state)=>{
	return{
		categories:state.categories
	}
}

export default connect(mapStateToProps)(Search)