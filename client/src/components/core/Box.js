import React,{useState} from 'react'
import {Link,Redirect} from 'react-router-dom'
// import ShowImage from './ShowImage'
import {
  Card, CardImg, CardHeader ,CardBody
} from 'reactstrap';
import moment from 'moment'
import { API } from "../../config";
import {addItem,updateItem,removeItem} from './cartHelper'



const Box=({product,
			showViewProductButton=true,
			showAddToCartButton=true,
			cartUpdate=false,
			showRemoveProductButton=false,
			 setRun = f => f,
      		 run = undefined
		})=>{

	const [redirect,setRedirect]=useState(false)
	const [count,setCount]=useState(product.count)


	const addToCart = () => {
        // console.log('added');
        addItem(product, setRedirect(true));
      };

const handleChange = productId => event => {
        setRun(!run); // run useEffect in parent Cart
        setCount(event.target.value < 1 ? 1 : event.target.value);
        if (event.target.value >= 1) {
          updateItem(productId, event.target.value);
        }
      };


const showCartUpdateOptions=cartUpdate=>{
	return cartUpdate && <div>
								<div className="input-group- mb-3">
									<div className="input-group-prepend">
										<span className="input-group-text">Adjust quantity</span>
									</div>
									<input type="text" className="form-control" value={count} onChange={handleChange(product._id)}/>
								</div>
						</div>
}

	const shouldRedirect=(redirect)=>{
		if(redirect){
			return <Redirect to="/cart" />
		}
	}

	const showAddToCart=(showAddToCartButton)=>{
		return (
				showAddToCartButton &&(
					<button onClick={addToCart} className="btn btn-outline-warning mt-2 mb-2">
						Add to Cart
					</button>
					)
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


	 const showRemoveButton = showRemoveProductButton => {
        return (
          showRemoveProductButton && (
            <button
              onClick={() => {
                removeItem(product._id);
                setRun(!run); // run useEffect in parent Cart
              }}
              className="btn btn-outline-danger mt-2 mb-2"
            >
              Remove Product
            </button>
          )
        );
      };


	return (
				<Card >
					<CardHeader className="name">{product.name}</CardHeader>
					<CardBody>
						{shouldRedirect(redirect)}
						<CardImg src={`${API}/product/photo/${product._id}`} />
						<p className="lead mt-2">{product.description.substring(0,100)}</p>
						<p className="black-9"> <b>Category:</b>{product.category && product.category.name}</p>
						<p className="black-8"><b>RS.</b>{product.price}</p>
						<p className="black-8"><b>Mfg.By:</b> {moment(product.createdAt).format('L')} </p>
						
							{showStock(product.quantity)}
							<br/>
							{showViewButton(showViewProductButton)}
     
            				{showAddToCart(showAddToCartButton)}
     
            				{showRemoveButton(showRemoveProductButton)}
     
            				{showCartUpdateOptions(cartUpdate)}
					</CardBody>
				</Card>
		)
}


export default Box


