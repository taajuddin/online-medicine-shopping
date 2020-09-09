import React, { useState } from "react";
import {connect} from 'react-redux'
import { Redirect } from "react-router-dom";
import Layout from "../core/Layout";
import { signin} from "../../actions/users";

const Signin = (props) => {
    const [values, setValues] = useState({
        email: "taajraza98@gmail.com",
        password: "taaj123",
        loading: false,
        redirectToReferrer: false
    });

    const { email, password, loading,redirectToReferrer } = values;
   

    const handleChange = name => event => {
        setValues({ ...values,  [name]: event.target.value });
    };

    const clickSubmit = event => {
        event.preventDefault();
        setValues({ ...values,loading: true });
        props.dispatch(signin({ email, password }))
             setValues({
                        ...values,
                        redirectToReferrer: true
                    });
       
    };
 const redirectUser = () => {
                if (redirectToReferrer) {
                return <Redirect to="/" />
                     }
            }
      

    const signUpForm = () => (
        <form>
            <div className="form-group">
                <label className="text-muted">Email</label>
                <input
                    onChange={handleChange("email")}
                    type="email"
                    className="form-control"
                    value={email}
                />
            </div>

            <div className="form-group">
                <label className="text-muted">Password</label>
                <input
                    onChange={handleChange("password")}
                    type="password"
                    className="form-control"
                    value={password}
                />
            </div>
            <button onClick={clickSubmit} className="btn btn-primary">
                Submit
            </button>
        </form>
    );


    const showLoading = () =>
        loading && (
            <div className="alert alert-info">
                <h2>Loading...</h2>
            </div>
        );


    return (
        <Layout
            title="Signin"
            description="Signin to Node React E-commerce App"
            className="container col-md-8 offset-md-2"
        >
            {showLoading()}
            {signUpForm()}
            {redirectUser()}
        </Layout>
    );
};

export default connect()(Signin);