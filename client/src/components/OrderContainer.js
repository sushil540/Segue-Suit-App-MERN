import React from 'react'
import OrderForm from './OrderForm'
import OrdersList from './OrdersList'
import OrderSearch from './OrderSearch'

const OrderContainer = (props) =>{
    return (
        <div className="row">
            <div className="col-md-6">
                <OrderForm/>
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