import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { setEditId, startEditProduct } from '../actions/productActions'
import ProductForm from './ProductForm'
import { setModal } from '../actions/userActions'

const EditProduct = (props) =>{

    const dispatch = useDispatch()
   

    useEffect(()=>{
        return ()=>{
            dispatch(setEditId(''))
        }
    },[dispatch])
    
    const formSubmission = (formData, reset) =>{
        reset()
        dispatch(startEditProduct(formData))
        dispatch(setEditId(''))
        dispatch(setModal(false))
    }

    return (
        <div>   
            <h2 className="text-center">Edit Form</h2>
            <ProductForm formSubmission={formSubmission}/>
        </div>
    )
}

export default EditProduct