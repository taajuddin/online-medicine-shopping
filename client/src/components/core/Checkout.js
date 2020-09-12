import React, { useState, useEffect } from 'react';
import { getBraintreeClientToken,processPayment,createOrder} from './apiCore';
import { emptyCart } from './cartHelper';
//import Card from './Card';
import { Link } from 'react-router-dom';
// import "braintree-web"; // not using this package
import DropIn from 'braintree-web-drop-in-react';


import {connect} from 'react-redux'

const Checkout = ({ props,user,products, setRun = f => f, run = undefined }) => {
    const [data, setData] = useState({
        loading: false,
        success: false,
        clientToken: null,
        error: '',
        instance: {},
        address: ''
    });


    const userId=user._id
   
    // const handleAddress = event => {
    //     setData({ ...data, address: event.target.value });
    // };

    const getToken=(userId)=>{
        getBraintreeClientToken(userId).then((data)=>{
            if(data.error){
                setData({...data, error:data.error})
            }
            else{
                setData({ clientToken:data.clientToken})
            }
        })
    }

    useEffect(()=>{
        getToken(userId)
    },[])

    const getTotal = () => {
        return products.reduce((currentValue, nextValue) => {
            return currentValue + nextValue.count * nextValue.price;
        }, 0);
    };

let deliveryAddress=data.address
    const buy=()=>{
        setData({ loading:true})
        //send the nonce to the server
        //nonce=data.instance.requestPaymentMethod()
        let nonce
        let getNonce=data.instance.requestPaymentMethod()

        .then(data=>{
            console.log(data)
            nonce=data.nonce
            //console.log(nonce)
            // //once you have nonce(card type, card number) send as 'paymentMethodNonce'
            // //and also get total to be charged
            // console.log('send nonce and total to process',getTotal(products))

            //let paymentMethodNonce;
            //let amount;
            const paymentData={
                paymentMethodNonce:nonce,
                amount:getTotal(products)
            }
            //console.log('dikha de',paymentData)

            processPayment(userId,paymentData)
            .then(response=>{
                //console.log(response)
                
                //empty cart
                //create Order

                const createOrderData={
                    products: products,
                    transaction_id: response.transaction.id,
                    amount: response.transaction.amount,
                    address: deliveryAddress
                }

                createOrder(userId,createOrderData)
                .then(response=>{
                    emptyCart(()=>{
                    console.log('payment success and empty cart')
                    setData({loading:false,success:true})
                })

                })
                
            .catch(error=>{
                console.og(error)
                setData({ loading:false})
            })
        })
        .catch(error=>{
            //console.log('dropin error',error)
            setData({...data,error:error.message})
        })
    })

    }

    const handleAddress = event => {
        setData({ ...data, address: event.target.value });
    };

    
const showDropIn=()=>(
        <div onBlur={()=>setData({...data,error:''})}>
            {data.clientToken !==null && products.length >0 ? (
                    <div>
                        <div className="gorm-group mb-3">
                        <label className="text-muted">Delivery address:</label>
                        <textarea
                            onChange={handleAddress}
                            className="form-control"
                            value={data.address}
                            placeholder="Type your delivery address here..."
                        />
                        </div>
                        <DropIn options={{
                            authorization:data.clientToken
                        }}

                            onInstance={instance=>(data.instance=instance)}/>
                        <button onClick={buy} className="btn btn-success btn-block">Pay</button>
                    </div>
                ):null}
        </div>
    )
    

    const showError = error => (
        <div className="alert alert-danger" style={{ display: error ? '' : 'none' }}>
            {error}
        </div>
    );

    

    const showSuccess = success => (
        <div className="alert alert-info" style={{ display: success ? '' : 'none' }}>
            Thanks! Your payment was successful!
        </div>
    );

    const showLoading = loading => loading && <h2 className="text-danger">Loading...</h2>;

    return (
        <div>
            <h2>Total: RS. {getTotal()}</h2>
            {showSuccess(data.success)}
            {showLoading(data.loading)}
            {showError(data.error)}
            {localStorage.getItem('jwt')? (
                    <div>{showDropIn()}</div>
                ):(
                    <Link to ="/signin">
                    <button className="btn btn-primary">signIn to checkout</button>
                    </Link>
                )}
        </div>
    );
};

const mapStateToProps=(state)=>{
    return {
        user:state.users
    }
}

export default connect(mapStateToProps)(Checkout);





