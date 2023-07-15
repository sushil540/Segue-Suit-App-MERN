import React, { useEffect } from 'react'
import CustomerForm from './CustomerForm'
import { useDispatch, useSelector } from 'react-redux'
import { setEditId, startEditCustomer } from '../actions/customerActions'
import { setModal } from '../actions/userActions'

const EditCustomer = (props) =>{

    const dispatch = useDispatch()

    const modal = useSelector((state)=>{
        return state.user.modal
    })

    useEffect(()=>{
       return ()=>{
            dispatch(setEditId(''))
       } 
    },[])

    const formSubmittion = (formData) =>{
        dispatch(startEditCustomer(formData))
        dispatch(setEditId(''))
        dispatch(setModal(!modal))
    }

    return (
        <div>  
            <h2> Edit Customer </h2>
            <CustomerForm formSubmittion={formSubmittion}/>
        </div>
    )
}

export default EditCustomer