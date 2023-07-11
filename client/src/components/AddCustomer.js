import React from 'react'
import CustomerForm from './CustomerForm'
import { useDispatch } from 'react-redux'
import { startAddCustomer } from '../actions/customerActions'

const AddCustomer = (props) =>{

    const dispatch = useDispatch()

    const formSubmittion = (formData) =>{
        dispatch(startAddCustomer(formData))        
    }
    
    return (
        <div>
            <h2 className="text-center">Add Customer</h2>
            <CustomerForm formSubmittion={formSubmittion}/>
        </div>
    )
}

export default AddCustomer