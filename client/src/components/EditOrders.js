import React from 'react'
import OrderForm from './OrderForm'
import { useDispatch, useSelector } from 'react-redux'
import { startEditOrder } from '../actions/orderActions'
import { setModal } from '../actions/userActions'

const EditOrders = (props) =>{

    const dispatch = useDispatch()

    const [order, modal] = useSelector((state)=>{
        return [state.order.data.find((ele)=>ele._id === state.order.id), state.user.modal]
    })

    const formSubmission = (formData) =>{
        dispatch(setModal(!modal))
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