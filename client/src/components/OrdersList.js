import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setOrderEditId, startGetOrders, startRemoveOrder } from '../actions/orderActions'
import CustomTable from './CustomTable'
import { setModal } from '../actions/userActions'
import ModelComponent from './ModelComponent'
import EditOrders from './EditOrders'

const OrdersList = (props) =>{

    const dispatch = useDispatch()

    useEffect(()=>{
        dispatch(startGetOrders())
    },[dispatch])

    const [user, orders, modal] = useSelector((state)=>{
        return [state.user.data, state.order.data, state.user.modal]
    })
    
    const handleEdit = (id) =>{
        dispatch(setOrderEditId(id))
        dispatch(setModal(!modal))
    }
    
    const handleRemove = (id) =>{
        dispatch(startRemoveOrder(id))
    }

    const data = orders.map((ele)=>{
        return {
            Title:ele.title,
            OrderDate:ele.orderDate.split('T')[0],
            IsFullyPaid:ele.isFullyPaid ? "✅" : "❌",
            Total:ele.total,
            Edit:<button className="btn btn-secondary" onClick={()=>handleEdit(ele._id)}>Edit</button>,
            Remove:<button className="btn btn-danger" disabled={user?.role !== "admin"} onClick={()=>handleRemove(ele._id)}>Remove</button>
        }
    })

    return (
        <div> 
           {orders.length > 0  && <CustomTable data={data} />}
           <ModelComponent component={EditOrders}/>
        </div>
    )
}

export default OrdersList