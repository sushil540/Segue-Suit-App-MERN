import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { startGetOrders } from '../actions/orderActions'

const OrdersList = (props) =>{

    const dispatch = useDispatch()

    useEffect(()=>{
        dispatch(startGetOrders())
    },[])

    const orders = useSelector((state)=>{
        return state.order.data
    })

    console.log("orders",orders)

    return (
        <div>
            {/* finish table thing */}
        </div>
    )
}

export default OrdersList