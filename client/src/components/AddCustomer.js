import React from 'react'
import CustomerForm from './CustomerForm'
import { useDispatch, useSelector } from 'react-redux'
import { setId, startAddCustomer } from '../actions/customerActions'
import { startRemoveEnquiry } from '../actions/enquiryAction'

const AddCustomer = (props) =>{

    const makeCustomer = useSelector((state)=>{
        return state.customer.id
    })

    const dispatch = useDispatch()

    const formSubmission = (formData) =>{
        dispatch(startAddCustomer(formData))      
        makeCustomer && dispatch(startRemoveEnquiry(makeCustomer))
        dispatch(setId(''))
    }
    
    return (
        <div>
            <h2 className="text-center">Add Customer</h2>
            <CustomerForm formSubmission={formSubmission}/>
        </div>
    )
}

export default AddCustomer