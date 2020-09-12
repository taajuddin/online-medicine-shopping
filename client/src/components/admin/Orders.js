import React, { useState, useEffect } from 'react';
import Layout from '../core/Layout';
import {connect} from 'react-redux'
import { Link } from 'react-router-dom';
import {listOrder,getStatusValues,updataOrderStatus} from '../core/apiCore'
import moment from 'moment'

const Orders=(props)=>{

	const[orders,setOrders]=useState([])
	const[statusValues,setStatusValues]=useState([])

	const userId=props.user._id

	const loadOrder=()=>{
		listOrder(userId).then(data=>{ 
			if(data.error){
				console.log(data.error)
			}else{
				setOrders(data)
			}
		})
	}
	const loadStatusValues=()=>{
		getStatusValues(userId).then(data=>{
			if(data.error){
				console.log(data.error)
			}else{
				setStatusValues(data)
			}
		})
	}

	useEffect(()=>{
		loadOrder()
		loadStatusValues()
	},[])

	const showInput=(key,value)=>(
		<div className="input-group mb-2 mr-sm-2">
			<div className="input-group-prepend">
				<div className="input-group-text">{key}</div>
			</div>
			<input
				type="text"
				value={value}
				className="form-control"
				readOnly
			 />
		</div>
		)
const handleStatusChange=(e,orderId)=>{
	updataOrderStatus(userId,orderId,e.target.value).then(data=>{
		if(data.error){
			console.log('failed to upadte order')
		}else{
			loadOrder()
		}
	})
}

const showStatus=(order)=>(
		<div className="form-group">
			<h3 className="mark mb-4">Status:{order.status}</h3>
			<select className="form-control" onChange={(e)=>handleStatusChange(e,order._id)}>
				<option>update status</option>
				{statusValues.map((status,index)=>(
					<option  key={index} value={status}>{status}</option>
					))}
			</select>
		</div>
)
	const showOrdersLength=()=>{
		if(orders.length>0){
			return( <h1 className="text-danger display-2 ">
					Total orders:{orders.length}
				</h1>
				)
		}else{
			return <h1 className="text-danger">No orders</h1>
		}
	}

	return (
        <Layout title="Orders" description={`G'day ${props.user.name}, you can manage all the order here`}>
            <div className="row">
                <div className="col-md-8 offset-md-2">
                    {showOrdersLength()}
                   {orders.map((order,i)=>{
                   	return (
                   			<div className="mt-5" key={i} style={{borderBottom:"5px solid indigo"}}>
                   				<h2 className="mb-5">
                   					<span className="bg-primary">Order Id:{order._id}</span>
                   				</h2>

                   				<ul className="list-group mb-2">
                   					<li className="list-group-item">{showStatus(order)}</li>
                   					<li className="list-group-item">Transaction Id:{order.transaction_id}</li>
                   					<li className="list-group-item">Amount:RS. {order.amount}</li>
                   					<li className="list-group-item">Order By:{order.user.name}</li>
                   					<li className="list-group-item">Ordered On:{moment(order.createdAt).fromNow()}</li>
                   					<li className="list-group-item">Delivery address:{order.address}</li>

                   				</ul>
                   				<h3 className="mt-4 mb-4 font-italic">
                   					Total products in the orders:{order.products.length}
                   				</h3>

                   				{order.products.map((p,pIndex)=>(
                   					<div className="mb-4" key={pIndex} style={{padding:'20px', border:'1px solid indigo'}}>
                   						{showInput('Product name',p.name)}
                   						{showInput('Product price',p.price)}
                   						{showInput('Product total',p.count)}
                   						{showInput('Product Id',p._id)}
                   					</div>
                   					))}
                   			</div>
                   		)
                   })}
                </div>
            </div>
        </Layout>
    );

}
const mapStateToProps=(state)=>{
	return{
		user:state.users
	}
}

export default connect(mapStateToProps)(Orders)