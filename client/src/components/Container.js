import React from 'react'
import { Link, Route } from 'react-router-dom/cjs/react-router-dom.min'
import Register from './Register'
import Login from './Login'

import ProductContainer from './ProductContainer'

import PrivateRoute from './helpers/PrivateRoute'
import Dashboard from './Dashboard'
import { useDispatch, useSelector } from 'react-redux'
import { setLoggedInUser } from '../actions/userActions'
import CustomerContainer from './CustomerContainer'
import OrderContainer from './OrderContainer'
import { toast } from 'react-hot-toast'
import EnquiryContainer from './EnquiryContainer'
import StaffContainer from './StaffContainer'
import ProtectedRoute from './helpers/ProtectedRoute'

const Container = (props) =>{

    const dispatch = useDispatch()

    const user = useSelector((state)=>{
        return state.user.data
    })

    const handleLogout = () =>{
        localStorage.removeItem('token')
        dispatch(setLoggedInUser({}))
        toast.success("Successfully LoggedOut")
    }

    return (
        <div className="mb-2">     
            <div className="navbar navbar-expand-lg bg-body-tertiary p-3 mb-2 bg-info text-dark shadow-sm">
                <Link className="navbar-brand nav-link">Segue Suit</Link>
                <div className="navbar-nav">
                    {Object.keys(user).length > 0 ? (
                        <>
                            <Link className="nav-link fw-bold" to="/dashboard">Dashboard</Link>
                            <Link className="nav-link fw-bold" to="/products">Product</Link>
                            <Link className="nav-link fw-bold" to="/customers">Customer</Link>
                            <Link className="nav-link fw-bold" to="/enquiries">Enquiry</Link>
                            <Link className="nav-link fw-bold" to="/orders">Order</Link>
                            {user?.role === "admin" && <Link className="nav-link fw-bold" to="/staffs">Staff</Link>}
                            <Link className="nav-link fw-bold" to="/" onClick={handleLogout}>Logout</Link>
                        </>
                    ) : (
                        <>
                            <Link className="nav-link fw-bold" to="/register">Register</Link>
                            <Link className="nav-link fw-bold" to="/">Login</Link>
                        </>
                    ) }                    
                </div>
            </div>     

            {/* <Route path="/" component={} exact={true}/>     HOME       */}
            <Route path="/" component={Login} exact={true}/>
            <Route path="/register" component={Register} exact={true}/>
            <PrivateRoute path="/products" component={ProductContainer} exact={true}/>
            <PrivateRoute path="/orders" component={OrderContainer} exact={true}/>
            <PrivateRoute path="/dashboard" component={Dashboard} exact={true}/>
            <PrivateRoute path="/customers" component={CustomerContainer} exact={true}/>
            <PrivateRoute path="/enquiries" component={EnquiryContainer} exact={true}/>
            <ProtectedRoute path='/staffs' permitted={user?.role} component={StaffContainer} exact={true} />
        </div>
    )
}

export default Container