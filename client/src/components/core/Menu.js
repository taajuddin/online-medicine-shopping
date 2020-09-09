import React, { Fragment } from "react";
import { Link, withRouter } from "react-router-dom";
import {connect} from 'react-redux'

import {itemTotal} from './cartHelper'
// import { signout} from "../../actions/users";



// const isActive=(history,path)=>{
// 	if(history.location.pathname==path){
// 		return {color:'#ff9900'}
// 	}
// 	return {color:'#ffffff'}
// }


const Menu=(props)=>{


    const handleLogout=()=>{
     localStorage.removeItem('jwt')
        window.location.href = '/'
    }
console.log(props.user.name)
	return(
		<div>
        <ul className="nav nav-tabs bg-primary">
            <li className="nav-item">
                <Link className="nav-link" style={{ cursor: "pointer", color: "#ffffff" }} to="/">Home </Link>
            </li>
            <li className="nav-item">
                <Link className="nav-link" style={{ cursor: "pointer", color: "#ffffff" }} to="/shop">Shop </Link>
            </li>
             <li className="nav-item">
                <Link className="nav-link" style={{ cursor: "pointer", color: "#ffffff" }} to="/cart">
                    Cart <sup><small className="cart-badge">{itemTotal()}</small></sup> 
                </Link>
            </li>
            {localStorage.getItem('jwt')&& props.user && props.user.role=== 0 && (
                 <Fragment>
                <li className="nav-item">
                <Link className="nav-link" style={{ cursor: "pointer", color: "#ffffff" }}  to="/user/dashboard">Dashboard</Link>
                 </li>
                 <li className="nav-item">
                    <span
                        className="nav-link"
                        style={{ cursor: "pointer", color: "#ffffff" }}
                        onClick={handleLogout}
                    >
                        Signout
                    </span>
                </li>
                </Fragment>
                )}
            {localStorage.getItem('jwt')&& props.user && props.user.role=== 1  && (
                <Fragment>
                <li className="nav-item">
                <Link className="nav-link" style={{ cursor: "pointer", color: "#ffffff" }} to="/admin/dashboard">Dashboard</Link>
                 </li>
                 <li className="nav-item">
                    <span
                        className="nav-link"
                        style={{ cursor: "pointer", color: "#ffffff" }}
                        onClick={handleLogout}
                    >
                        Signout
                    </span>
                </li>
                </Fragment>
                )}

            {!localStorage.getItem('jwt')&& (
                <Fragment>
                    <li className="nav-item">
                        <Link
                            className="nav-link"
                            style={{ cursor: "pointer", color: "#ffffff" }}
                            to="/signin"
                        >
                            Signin
                        </Link>
                    </li>

                    <li className="nav-item">
                        <Link
                            className="nav-link"
                            style={{ cursor: "pointer", color: "#ffffff" }}
                            to="/signup"
                        >
                            Signup
                        </Link>
                    </li>
                </Fragment>
            )}
        </ul>
	</div>
	)
}
const mapStateToProps=(state)=>{
    return {
        user:state.users
    }
}

export default connect(mapStateToProps)(Menu)


