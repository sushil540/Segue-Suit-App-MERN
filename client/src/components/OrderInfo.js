import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { withRouter } from 'react-router-dom/cjs/react-router-dom.min'
import { startGetOrders } from '../actions/orderActions'
import { startGetCustomers } from '../actions/customerActions'
import { startGetServices } from '../actions/serviceAction'

const OrderInfo = (props) =>{
    const dispatch = useDispatch()

    const id = props.match.params.id

    useEffect(()=>{
        dispatch(startGetOrders())
        dispatch(startGetCustomers())
        dispatch(startGetServices())
    },[dispatch])
    
    const [order, customer, service] = useSelector((state)=>{
        return [
                state.order.data.find((ele)=>ele._id === id), 
                state.customer.data.find((ele)=>ele?._id === order?.customerId),
                state.service.data.find((ele)=>ele?._id === order?.serviceId)
            ]
    })

    console.log("order",order, customer, service)

    return (
        <div className="card ">
            <h2>{order?.title}</h2>
            <blockquote>
                <b>Order Date :</b> {order?.orderDate.split('T')[0]} <br/>
                <b>Total :</b> {order?.total} <br/>
                <b>Payment Mode :</b> <b>{order?.paymentMode}</b> <br/>
                <b>Service : </b> 
            </blockquote>
        </div>
    )
}

export default withRouter(OrderInfo)