import React,{useState,useEffect} from 'react'
import {connect} from 'react-redux'

const Checkbox =({categories,handleFilters})=>{

	const [checked,setChecked]=useState([])	
	// console.log('hello',props.categories)

	const handleToggle=c=>()=>{

		//return the first index or -1
		const currentCategoryId=checked.indexOf(c)
		const newCheckedCategoryId=[...checked]

		//if currently checked was not already on checked state the we push
		//else pull
		if(currentCategoryId===-1){
			newCheckedCategoryId.push(c)
		}else{
			newCheckedCategoryId.splice(currentCategoryId,1)
		}
		//console.log(newCheckedCategoryId)
		setChecked(newCheckedCategoryId)
		handleFilters(newCheckedCategoryId)
	}

	return categories.map((c,i)=>(
			<li key={i} className="list-unstyled">
				<input  onChange={handleToggle(c._id)} value={checked.indexOf(c._id===-1)} type="checkbox" className="form-input-check" />
				<label className="form-check-label">{c.name}</label>
			</li>
		))
}
const mapStateToProps=(state)=>{
	return {
		categories:state.categories
	}
}

export default connect(mapStateToProps)(Checkbox)