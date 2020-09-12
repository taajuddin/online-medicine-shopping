import { API } from '../../config';

import axios from 'axios'


export const getBraintreeClientToken=(userId)=>{

	return fetch(`${API}/braintree/getToken/${userId}`,{
		method:"GET",
		headers:{
			Accept:"application/json",
			"Content-Type":"application/json",
			Authorization:localStorage.getItem('jwt')
		}

		})
	.then(response=>{
		return response.json()
	})
	.catch(err=>console.log(err))
}

export const processPayment=(userId,paymentData)=>{
	return fetch(`${API}/braintree/payment/${userId}`,{
		method:"POST",
		headers:{
			Accept:"application/json",
			"Content-Type":"application/json",
			Authorization:localStorage.getItem('jwt')
		},
		body:JSON.stringify(paymentData)

		})
	.then(response=>response.json())
	.catch(err=>console.log(err))
}

export const createOrder=(userId,createOrderData)=>{
	return fetch(`${API}/order/create/${userId}`,{
		method:"POST",
		headers:{
			Accept:"application/json",
			"Content-Type":"application/json",
			Authorization:localStorage.getItem('jwt')
		},
		body:JSON.stringify({order:createOrderData})

		})
	.then(response=>response.json())
	.catch(err=>console.log(err))
}

export const listOrder=(userId)=>{
	return fetch(`${API}/order/list/${userId}`,{
		method:"GET",
		headers:{
			Accept:"application/json",
			"Content-Type":"application/json",
			Authorization:localStorage.getItem('jwt')
		}
		})
	.then(response=>response.json())
	.catch(err=>console.log(err))
}