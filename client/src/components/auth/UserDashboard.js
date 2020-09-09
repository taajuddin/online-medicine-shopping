import React,{useState,useEffect} from 'react'
import Layout from '../core/Layout'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'

const UserDashboard=(props)=>{
	
	const userLinks=()=>{
		return (
			<div className="card mb-5">
				<h3 className="card-header">User Link</h3>
				<ul className="list-group">
					<li className="list-group-item">
						<Link className="nav-link" to="/cart" >My Cart</Link>
					</li>
					<li className="list-group-item">
						<Link to="/profile/update" > Update Profile</Link>
					</li>
				</ul>
			</div>
			)
	}
const userInfo=()=>{
	return (
	<div className="card mb-5">
				<h3 className="card-header">User Information</h3>
				<ul className="list-group">
					<li className="list-group-item">{props.user.name}</li>
					<li className="list-group-item">{props.user.email}</li>
					<li className="list-group-item">{props.user.role === 1 ? 'Admin' :'Registered User'}</li>
				</ul>
			</div>
	)
}

const purchaseHistory=()=>{
	return (
	<div className="card mb-5">
				<h3 className="card-header">Purchase History</h3>
				<ul className="list-group">
					<li className="list-group-item">history</li>
				</ul>
		</div>
	)
}

	return (
		<Layout title="Dashboard" description={`Good Day ${props.user.name}`} className="container-fluid">
			
			<div className="row">
				<div className="col-sm-12 col-lg-3">{userLinks()}</div>
				<div className="col-sm-12 col-lg-9">
					{userInfo()}
					{purchaseHistory()}
				</div>
			</div>
		</Layout>
		)
}

const mapStateToProps=(state)=>{
	return {
		user:state.users
	}
}

export default connect(mapStateToProps)(UserDashboard)