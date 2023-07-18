import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { withRouter } from 'react-router-dom/cjs/react-router-dom.min'
import { startGetOrders } from '../actions/orderActions'

const OrderInfo = (props) =>{
    const dispatch = useDispatch()

    const id = props.match.params.id

    useEffect(()=>{
        dispatch(startGetOrders())
    },[])
    
    const order = useSelector((state)=>{
        return state.order.data.find((ele)=>ele._id === id)
    })

    return (
        <div className="">
            <h2>{order?.title}</h2>
        </div>
    )
}

export default withRouter(OrderInfo)