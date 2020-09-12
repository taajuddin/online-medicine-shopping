import React,{useState,useEffect} from 'react'
import Layout from '../core/Layout'
import {Link} from 'react-router-dom'
import {connect} from 'react-redux'


const Dashboard=(props)=>{

	
	
	const adminLinks=()=>{
		return (
			<div className="card mb-5">
				<h3 className="card-header">Admin Link</h3>
				<ul className="list-group">
					<li className="list-group-item">
						<Link  to="/create/category">Create Category</Link>
					</li>
					<li className="list-group-item ">
						<Link to="/create/Product" > Create Product</Link>
					</li>
					<li className="list-group-item ">
						<Link to="/admin/orders" > View Orders</Link>
					</li>
					<li className="list-group-item ">
						<Link to="/admin/products" >Manage Products</Link>
					</li>
				</ul>
			</div>
			)
	}
const adminInfo=()=>{
	return (
	<div className="card mb-5">
				<h3 className="card-header">Admin Information</h3>
				<ul className="list-group">
					<li className="list-group-item">{props.user.name}</li>
					<li className="list-group-item">{props.user.email}</li>
					<li className="list-group-item">{props.user.role === 1 ? 'Admin' :'Registered User'}</li>
				</ul>
			</div>
	)
}



	
	return(
		<Layout title="Dashboard" description={`Good Day ${props.user.name}`} className="container-fluid">
			
			<div className="row">
				<div className="sol-sm-12 col-lg-3 ">{adminLinks()}</div>
				<div className=" col-sm-12 col-lg-9">{adminInfo()}</div>
			</div>
		</Layout>
		)
}

const mapStateToProps=(state)=>{
	return {
		user:state.users,
		products:state.products
	}
}

export default connect(mapStateToProps)(Dashboard)