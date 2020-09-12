import React,{useState,useEffect} from 'react'
import Layout from '../core/Layout'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {getPurchaseHistory} from '../user/userApi'
import moment from 'moment'

const UserDashboard=(props)=>{

	const [history,setHistory]=useState([])

	  const init = (userId) => {
        getPurchaseHistory(userId).then(data => {
            if (data) {
               setHistory(data);
            }
        });
    };
	console.log('bas bata',props.user._id)

	useEffect(()=>{
		init(props.user._id)
	},[])
	
	const userLinks=()=>{
		return (
			<div className="card mb-5">
				<h3 className="card-header">User Link</h3>
				<ul className="list-group">
					<li className="list-group-item">
						<Link className="nav-link" to="/cart" >My Cart</Link>
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

    const purchaseHistory = history => {
        return (
            <div className="card mb-5">
                <h3 className="card-header">Purchase history</h3>
                <ul className="list-group">
                    <li className="list-group-item">
                        {history && history.map((h, i) => {
                            return (
                                <div>
                                    <hr />
                                    {h.products.map((p, i) => {
                                        return (
                                            <div key={i}>
                                                <h6>Product name: {p.name}</h6>
                                                <h6>Product price: ${p.price}</h6>
                                                <h6>
                                                    Purchased date:{" "}
                                                    {moment(p.createdAt).fromNow()}
                                                </h6>
                                            </div>
                                        );
                                    })}
                                </div>
                            );
                        })}
                    </li>
                </ul>
            </div>
        );
    };

	return (
		<Layout title="Dashboard" description={`Good Day ${props.user.name}`} className="container-fluid">
			
			<div className="row">
				<div className="col-sm-12 col-lg-3">{userLinks()}</div>
				<div className="col-sm-12 col-lg-9">
					{userInfo()}
					{purchaseHistory(history)}
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












