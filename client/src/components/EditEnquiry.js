import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import EnquiryForm from './EnquiryForm'
import { setEnquiriesEdit, setEnquiryEditId } from '../actions/enquiryAction'
import { setModal } from '../actions/userActions'

const EditEnquiry = (props) =>{

    const dispatch = useDispatch()

    useEffect(()=>{
        return ()=>{
            dispatch(setEnquiryEditId(''))
        }
    },[dispatch])
    
    const formSubmission = (formData, reset) =>{
        reset()
        dispatch(setEnquiriesEdit(formData))
        dispatch(setEnquiryEditId(''))
        dispatch(setModal(false))
    }

    return (
        <div>   
            <h2 className="text-center">Edit Form</h2>
            <EnquiryForm formSubmission={formSubmission}/>
        </div>
    )
}

export default EditEnquiry