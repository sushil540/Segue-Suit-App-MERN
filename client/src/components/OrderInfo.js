import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { withRouter } from 'react-router-dom/cjs/react-router-dom.min'
import { startGetOrders } from '../actions/orderActions'
import { startGetCustomers } from '../actions/customerActions'
import { startGetServices } from '../actions/serviceAction'
import Stepper from './Stepper'

const OrderInfo = (props) =>{
    const dispatch = useDispatch()

    const id = props.match.params.id

    useEffect(()=>{
        dispatch(startGetOrders())
        dispatch(startGetCustomers())
        dispatch(startGetServices())
    },[dispatch])
    
    const [order, customers, services] = useSelector((state)=>{
        return [
            state.order.data.find((ele)=>ele._id === id),
            state.customer.data,
            state.service.data
        ]
    })

    const findName = (id, array) =>{
        return array.find((ele)=>ele?._id === id)?.name
    }

    return (
        <div className="card p-4 w-50 m-auto">
            <h2 className="border-bottom">Project Name - {order?.title}</h2>
            <div>
                <b className="">Order Date : </b> {order?.orderDate?.split('T')[0]} <br/>  
                <b>Total :</b> {order?.total} <br/>
                <b>Payment Mode :</b> <b>{order?.paymentMode}</b> <br/> 
                <b>Customer : {findName(order?.customerId, customers)}</b> <br/>
                <b>Service :</b> {findName(order?.serviceId, services)}
            </div>
            <Stepper status={order?.status} />
        </div>
    )
}

export default withRouter(OrderInfo)

