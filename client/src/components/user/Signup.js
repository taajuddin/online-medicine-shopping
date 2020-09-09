import React, { useState } from 'react';
import {connect} from 'react-redux'
import { Link,Redirect } from 'react-router-dom';
import Layout from '../core/Layout';
import { signup } from '../../actions/users';

const Signup = (props) => {
    const [values, setValues] = useState({
        name: '',
        email: '',
        password: '',
        redirectToReferrer: false
        
    });

    const { name, email, password,redirectToReferrer} = values;

    const handleChange = name => event => {
        setValues({ ...values, [name]: event.target.value });
    };

    const clickSubmit = event => {
        event.preventDefault();
        setValues({ ...values});
        props.dispatch(signup({ name, email, password })) 
        setValues({
                        ...values,
                        redirectToReferrer: true
                    });          
        
    };
const redirectUser = () => {
                if (redirectToReferrer) {
                return <Redirect to="/signin" />
                     }
            }

    const signUpForm = () => (
        <form>
            <div className="form-group">
                <label className="text-muted">Name</label>
                <input onChange={handleChange('name')} type="text" className="form-control" value={name} />
            </div>

            <div className="form-group">
                <label className="text-muted">Email</label>
                <input onChange={handleChange('email')} type="email" className="form-control" value={email} />
            </div>

            <div className="form-group">
                <label className="text-muted">Password</label>
                <input onChange={handleChange('password')} type="password" className="form-control" value={password} />
            </div>
            <button onClick={clickSubmit} className="btn btn-primary">
                Submit
            </button>
        </form>
    );

    return (
        <Layout
            title="Signup"
            description="Signup to Node React E-commerce App"
            className="container col-md-8 offset-md-2"
        >
            {signUpForm()}
            {redirectUser()}
        </Layout>
    );
};

export default connect()(Signup);