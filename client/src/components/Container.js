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
import OrderInfo from './OrderInfo'
import { AirVent, FileSignature, Gauge, LogOut, PanelTopOpen, User, Users2 } from 'lucide-react'

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
                <Link className="navbar-brand nav-link fw-bolder">Segue Suit</Link>
                <div className="navbar-nav">
                    {Object.keys(user).length > 0 ? (
                        <>
                            <span className="d-flex gap-2 align-items-center">
                                <Link className="nav-link fw-bold" to="/dashboard">
                                        <Gauge size={20} /> Dashboard 
                                </Link>
                                <Link className="nav-link fw-bold" to="/products">
                                    <AirVent size={20} /> Product 
                                </Link>
                                <Link className="nav-link fw-bold" to="/customers">
                                    <User size={20} /> Customer 
                                </Link>
                                <Link className="nav-link fw-bold" to="/enquiries">
                                    <FileSignature size={20} strokeWidth={2.25} /> Enquiry 
                                </Link>
                                <Link className="nav-link fw-bold" to="/orders">
                                    <PanelTopOpen size={20}/> Order</Link>
                                {user?.role === "admin" && <Link className="nav-link fw-bold" to="/staffs"> 
                                                                <Users2 size={20} /> Staff
                                                            </Link>}
                                <Link className="nav-link fw-bold" to="/" onClick={handleLogout}><LogOut size={20} /> Logout</Link>
                            </span>
                        </>
                    ) : (
                        <>
                            <Link className="nav-link fw-bold" to="/register">Register</Link>
                            <Link className="nav-link fw-bold" to="/">Login</Link>
                        </>
                    )}                    
                </div>
            </div>     

            <Route path="/" component={Login} exact={true}/>
            <Route path="/register" component={Register} exact={true}/>
            <PrivateRoute path="/products" component={ProductContainer} exact={true}/>
            <PrivateRoute path="/orders" component={OrderContainer} exact={true}/>
            <PrivateRoute path="/dashboard" component={Dashboard} exact={true}/>
            <PrivateRoute path="/customers" component={CustomerContainer} exact={true}/>
            <PrivateRoute path="/enquiries" component={EnquiryContainer} exact={true}/>
            <PrivateRoute path="/orders/:id" component={OrderInfo} exact={true}/>
            <ProtectedRoute path='/staffs' permitted={user?.role} component={StaffContainer} exact={true} />
        </div>
    )
}

export default Container