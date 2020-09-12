import React,{useState,useEffect} from 'react'
import Layout from '../core/Layout'
import {Link} from 'react-router-dom'
import {connect} from 'react-redux'
import {deleteProduct} from './apiAdmin'

const ManageProducts=(props)=>{


const destroy=(productId)=>{
	deleteProduct(productId).then(data=>{
		if(data.error){
			console.log(data.error)
		}
	})
}
useEffect(()=>{
	destroy(props.products._id)
},[])

	return(
		<Layout title="Manage Products" description="perform CRUD operations" className="container-fluid">
		<div className="row">
			<div className="col-12">
				<h2 className="text-align-center">Total {props.products.length} Products</h2>
				<hr />
				<ul className="list-group">
					{props.products.map((p,i)=>(
						<li key={i} className="list-group-item d-flex justify-content-between align-item-center">
							<strong>{p.name}</strong>
							<Link to={`/admin/product/update/${p._id}`}>
								<span className="badge badge-warning badge-pill">Update</span>
							</Link>
							<span onClick={()=>destroy(p._id)} className="badge badge-danger badge-pill">Delete</span>
						</li>
					))}
				</ul>
			</div>
		</div>
		
			
		</Layout>
		)
}

const mapStateToProps=(state)=>{
	return {
		products:state.products,
		user:state.user
	}
}

export default connect(mapStateToProps)(ManageProducts)