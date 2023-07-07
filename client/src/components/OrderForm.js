import React, { useState } from 'react'
import Label from './Label'
import { useDispatch, useSelector } from 'react-redux'
import validator from 'validator'
import { startAddOrder } from '../actions/orderActions'

const OrderForm = (props) =>{
    const [orderDate, setOrderDate] = useState('02-04-2022')
    const [title, setTitle] = useState('Project A1')
    const [serviceId, setServiceId] = useState('654544988651165Id')
    const [customerId, setCustomerId] = useState('654544988651165Id')
    const [total, setTotal] = useState('9000')
    const [paymentMode, setPaymentMode] = useState('RTGS')
    const [isFullyPaid, setIsFullyPaid] = useState(false)
    const [Note, setNote] = useState('simply')
    const [toggle, setToggle] = useState(false)
    
    //addProducts
    const [productId, setProductId] = useState('')
    const [amount, setAmount] = useState('')
    const [remarks, setRemarks] = useState('')
    
    const [orderLineItems, setOrderLineItems] = useState([])
    const [formErrors, setFormErrors] = useState({})
    const errors = {}

    const dispatch = useDispatch()
    
    const products = useSelector((state)=>{
        return state.product.data
    })

    const findProduct = (id) =>{
        return products.find((ele)=>ele._id === id)?.name
    } 


    // Use from redux store
    const services = [{id:1,title:'Installation'},{id:2,title:'Complaint'},{id:3,title:'Maintenance'}]
    const customers =  [{id:1,name:'Sharanu'},{id:2,name:'Rakshan'},{id:3,name:'Srajan'}]


    const runFormValidation = () =>{
        if(validator.isEmpty(orderDate)){
            errors.orderDate = "Date is required"
        }
        
        if(validator.isEmpty(title)){
            errors.title = "Title is required"
        }

        if(validator.isEmpty(serviceId)){
            errors.serviceId = "Service is required"
        }

        if(validator.isEmpty(customerId)){
            errors.customerId = "Customer is required"
        }

        if(validator.isEmpty(total)){
            errors.total = "Total is required"
        }

        if(orderLineItems.length === 0){
            errors.orderLineItems = "Atleast 1 product must be added"
        }

        setFormErrors(errors)
    }

    const handleSubmit = (e)=>{
        e.preventDefault()

        runFormValidation()
        
        if(Object.keys(errors).length === 0 && !toggle){

            const formData = {
                orderDate,
                title,
                serviceId,
                customerId,
                orderLineItems,
                total,
                paymentMode,
                isFullyPaid,
                Note
            }

            dispatch(startAddOrder(formData))

            const reset = () =>{
                setOrderDate('')
                setTitle('')
                setServiceId('')
                setCustomerId('')
                setTotal('')
                setPaymentMode('')
                setIsFullyPaid(!isFullyPaid)
                setNote('')
                setOrderLineItems([])
            }
                reset()
        }
    }

    const handleToggle = ()=>{
        setToggle(!toggle)
    }

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

    const handleAddProduct = () =>{
        addProductValidation()

        if(Object.keys(errors).length === 0){
            setOrderLineItems([...orderLineItems,{productId,amount,remarks}])
            setProductId('')
            setAmount('')   
            setRemarks('')
            setToggle(!toggle)
        }
    } 
    
    return (
        <div className="card p-4 m-auto" style={{width:"50rem"}}>
            <h2 className="m-auto">Add Orders</h2>
            <form onSubmit={handleSubmit}>
                <Label text="Order Date"/><br/>
                <input
                    type="date"
                    onChange={(e)=>setOrderDate(e.target.value)}
                    value={orderDate}
                    className="form-control"
                    placeholder="Enter order date"
                />
                {formErrors?.orderDate && <span className="text-danger">{formErrors?.orderDate}</span>}
                <br/>
                <Label text="Title"/><br/>
                <input
                    type="text"
                    onChange={(e)=>setTitle(e.target.value)}
                    value={title}
                    className="form-control"
                    placeholder="Enter title"
                />
                {formErrors?.title && <span className="text-danger">{formErrors?.title}</span>}
                <br/>
                <Label text="Service"/>
                <br/>
                {formErrors?.serviceId && <span className="text-danger">{formErrors?.serviceId}</span>}
                {services.map((ele)=>{
                    return (
                        <span key={ele.id} className="d-flex gap-2">
                            <input 
                                className="form-check-input"
                                type="radio"
                                name="services"
                                value={ele.title}
                                checked={ele.title === serviceId}
                                onChange={(e)=>setServiceId(e.target.value)}
                            /> 
                            <Label text={ele.title} /><br/>
                        </span>
                    )
                })}
                <br/>
                <Label text="Customer"/>
                <br/>
                <select
                    className="form-select"
                    value={customerId} 
                    onChange={(e)=>setCustomerId(e.target.value)}>
                    <option value="">Select Customer</option> 
                    {customers.map((ele)=>{
                        return (
                        <option 
                        key={ele.id}
                        value={ele.id}>{ele.name}
                        </option> 
                        )
                    })}
                </select>
                {formErrors?.customerId && <span className="text-danger">{formErrors?.customerId}</span>}
                <br/>
                <div className="row p-4 gap-2" style={{border:"5px dotted rgba(230,230,230,4)"}}>
                    {orderLineItems.length > 0 && 
                      orderLineItems.map((ele=>{
                        return <div key={ele.productId}
                                    className="card p-2" style={{width:"10rem"}}>
                                <p>{findProduct(ele.productId)}</p>
                        </div>
                        })) 
                    }
                    {!toggle &&  
                        <span className="d-flex align-items-center gap-2">
                            <Label text="Products"/>
                            <button 
                                type="button"
                                className="btn btn-primary" 
                                onClick={handleToggle}>+</button>
                        </span>
                    }
                    {toggle &&  
                        <div>
                            <h3 className="text-center"> Add Product </h3>
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
                            <div className="d-flex align-items-center gap-2">
                                <button 
                                    type="button"
                                    className="btn btn-primary"
                                    onClick={handleAddProduct}>Add</button>
                                <button 
                                    type="button"
                                    className="btn btn-secondary"
                                    onClick={handleToggle}>Cancel</button>
                            </div>
                        </div>}
                </div> 
                {formErrors?.orderLineItems && <span className="text-danger">{formErrors?.orderLineItems}</span>}
                <br/>
                <Label text="Payment Mode (Optional)"/><br/>
                <input
                    className="form-control"
                    type="text"
                    value={paymentMode}
                    onChange={(e)=>setPaymentMode(e.target.value)}
                />
                <br/>
                <div className="d-flex flex-row gap-2">
                    <Label text="FullyPaid (Optional)"/><br/>
                    <input
                        type="radio"
                        name="isFullyPaid"
                        value={isFullyPaid}
                        className="form-check-input"
                        onChange={(e)=>setIsFullyPaid(e.target.value)}
                    />
                    <Label text="Yes"/>
                    <br/>
                    <input
                        type="radio"
                        name="isFullyPaid"
                        value={isFullyPaid}
                        className="form-check-input"
                        onChange={(e)=>setIsFullyPaid(e.target.value)}
                    />
                    <Label text="No"/>
                </div>
                <br/>
                <Label text="Total Amount"/><br/>
                <input
                    className="form-control"
                    type="text"
                    value={total}
                    onChange={(e)=>setTotal(e.target.value)}
                />
                {formErrors?.total && <span className="text-danger">{formErrors?.total}</span>}
                <br/>
                <Label text="Note (Optional)"/><br/>
                <input
                    className="form-control"
                    type="text"
                    value={Note}
                    onChange={(e)=>setNote(e.target.value)}
                />
                <br/>
                <input 
                    className="btn btn-primary"
                    type="submit"
                    value="Add Order"
                />
            </form>
        </div>
    )
}

export default OrderForm