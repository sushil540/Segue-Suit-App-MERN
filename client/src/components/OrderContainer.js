import React from 'react'
import OrderForm from './OrderForm'
import OrdersList from './OrdersList'

const OrderContainer = (props) =>{
    return (
        <div className="row">
            <div className="col-md-6">
                <OrderForm/>
            </div>
            <div className="col-md-6">
                <OrdersList/>
            </div>
        </div>
    )
}

export default OrderContainer