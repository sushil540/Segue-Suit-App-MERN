import React from 'react'
import { Link, Route } from 'react-router-dom/cjs/react-router-dom.min'
import Register from './Register'
import Login from './Login'

const Navbar = (props) =>{
    return (
        <div>   
            <div className="navbar navbar-expand-lg bg-body-tertiary">
                <Link className="navbar-brand" to="/">Segue Suit</Link>
                <div className="navbar-nav">
                    <Link className="nav-link" to="/register">Register</Link>
                    <Link className="nav-link" to="/login">Login</Link>
                    <Link className="nav-link">Product</Link>
                    <Link className="nav-link">Link</Link>
                    <Link className="nav-link">Link</Link>
                </div>
            </div>     

            <Route path="/register" component={Register} exact={true}/>
            <Route path="/login" component={Login} exact={true}/>
            <Route path="/" />
        </div>
    )
}

export default Navbar