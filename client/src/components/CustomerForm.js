import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Select from 'react-select'
import Label from './Label'
import validator from 'validator'
import { setErrors, startAddCustomer } from '../actions/customerActions'

const CustomerForm = () => {
    const [name, setName] = useState('Rakshan')
    const [mobile, setMobile] = useState('7894561235')
    const [address, setAddress] = useState('')
    const [selectedOptions, setSelectedOptions] = useState([{value:"64a507e7fa6e1c63d992c08e",label:"product 1"},{value:"6496b42fe4a185f9b84f47f5",label:"product 2"}]    )
    const [formErrors, setFormErrors] = useState({})
    const errors = {}

    const dispatch = useDispatch()
 
    const [products, customerError] = useSelector((state)=>{
        return [state.product.data.map((ele)=>{
            return {value:ele._id,label:ele.name}
        }), state.customer.errors]
    })    

    const handleValidator = () =>{
        if(validator.isEmpty(name)){
            errors.name = "Customer name is required"
        }

        if(validator.isEmpty(mobile)){
            errors.mobile = "Customer mobile is required"
        }else if(!validator.isNumeric(mobile)){
            errors.mobile = "Invalid mobile number"
        }

        if(selectedOptions.length === 0){
            errors.options = "Atleast select 1 product"
        }
        setFormErrors(errors)
    }
 
    const handleMultiSelectChange = (selectedOptions) => {
        setSelectedOptions(selectedOptions)
    }
    
    const handleClose = ()=>{
        dispatch(setErrors(''))
    }

    const handleSubmit = (e) =>{
        e.preventDefault()

        handleValidator()

        if(Object.keys(errors).length === 0){

            const formData = {
                name:name,
                mobile:mobile,
                address:address,
                productIds:selectedOptions.map((ele=>ele.value))
            }
            dispatch(startAddCustomer(formData))

            setName('')
            setMobile('')
            setAddress('')
            setSelectedOptions([])   
        }
    }

  return (
    <div className="card p-4">
        {customerError && (
        <div className="alert alert-danger d-flex justify-content-between align-items-center">
            <p>{ customerError }</p>
            <button
                className="btn btn-transparent border-0"
                onClick={handleClose}>&#10006;</button>
        </div>
        )}
        <h3 className="text-center"> Add Customer </h3>
        <form onSubmit={handleSubmit}>
            <Label text="Name"/> <br/>
            <input
                type="text"
                value={name}
                className="form-control"
                placeholder="Enter customer name"
                onChange={(e)=>setName(e.target.value)}
            />
            {formErrors?.name && <span className="text-danger">{formErrors?.name}</span>}
            <br/>
            <Label text="Mobile"/> <br/>
            <input
                type="text"
                value={mobile}
                className="form-control"
                placeholder="Enter customer mobile"
                onChange={(e)=>setMobile(e.target.value)}
            />
            {formErrors?.mobile && <span className="text-danger">{formErrors?.mobile}</span>}
            <br/>
            <Label text="Address (Optional)"/> <br/>
            <input 
                type="text"
                value={address}
                className="form-control"
                placeholder="Enter customer address"
                onChange={(e)=>setAddress(e.target.value)}
            />
            {formErrors?.address && <span className="text-danger">{formErrors?.address}</span>}
            <br/>
            <Label text="Products Select"/><br/>
            <Select
                options={products}
                isMulti
                onChange={handleMultiSelectChange}
                value={selectedOptions}
            />
            {formErrors?.options && <span className="text-danger">{formErrors?.options}</span>}
            <br/>
            <input 
                className="btn btn-primary"
                type="submit"
            />
        </form>
    </div>
  )
}
 
export default CustomerForm