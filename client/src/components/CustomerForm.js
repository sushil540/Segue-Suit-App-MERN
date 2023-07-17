import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Select from 'react-select'
import Label from './Label'
import validator from 'validator'
import { setErrors } from '../actions/customerActions'

const CustomerForm = (props) => {
    const { formSubmittion }  = props

    const [customer, product] = useSelector((state)=>{
        return [state.customer?.data.find((ele)=>ele._id === state.customer?.editId), state.product?.data]
    })
    
    const findProducts = (ids) =>{
        console.log("ids",ids)
        const products = ids.map((ele)=>{
            const data = product.find((e)=>{
                return ele === e._id
            })
            if(data) return {value:data._id,label:data.name}
        })
        return products 
    }

    // console.log(customer.productIds)//find products

    const [name, setName] = useState(customer?.name ? customer?.name : '')
    const [mobile, setMobile] = useState(customer?.mobile ? customer?.mobile : '')
    const [address, setAddress] = useState(customer?.address ? customer?.address : '')
    const [selectedOptions, setSelectedOptions] = useState(customer?.productIds.length > 0 ? findProducts(customer?.productIds) : [])
    const [formErrors, setFormErrors] = useState({})
    const errors = {}   

    const dispatch = useDispatch()
 
    const [products, customerError] = useSelector((state)=>{
        return [state.product?.data.map((ele)=>{
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

            formSubmittion(formData)
            
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