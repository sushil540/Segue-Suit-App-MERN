import React from 'react'
import OrderForm from './OrderForm'
import { useDispatch, useSelector } from 'react-redux'
import { startEditOrder } from '../actions/orderActions'

const EditOrders = (props) =>{

    const dispatch = useDispatch()

    const [order] = useSelector((state)=>{
        return [state.order.data.find((ele)=>ele._id === state.order.editId)]
    })

    const formSubmission = (formData) =>{
        dispatch(startEditOrder(formData))
    }

    return (
        <div>   
            <h2 className="text-center"> Edit Orders </h2>
            <hr/>
            <OrderForm 
                data={order} 
                formSubmission={formSubmission} />
        </div>
    )
}

export default EditOrders