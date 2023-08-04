import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { X } from 'lucide-react'
import { startGetProducts } from '../actions/productActions'

const OrderItemsDisplay = (props) =>{
    const { orderLineItems , handleRemoveProduct} = props

    const dispatch = useDispatch()

    useEffect(()=>{
        dispatch(startGetProducts())
    },[dispatch])
    
    const products = useSelector((state)=>{
        return state.product.data
    })

    const findProduct = (id)=>products?.find((ele)=>ele?._id === id)?.name

    const removeProduct = (id) =>{
        handleRemoveProduct(id)
    }

    return (
        <div className="p-4">
            <div className="row gap-4 bg-secondary-subtle border p-2">
                <h4> List of Selected Product(s) - {orderLineItems.length} </h4>
                {orderLineItems.map((ele=>{
                return <div key={ele?.productId}
                            className="card p-2 d-flex justify-content-between align-items-end text-justify" 
                            style={{width:"10rem"}}>
                            <p>Product: <b className="text-primary">{findProduct(ele?.productId)}</b></p>
                            <p>Amount: <b className="text-danger">{ele.amount}</b></p>
                        <button 
                            className="btn btn-transparent border-0 m-2" 
                            onClick={()=>removeProduct(ele.productId)}>
                                <X />
                            </button>
                </div>
                }))}
            </div>
        </div>
    )
}

export default OrderItemsDisplay