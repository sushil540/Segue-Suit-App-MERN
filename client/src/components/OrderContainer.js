import React from 'react'
import OrdersList from './OrdersList'
import OrderSearch from './OrderSearch'
import AddOrders from './AddOrders'

const OrderContainer = (props) =>{
    return (
        <div className="row">
            <div className="col-md-6 border-end border-5">
                <AddOrders/>
            </div>
            <div className="col-md-6">
                <OrderSearch/>
                <hr/>
                <OrdersList/>
            </div>
        </div>
    )
}

export default OrderContainer