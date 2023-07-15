import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { startGetOrders } from '../actions/orderActions'
import CustomTable from './CustomTable'

const OrdersList = (props) =>{

    const dispatch = useDispatch()

    useEffect(()=>{
        dispatch(startGetOrders())
    },[dispatch])

    const orders = useSelector((state)=>{
        return state.order.data
    })

    return (
        <div> 
           {orders.length > 0  && <CustomTable 
                data={orders.map((ele)=>{
                    return {
                        title:ele.title,
                        orderDate:ele.orderDate.split('T')[0],
                        isFullyPaid:ele.isFullyPaid ? "✅" : "❌",
                        total:ele.total
                    }
                })} />}
        </div>
    )
}

export default OrdersList