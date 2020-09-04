import React,{useState} from 'react'
import Layout from '../core/Layout'
import {isAuthenticated} from '../auth/index'
import {Link} from 'react-router-dom'
import {createCategory} from './apiAdmin'

const AddCategory=()=>{
	const [name, setName]=useState('')
	const [error, setError]=useState(false)
	const [success, setSuccess]=useState(false)

	//destructure users and token from localStorage
	const {users,token}=isAuthenticated()

	//handleChange
	const handleChange=(e)=>{
		setError('')
		setName(e.target.value)
	}
	//handleSubmit
	const clickSubmit=(e)=>{
		e.preventDefault()
		setError('')
		setSuccess(false)
		//make request to api to create category
		createCategory(users._id,token,{name})
			.then((data)=>{
				console.log(data)
				if(data.error){
					setError(true)
				}
				else{
					setError('')
					setSuccess(true)
				}
			})
	}

	const showSuceess=()=>{
		if(success){
			return <h3 className="text-success">{name} is created</h3>
		}
	}
	const showError=()=>{
		if(error){
			return <h3 className="text-danger">Category is already exist</h3>
		}
	}

	const goBack=()=>(
			<div className="mt-5">
				<Link to="/admin/dashboard" className="text-warning">Back to Dashboard</Link>
			</div>
			)
	

const newCategoryForm=()=>(
	<form onSubmit={clickSubmit}>
		<div className="form-group">
			<label className="text-muted">Name</label>
			<input type="text" 
				className="form-control" 
				onChange={handleChange} 
				value={name}
				autoFocus
				required
			/>	
		</div>
		<button className="btn btn-outline-primary">Create Category</button>
	</form>
	)
return (
		<Layout title="Add a new Category" description={`Good Day ${users.name} ready to add new category`} >
			
			<div className="row">
				<div className="col-md-8 offset-md-2 ">
					{showError()}
					{showSuceess()}
					{newCategoryForm()}

					{goBack()}
				</div>
			</div>
		</Layout>
		)
}

export default AddCategory