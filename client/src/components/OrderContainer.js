import React from 'react'
import OrderForm from './OrderForm'
import OrdersList from './OrdersList'

const OrderContainer = (props) =>{
    return (
        <div className="row">
            <div>
                <OrderForm/>
            </div>
            <div>
                <OrdersList/>
            </div>
        </div>
    )
}

export default OrderContainer