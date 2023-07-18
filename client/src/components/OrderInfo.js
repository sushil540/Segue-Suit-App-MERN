import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { withRouter } from 'react-router-dom/cjs/react-router-dom.min'
import { startGetOrders } from '../actions/orderActions'

const OrderInfo = (props) =>{

    const id = props.match.params.id

    const dispatch = useDispatch()

    useEffect(()=>{
        dispatch(startGetOrders())
    },[])
    
    const order = useSelector((state)=>{
        return state.order.data.find((ele)=>ele._id === id)
    })

    console.log("order",order)

    return (
        <div className="">
            <h2>{order?.title}</h2>
        </div>
    )
}

export default withRouter(OrderInfo)