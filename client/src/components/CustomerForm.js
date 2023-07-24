import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { X } from 'lucide-react'
import Select from 'react-select'
import Label from './Label'
import validator from 'validator'
import { setErrors, setId } from '../actions/customerActions'
import { startGetProducts } from '../actions/productActions'

const CustomerForm = (props) => {
    const { formSubmission }  = props

    const dispatch = useDispatch()

    useEffect(()=>{
        dispatch(startGetProducts())
        return () =>{
            dispatch(setId(''))
        }
    },[dispatch])

    const [enquiryToCustomer, customer, products, customerError] = useSelector((state)=>{
        return [
                state.enquiry?.data.find((ele)=>ele._id === state.customer?.id), 
                state.customer?.data.find((ele)=>ele?._id === state.customer?.id),
                state.product.data.map((ele)=>{ return {value:ele._id,label:ele.name}}), 
                state.customer?.errors,   
               ]
    })    
    
    const findProducts = (ids) =>{
        const productNames = ids.map((ele)=>{
            const data = products.find((e)=>{
                return ele === e.value
            })
            return data
        })
        return productNames 
    }

    const [name, setName] = useState(customer?.name ? customer?.name : '' ?? enquiryToCustomer?.name)
    const [mobile, setMobile] = useState(customer?.mobile ? customer?.mobile : '' ?? enquiryToCustomer?.mobile)
    const [address, setAddress] = useState(customer?.address ? customer?.address : '')
    const [selectedOptions, setSelectedOptions] = useState(customer?.productIds.length > 0 ? findProducts(customer?.productIds) : (enquiryToCustomer?.productIds.length > 0 ? findProducts(enquiryToCustomer?.productIds) : []))
    const [formErrors, setFormErrors] = useState({})
    const errors = {}   
    
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

            formSubmission(formData)
            
            setName('')
            setMobile('')
            setAddress('')
            setSelectedOptions([])   
        }
    }

    const styleObj = {background:"#F4F2DE",color:"#000"}

  return (
    <div className="card p-4" style={enquiryToCustomer && styleObj}>
        {customerError && (
        <div className="alert alert-danger d-flex justify-content-between align-items-center">
            <p>{ customerError }</p>
            <button
                className="btn btn-transparent border-0"
                onClick={handleClose}><X size={32} /></button>
        </div>
        )}
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
                className="text-dark"
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