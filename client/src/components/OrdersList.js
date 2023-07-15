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

    const data = orders.map((ele)=>{
        return {
            Title:ele.title,
            OrderDate:ele.orderDate.split('T')[0],
            IsFullyPaid:ele.isFullyPaid ? "✅" : "❌",
            Total:ele.total,
            Edit:<button className="btn btn-secondary">Edit</button>,
            Remove:<button className="btn btn-danger">Remove</button>
        }
    })

    return (
        <div> 
           {orders.length > 0  && <CustomTable data={data} />}
        </div>
    )
}

export default OrdersList