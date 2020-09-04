import React from 'react'
import {Link} from 'react-router-dom'
import ShowImage from './ShowImage'
import {
  Card, CardImg, CardHeader ,CardBody
} from 'reactstrap';
import moment from 'moment'
const Box=({product,showViewProductButton=true})=>{



	const showAddToCartButton=()=>{
		return (
					<button className="btn btn-outline-warning mt-2 mb-2">
						Add to Cart
					</button>
			)
	}
	const showStock=(quantity)=>{
		return quantity >0 ?<span className="badge badge-primary badge-pill">
								In Stock
							</span>:<span className="badge badge-primary badge-pill">
								Out of Stock
							</span>

	}

	const showViewButton=(showViewProductButton)=>{
		return (
			showViewProductButton && (
				<Link to={`/product/${product._id}`} className="mr-2">
					<button className="btn btn-outline-primary mt-2 mb-2">View Product</button>
				</Link>
				)
		)	
	}

	return (
				<Card >
					<CardHeader className="name">{product.name}</CardHeader>
					<CardBody>
						<ShowImage item={product} url="product" />
						<p className="lead mt-2">{product.description.substring(0,100)}</p>
						<p className="black-9"> <b>Category:</b>{product.category && product.category.name}</p>
						<p className="black-8"><b>RS.</b>{product.price}</p>
						<p className="black-8"><b>Mfg.By:</b> {moment(product.createdAt).format('L')} </p>
						
							{showStock(product.quantity)}
							<br/>
							{showViewButton(showViewProductButton)}
							{showAddToCartButton()}

					</CardBody>
				</Card>
		)
}


export default Box