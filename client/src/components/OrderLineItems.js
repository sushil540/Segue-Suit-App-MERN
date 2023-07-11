import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import validator from 'validator'
import Label from './Label'

const OrderLineItems = (props) =>{
    const { submitProductForm , handleToggle} = props
    const [productId, setProductId] = useState('')
    const [amount, setAmount] = useState('')
    const [remarks, setRemarks] = useState('')
    const [formErrors, setFormErrors] = useState({})
    const errors = {}
    
    const products = useSelector((state)=>{
        return state.product.data
    })

    const addProductValidation = () =>{
        if(validator.isEmpty(productId)){
            errors.productId = "Product is required"
        }

        if(validator.isEmpty(amount)){
            errors.amount = "Amount is required"
        }else if(!validator.isNumeric(amount)){
            errors.amount = "Amount must be number" 
        }
        setFormErrors(errors)
    }

    const handleProductSubmit = (e) =>{
        e.preventDefault()
        addProductValidation()

        if(Object.keys(errors).length === 0){
            
            setProductId('')
            setAmount('')   
            setRemarks('')
            submitProductForm({productId,amount,remarks})
            handleToggle()
        }
    }

    return (
        <div className="row gap-2">
            <h3 className="text-center"> Add Product </h3>
            <form onSubmit={handleProductSubmit}> 
                    <Label text="Products"/> <br/>
                    <select 
                        className="form-select"
                        value={productId} 
                        onChange={(e)=>setProductId(e.target.value)}>
                        <option value="">Select Product</option> 
                        {products.map((ele)=>{
                            return (
                                <option 
                                    key={ele._id}
                                    value={ele._id}>{ele.name}
                                </option> 
                            )
                        })}
                    </select> 
                    {formErrors?.productId && <span className="text-danger">{formErrors?.productId}</span>}
                <br/>
                    <Label text="Amount"/>
                    <input 
                        className="form-control"
                        type="text"
                        value={amount}
                        placeholder="Enter amount"
                        onChange={(e)=>setAmount(e.target.value)}
                />
                {formErrors?.amount && <span className="text-danger">{formErrors?.amount}</span>}
                    <br/>
                    <Label text="Remarks (Optional)"/>
                    <input 
                        className="form-control"
                        type="text"
                        value={remarks}
                        placeholder="Enter remarks"
                        onChange={(e)=>setRemarks(e.target.value)}
                /><br/> 
                    <input 
                        className="btn btn-primary"
                        type="submit"
                        value="Add"/>
                </form>
            </div> 
    )
 
}

export default OrderLineItems