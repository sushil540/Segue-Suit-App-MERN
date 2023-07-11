import React, { useEffect } from 'react'
import { startGetProducts } from '../actions/productActions'
import { startGetCustomers } from '../actions/customerActions'
import { startGetEnquiries } from '../actions/enquiryAction'
import { useDispatch, useSelector } from 'react-redux'
import { withRouter } from 'react-router-dom'

const Dashboard = (props) =>{

    const dispatch = useDispatch()
    
    useEffect(()=>{
        dispatch(startGetProducts())
        dispatch(startGetCustomers())
        dispatch(startGetEnquiries())
    },[dispatch])

    const [customers, products, enquiries] = useSelector((state)=>{
        return [state.customer.data, state.product.data, state.enquiry.data]
    })

    const handleClickOrders = (e) =>{
        console.log(e.target.name)
        props.history.push('/orders')
    }

    return (
        <div className="container card my-5">
            <div className="row p-4">
                <div className="col-md-3">
                    <div className="card text-bg-success mb-3" 
                        style={{maxWidth:"18rem",cursor:"pointer"}}
                        onClick={handleClickOrders}>
                    <h2 className="card-header">Orders</h2>
                    <div className="card-body">
                        <h5 className="card-title">Total Orders</h5>
                        <h4>0</h4>
                    </div>
                    </div>
                </div>
                <div className="col-md-3">
                    <div className="card mb-3" style={{maxWidth:"18rem",cursor:"pointer"}}>
                    <h2 className="card-header">Enquiries</h2>
                    <div className="card-body">
                        <h5 className="card-title">Total Enquiries</h5>
                        <h4>{enquiries.length}</h4>
                    </div>
                    </div>
                </div>  
                <div className="col-md-3">
                    <div className="card text-bg-primary mb-3" style={{maxWidth:"18rem",cursor:"pointer"}}>
                    <h2 className="card-header">Customers</h2>
                    <div className="card-body">
                        <h5 className="card-title">Total Customers</h5>
                        <h4>{customers.length}</h4>
                    </div>
                    </div>
                </div>  
                <div className="col-md-3">
                    <div className="card mb-3" style={{maxWidth:"18rem",cursor:"pointer"}}>
                    <h2 className="card-header">Products</h2>
                    <div className="card-body">
                        <h5 className="card-title">Total Products</h5>
                        <h4>{products.length}</h4>
                    </div>
                    </div>
                </div>    
            </div>
        </div>
    )
}

export default withRouter(Dashboard)