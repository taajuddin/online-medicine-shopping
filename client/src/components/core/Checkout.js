import React, { useState, useEffect } from 'react';
//import { getProducts, getBraintreeClientToken, processPayment, createOrder } from './apiCore';
//import { emptyCart } from './cartHelpers';
//import Card from './Card';
import { Link } from 'react-router-dom';
// import "braintree-web"; // not using this package
//import DropIn from 'braintree-web-drop-in-react';


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

   
    // const handleAddress = event => {
    //     setData({ ...data, address: event.target.value });
    // };

    const getTotal = () => {
        return products.reduce((currentValue, nextValue) => {
            return currentValue + nextValue.count * nextValue.price;
        }, 0);
    };

    

    // const showError = error => (
    //     <div className="alert alert-danger" style={{ display: error ? '' : 'none' }}>
    //         {error}
    //     </div>
    // );

    // const showSuccess = success => (
    //     <div className="alert alert-info" style={{ display: success ? '' : 'none' }}>
    //         Thanks! Your payment was successful!
    //     </div>
    // );

    // const showLoading = loading => loading && <h2 className="text-danger">Loading...</h2>;

    return (
        <div>
            <h2>Total: RS. {getTotal()}</h2>

            {localStorage.getItem('jwt')? (
                    <button className="btn btn-success">Chekout</button>
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