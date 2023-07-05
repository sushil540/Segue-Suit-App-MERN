import React from 'react'
import { Link, Route } from 'react-router-dom/cjs/react-router-dom.min'
import Register from './Register'
import Login from './Login'
import Products from './Products'
import PrivateRoute from './helpers/PrivateRoute'
import Dashboard from './Dashboard'
import { useDispatch, useSelector } from 'react-redux'
import { setLoggedInUser } from '../actions/userActions'

const Container = (props) =>{

    const dispatch = useDispatch()

    const user = useSelector((state)=>{
        return state.user.data
    })

    const handleLogout = () =>{
        localStorage.removeItem('token')
        dispatch(setLoggedInUser({}))
    }

    return (
        <div className="mb-2">     
            <div className="navbar navbar-expand-lg bg-body-tertiary">
                <Link className="navbar-brand" to="/">Segue Suit</Link>
                <div className="navbar-nav">
                    {Object.keys(user).length > 0 ? (
                        <>
                            <Link className="nav-link" to="/dashboard">Dashboard</Link>
                            <Link className="nav-link" to="/products">Product</Link>
                            <Link className="nav-link" onClick={handleLogout}>logout</Link>
                        </>
                    ) : (
                        <>
                            <Link className="nav-link" to="/register">Register</Link>
                            <Link className="nav-link" to="/login">Login</Link>
                        </>
                    ) }                    
                </div>
            </div>     

            <Route path="/register" component={Register} exact={true}/>
            <Route path="/login" component={Login} exact={true}/>
            <PrivateRoute path="/products" component={Products} exact={true}/>
            <PrivateRoute path="/dashboard" component={Dashboard} exact={true}/>
        </div>
    )
}

export default Container