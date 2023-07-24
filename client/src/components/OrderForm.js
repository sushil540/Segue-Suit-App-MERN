import React, { useEffect, useMemo, useState } from 'react'
import Label from './Label'
import { useDispatch, useSelector } from 'react-redux'
import validator from 'validator'
import OrderLineItems from './OrderLineItems'
import OrderItemsDisplay from './OrderItemsDisplay'
import { startGetStaff } from '../actions/staffActions'
import { setId, startGetCustomers } from '../actions/customerActions'
import { startGetServices } from '../actions/serviceAction'
import { Plus } from 'lucide-react'

const OrderForm = (props) =>{
    const { formSubmission, data } = props

    const [orderDate, setOrderDate] = useState(data?.orderDate ? data?.orderDate.split('T')[0] : "")
    const [title, setTitle] = useState(data?.title ? data?.title : "")
    const [serviceId, setServiceId] = useState(data?.serviceId ? data?.serviceId : "")    
    const [customerId, setCustomerId] = useState(data?.customerId ? data?.customerId : "" )
    const [staffId, setStaffId] = useState(data?.assignedTo ? data?.assignedTo : "")
    const [total, setTotal] = useState(data?.total ? data?.total : "")
    const [paymentMode, setPaymentMode] = useState(data?.paymentMode ? data?.paymentMode : "")
    const [isFullyPaid, setIsFullyPaid] = useState(data?.hasOwnProperty('isFullyPaid') ? String(data?.isFullyPaid) : '')
    const [Note, setNote] = useState(data?.Note ? data?.Note : "")
    const [orderLineItems, setOrderLineItems] = useState(data?.orderLineItems.length > 0 ? data?.orderLineItems : [])

    const [toggle, setToggle] = useState(false)
    const [formErrors, setFormErrors] = useState({})
    const errors = {}
    
    const dispatch = useDispatch()

    const [user, staffs, customers, services] = useSelector((state)=>{
        return [state.user?.data, state.staff.data, state.customer.data, state.service.data]
    })

    useEffect(()=>{
        console.log('user?.role',user?.role)
        user?.role === "admin" && dispatch(startGetStaff()) 
        dispatch(startGetServices())
        dispatch(startGetCustomers())
    },[dispatch,user?.role])
    
    const calc = useMemo(()=>{
        const data = orderLineItems.reduce((pre,curr)=>pre + Number(curr.amount),0)
        setTotal(String(data))
        return data
    },[orderLineItems])

    const handleSelection = (e) =>{ 
        setCustomerId(e.target.value)
        dispatch(setId(e.target.value))
    }
    
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
            
                formSubmission(formData)

                setOrderDate('')
                setTitle('')
                setServiceId('')
                setCustomerId('')
                setTotal('')
                setPaymentMode('')
                setIsFullyPaid('')
                setNote('')
                setStaffId('')
                setOrderLineItems([])
        }
    }

    return (
        <div className="row">
            <div className="col-md-1"></div>
            <div className="col-md-10 p-2">
                {orderLineItems.length > 0 && <OrderItemsDisplay 
                    orderLineItems={orderLineItems} 
                    handleRemoveProduct={handleRemoveProduct}/>}
                <div className="p-4 gap-2" style={{border:"5px dotted rgba(230,230,230,4)"}}> 
                {toggle && <OrderLineItems 
                    submitProductForm={submitProductForm}
                    orderLineItems={orderLineItems}
                    handleToggle={handleToggle} />}
                {!toggle &&  
                    <span className="d-flex align-items-center gap-2 my-2">
                        <Label text="Products"/>
                        <button 
                            type="button"
                            className="btn btn-light" 
                            onClick={handleToggle}>
                                <Plus strokeWidth={2.25} />
                            </button>
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
                            <span key={ele._id} className="d-flex gap-2">
                                <input 
                                    className="form-check-input"
                                    type="radio"
                                    name="services"
                                    value={ele._id}
                                    checked={ele._id === serviceId}
                                    onChange={(e)=>setServiceId(e.target.value)}
                                /> 
                                <Label text={ele.name} /><br/>
                            </span>
                        )
                    })}
                    <br/>
                    <Label text="Customer"/>
                    <br/>
                    <select
                        className="form-select"
                        value={customerId} 
                        onChange={handleSelection}> {/* handleSelection */}
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
                            value="true"
                            checked={isFullyPaid === "true"} 
                            className="form-check-input"
                            onChange={(e)=>setIsFullyPaid(e.target.value)}
                        />
                        <Label text="Yes"/>
                        <br/>
                        <input
                            type="radio"
                            name="isFullyPaid"
                            value="false" 
                            checked={isFullyPaid === "false"}
                            className="form-check-input"
                            onChange={(e)=>setIsFullyPaid(e.target.value)}
                        />
                        <Label text="No"/>
                    </div>
                    <br/>
                    {user?.role === "admin" && <div>
                        <Label text="Assign To"/>
                        <br/>   
                        <select
                            className="form-select"
                            value={staffId} 
                            onChange={(e)=>setStaffId(e.target.value)}>
                            <option value="">Select Staff</option> 
                            {staffs.length > 0 && staffs.map((ele)=>{
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
                        value={data?._id ? "Edit Order" :"Add Order"}
                    />
                </form>
            </div>
        <div className="col-md-1"></div>
    </div> 
    )
}

export default OrderForm