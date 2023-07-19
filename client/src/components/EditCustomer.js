import React, { useEffect } from 'react'
import CustomerForm from './CustomerForm'
import { useDispatch, useSelector } from 'react-redux'
//setCustomerEditId,
import { setId, startEditCustomer } from '../actions/customerActions'
import { setModal } from '../actions/userActions'

const EditCustomer = (props) =>{

    const dispatch = useDispatch()

    const modal = useSelector((state)=>{
        return state.user.modal
    })

    useEffect(()=>{
       return ()=>{
            // dispatch(setCustomerEditId(''))
            dispatch(setId(''))
       } 
    },[dispatch])

    const formSubmission = (formData) =>{
        dispatch(startEditCustomer(formData))
        // dispatch(setCustomerEditId(''))
        dispatch(setId(''))
        dispatch(setModal(!modal))
    }

    return (
        <div>  
            <h2 className="text-center"> Edit Customer </h2>
            <CustomerForm formSubmission={formSubmission}/>
        </div>
    )
}

export default EditCustomer