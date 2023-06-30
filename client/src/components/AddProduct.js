import React, { useState } from 'react'
import Label from './Label'

const AddProduct = (props) =>{
    const [name, setName] = useState('')

    const handleSubmit = (e) =>{

    }

    return (
        <div className="w-50"> 
            <form onSubmit={handleSubmit}>
            <Label text="Product Name"/>
            <br/>
            <input
                className="form-control"
                placeholder="Enter product"
                type="text"
                value={name}
                onChange={(e)=>setName(e.target.value)}
            /><br/>
            <Label text="Product Brand"/>
            <br/>
            <input
                className="form-control"
                placeholder="Enter Model"
                type="text"
                value={name}
                onChange={(e)=>setName(e.target.value)}
            /><br/>
            </form>
        </div>
    )
}

export default AddProduct