import React, { useState } from 'react'
import validator from 'validator'
import Label from './Label'
import { useSelector } from 'react-redux'

const ProductForm = (props) =>{
    const { formSubmission } = props
    
    const product = useSelector((state)=>{
        return state.product.data.find((ele)=>ele._id === state.product?.editId)
    })

    const [name, setName] = useState(product?.name ? product?.name : '')
    const [brand, setBrand] = useState(product?.brand ? product?.brand : '')
    const [model, setModel] = useState(product?.model ? product?.model : '')
    const [description, setDescription] = useState(product?.description ? product?.description  : '')
    const [weightage, setWeightage] = useState(product?.weightage ? product?.weightage : '')
    const [formErrors, setFormErrors] = useState({})
    const errors = {}

    const handleValidation = ()=>{
        if(validator.isEmpty(name)){
            errors.name = "Product name is required *"
        }

        if(validator.isEmpty(brand)){
            errors.brand = "Product brand is required *"
        }

        if(validator.isEmpty(model)){
            errors.model = "Product model is required *"
        }
        
        if(validator.isEmpty(description)){
            errors.description = "Product description is required *"
        }

        if(validator.isEmpty(weightage)){
            errors.weightage = "Product weightage is required *"
        }        
        setFormErrors(errors)   
    }

    const handleSubmit = (e) =>{
        e.preventDefault()

        handleValidation()
        
        if(Object.keys(errors).length === 0){
            const formData = {
                name,
                brand,
                model,
                description,
                weightage
            }

            const reset = () =>{
                setName('')
                setBrand('')
                setModel('')
                setDescription('')
                setWeightage('')
            }
            formSubmission(formData, reset)
        }
    }

    return (
        <div className="card p-4">  
                <form onSubmit={handleSubmit}>
                    <Label text="Product Name"/>
                    <br/>
                    <input
                        className="form-control"
                        placeholder="Enter product*"
                        type="text"
                        value={name}
                        onChange={(e)=>setName(e.target.value)}
                    />
                    {formErrors?.name && <span className="text-danger">{formErrors?.name}</span>}
                    <br/>
                    <Label text="Product Brand"/>
                    <br/>
                    <input
                        className="form-control"
                        placeholder="Enter brand*"
                        type="text"
                        value={brand}
                        onChange={(e)=>setBrand(e.target.value)}
                    />
                    {formErrors?.brand && <span className="text-danger">{formErrors?.brand}</span>}
                    <br/>
                    <Label text="Product Model"/>
                    <br/>
                    <input
                        className="form-control"
                        placeholder="Enter model*"
                        type="text"
                        value={model}
                        onChange={(e)=>setModel(e.target.value)}
                    />
                    {formErrors?.model && <span className="text-danger">{formErrors?.model}</span>}
                    <br/>
                    <Label text="Product Description"/>
                    <br/>
                    <textarea
                        className="form-control"
                        placeholder="Enter description*"
                        type="text"
                        value={description}
                        onChange={(e)=>setDescription(e.target.value)}>
                    </textarea>
                    {formErrors?.description && <span className="text-danger">{formErrors?.description}</span>}
                    <br/>
                    <Label text="Product weightage"/>
                    <br/>
                    <input
                        className="form-control"
                        placeholder="Enter weightage*"
                        type="text"
                        value={weightage}
                        onChange={(e)=>setWeightage(e.target.value)}
                    />
                    {formErrors?.weightage && <span className="text-danger">{formErrors?.weightage}</span>}
                    <br/>
                    <input 
                        type="submit"
                        value={product?.name ? "Edit Product" : "Add Product"}
                        className="btn btn-primary"
                    />
                </form>
            </div>
    )
}

export default ProductForm