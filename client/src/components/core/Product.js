import React,{useState,useEffect} from 'react'
import Layout from './Layout'
import Box from './Box'
import {connect} from 'react-redux'
import { API } from '../../config';


const Product =(props)=>{

	const [product,setProduct]=useState({})
	const [relatedProduct,setRelatedProduct]=useState([])
	const [error,setError] =useState(false)

const read=(productId)=>{
    return fetch(`${API}/product/${productId}`,{
        method:'GET'
    })
    .then((response)=>{
        return response.json()
    })
    .catch((err)=>{
        console.log((err))
    })
}

 const listRelated=(productId)=>{
    return fetch(`${API}/products/related/${productId}`,{
        method:'GET'
    })
    .then((response)=>{
        return response.json()
    })
    .catch((err)=>{
        console.log((err))
    })
}
	const loadSingleProduct=(productId)=>{

		read(productId).then(data=>{
			if(data.error){
				setError(data.error)
			}
			else{
				setProduct(data)
				//fetch related data
				listRelated(data._id).then(data=>{
					if(data.error){
						setError(data.error)
					}else{
						setRelatedProduct(data)
					}
				})
			}
		})

	}

	useEffect(()=>{
		const productId=props.match.params.productId
		loadSingleProduct(productId)

	},[props])

	return(
		<Layout title={product && product.name}
			description={product && product.description && product.description}
			className="container-fluid">
			
			<div className="row">
				<div className="col-sm-12 col-lg-8">
					{product && product.description &&  <Box  product={product} showViewProductButton={false}/>}

				</div>
				<div className=" col-sm-12 col-lg-4">
					<h4>Related Product</h4>
					{
						relatedProduct.map((p,i)=>(
							<div className="mb-3">
								<Box key={i} product={p} />
							</div>

							))
					}
				</div>
			</div>

		</Layout>
		)
}

export default connect()(Product)