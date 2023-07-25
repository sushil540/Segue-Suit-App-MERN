import React, { useEffect } from 'react'
import { startGetProducts } from '../actions/productActions'
import { startGetCustomers } from '../actions/customerActions'
import { startGetEnquiries } from '../actions/enquiryAction'
import { useDispatch, useSelector } from 'react-redux'
import { withRouter } from 'react-router-dom'
import LineChart from './LineChart'
import { startGetOrders } from '../actions/orderActions'

const Dashboard = (props) =>{

    const dispatch = useDispatch()
    
        const [customers, products, enquiries, order] = useSelector((state)=>{
            return [
                    state.customer.data, 
                    state.product.data, 
                    state.enquiry.data, 
                    state.order.data
                ]
        })
    
    useEffect(()=>{
        dispatch(startGetProducts())
        dispatch(startGetCustomers())
        dispatch(startGetEnquiries())
        dispatch(startGetOrders())
    },[dispatch])

    const handleClickOrders = () =>{
        props.history.push('/orders')
    }

    const handleClickEnquiries = () =>{
        props.history.push('/enquiries')
    }

    const handleClickCustomers = () =>{
        props.history.push('/customers')
    }
    
    const handleClickProducts = () =>{
        props.history.push('/products')
    }

    return (
        <div className="container card my-5 shadow p-3 mb-5 bg-body-tertiary rounded">   
            <div className="row p-4">
                <div className="col-md-3">
                    <div className="card text-bg-success mb-3" 
                        style={{maxWidth:"18rem",cursor:"pointer"}}
                        onClick={handleClickOrders}>
                    <h2 className="card-header">Orders</h2>
                    <div className="card-body">
                        <h5 className="card-title">Total Orders</h5>
                        <h4>{order.length}</h4>
                    </div>
                    </div>
                </div>
                <div className="col-md-3">
                    <div className="card mb-3" 
                    style={{maxWidth:"18rem",cursor:"pointer"}}
                    onClick={handleClickEnquiries}>
                    <h2 className="card-header">Enquiries</h2>
                    <div className="card-body">
                        <h5 className="card-title">Total Enquiries</h5>
                        <h4>{enquiries.length}</h4>
                    </div>
                    </div>
                </div>  
                <div className="col-md-3">
                    <div className="card text-bg-primary mb-3"
                     style={{maxWidth:"18rem",cursor:"pointer"}}
                     onClick={handleClickCustomers}>
                    <h2 className="card-header">Customers</h2>
                    <div className="card-body">
                        <h5 className="card-title">Total Customers</h5>
                        <h4>{customers.length}</h4>
                    </div>
                    </div>
                </div>  
                <div className="col-md-3">
                    <div className="card mb-3"
                     style={{maxWidth:"18rem",cursor:"pointer"}}
                     onClick={handleClickProducts}>
                    <h2 className="card-header">Products</h2>
                    <div className="card-body">
                        <h5 className="card-title">Total Products</h5>
                        <h4>{products.length}</h4>
                    </div>
                    </div>
                </div>    
            </div>
            <LineChart/>
        </div>
    )
    
}

export default withRouter(Dashboard)