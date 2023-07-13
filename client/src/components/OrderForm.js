import React, { useEffect, useMemo, useState } from 'react'
import Label from './Label'
import { useDispatch, useSelector } from 'react-redux'
import validator from 'validator'
import { startAddOrder } from '../actions/orderActions'
import OrderLineItems from './OrderLineItems'
import OrderItemsDisplay from './OrderItemsDisplay'
import { startGetStaff } from '../actions/staffActions'
import { startGetCustomers } from '../actions/customerActions'

const OrderForm = (props) =>{
    const [orderDate, setOrderDate] = useState('')
    const [title, setTitle] = useState('Project A1')
    const [serviceId, setServiceId] = useState('')
    const [customerId, setCustomerId] = useState('')
    const [staffId, setStaffId] = useState('')
    const [total, setTotal] = useState('')
    const [paymentMode, setPaymentMode] = useState('')
    const [isFullyPaid, setIsFullyPaid] = useState(false)
    const [Note, setNote] = useState('')
    const [orderLineItems, setOrderLineItems] = useState([])

    const [toggle, setToggle] = useState(false)
    const [formErrors, setFormErrors] = useState({})
    const errors = {}
    const dispatch = useDispatch()

    const [user, staffs, customers] = useSelector((state)=>{
        return [state.user.data, state.staff.data, state.customer.data]
    })

    useEffect(()=>{
        user?.role === "admin" && dispatch(startGetStaff())
        dispatch(startGetCustomers())
    },[dispatch])
       
    const services = [{id:1,title:'Installation'},{id:2,title:'Complaint'},{id:3,title:'Maintenance'}]

    const calc = useMemo(()=>{
        const data = orderLineItems.reduce((pre,curr)=>pre + Number(curr.amount),0)
        setTotal(String(data))
        return data
    },[orderLineItems])
    
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

    const handleToggle = () =>setToggle(!toggle)

    const handleRemoveProduct = (id) =>{
        const orderItems = orderLineItems.filter((ele)=>ele.productId !== id) 
        setOrderLineItems(orderItems)
    }

    const submitProductForm = (obj) =>{
        setOrderLineItems([...orderLineItems, obj])
    }

    console.log("customers",customers)
    
    const handleSubmit = (e)=>{
        e.preventDefault()

        runFormValidation()
        
        if(Object.keys(errors).length === 0){
            const formData = {
                orderDate,
                title,
                serviceId,
                customerId,
                orderLineItems,
                total,
                paymentMode,
                isFullyPaid,
                assignedTo : user.role !== "admin" ? user.id : staffId,
                Note
            }
            
            dispatch(startAddOrder(formData))

                setOrderDate('')
                setTitle('')
                setServiceId('')
                setCustomerId('')
                setTotal('')
                setPaymentMode('')
                setIsFullyPaid(!isFullyPaid)
                setNote('')
                setStaffId('')
                setOrderLineItems([])
        }
    }

    return (
        <div className="card p-4" style={{width:"40rem"}}>
            <h2 className="m-auto">Add Orders</h2>
            <OrderItemsDisplay orderLineItems={orderLineItems} handleRemoveProduct={handleRemoveProduct} />
            <div className="p-4 gap-2" style={{border:"5px dotted rgba(230,230,230,4)"}}> 
            {toggle && <OrderLineItems 
                submitProductForm={submitProductForm}
                orderLineItems={orderLineItems}
                handleToggle={handleToggle} />}
            {!toggle &&  
                <span className="d-flex align-items-center gap-2">
                    <Label text="Products"/>
                    <button 
                        type="button"
                        className="btn btn-primary" 
                        onClick={handleToggle}>+</button>
                </span>
            }
            {formErrors?.orderLineItems && <span className="text-danger">{formErrors?.orderLineItems}</span>}
            {toggle && <div className="d-flex flex-row">
                <button 
                    type="button"
                    className="btn btn-secondary"
                    onClick={handleToggle}>Cancel</button>
                    </div>}
            </div>
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
                            key={ele._id}
                            value={ele._id}>{ele.name}
                            </option> 
                        )
                    })}
                </select>
                {formErrors?.customerId && <span className="text-danger">{formErrors?.customerId}</span>}
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
                {user.role === "admin" && <div>
                    <Label text="Assign To"/>
                    <br/>   
                    <select
                        className="form-select"
                        value={staffId} 
                        onChange={(e)=>setStaffId(e.target.value)}>
                        <option value="">Select Staff</option> 
                        {staffs.map((ele)=>{
                            return (
                                <option 
                                    key={ele._id}
                                    value={ele._id}>{ele.username}
                                </option> 
                            )
                        })}
                    </select>
                </div>}
                <br/>
                <Label text="Total Amount"/><br/>   
                <input
                    className="form-control"
                    type="text"
                    value={calc}
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