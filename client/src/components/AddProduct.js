import React from 'react'
import ProductForm from './ProductForm'
import { startAddProduct } from '../actions/productActions'
import { useDispatch } from 'react-redux'

const AddProduct = (props) =>{

    const dispatch = useDispatch()
    
    const formSubmission = (formData, reset) =>{
        reset()
        dispatch(startAddProduct(formData))
    }
   
    return (
        <div>  
            <h2 className="text-center"> Add Products </h2>
            <ProductForm formSubmission={formSubmission}/>
        </div>
    )
}

export default AddProduct