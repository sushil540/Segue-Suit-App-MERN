import React from 'react'
import { startAddEnquiry } from '../actions/enquiryAction'
import EnquiryForm from './EnquiryForm'
import { useDispatch } from 'react-redux'

const AddEnquiry = (props) =>{

    const dispatch = useDispatch()
    
    const formSubmission = (formData, reset) =>{
        reset()
        dispatch(startAddEnquiry(formData))
    }
   
    return (
        <div>  
            <h2 className="text-center"> Add Products </h2>
            <EnquiryForm formSubmission={formSubmission}/>
        </div>
    )
}

export default AddEnquiry