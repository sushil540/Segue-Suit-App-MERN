import React from 'react'
import { useSelector } from 'react-redux'

const OrderItemsDisplay = (props) =>{
    const { orderLineItems , handleRemoveProduct} = props

    console.log("orderLineItems",orderLineItems)
 
    const products = useSelector((state)=>{
        return state.product.data
    })

    const findProduct = (id)=>products?.find((ele)=>ele?._id === id)

    const removeProduct = (id) =>{
        handleRemoveProduct(id)
    }

    return (
        <div className="p-4">
            <div className="row gap-4 bg-secondary-subtle border p-2">
                <h4> List of Selected Product(s) - {orderLineItems.length} </h4>
                {orderLineItems.map((ele=>{
                return <div key={ele?.productId}
                            className="card p-2 d-flex justify-content-between align-items-end" 
                            style={{width:"8rem"}}>
                        <h4 className="text-center">{findProduct(ele?.productId)?.name }</h4>
                        <button className="btn btn-transparent border-0 m-2" onClick={()=>removeProduct(ele.productId)}>&#10006;</button>
                </div>
                }))}
            </div>
        </div>
    )
}

export default OrderItemsDisplay