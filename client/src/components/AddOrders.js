import React from 'react'
import OrderForm from './OrderForm'
import { startAddOrder } from '../actions/orderActions'
import { useDispatch } from 'react-redux'

const AddOrders = (props) =>{

    const dispatch = useDispatch()

    const formSubmission = (formData) =>{
        dispatch(startAddOrder(formData))
        //dispatch
    }
    
    return (
        <div className="card">
            <h2 className="mx-auto">Add Orders</h2>
            <OrderForm formSubmission={formSubmission}/>
        </div>
    )
}

export default AddOrders