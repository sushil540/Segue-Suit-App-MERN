import React from 'react'
import AddProduct from './AddProduct'
import ProductsList from './ProductsList'
import { useSelector } from 'react-redux'

const Products = (props) =>{

    const editId = useSelector((state)=>{
        return state.product.editId
    })

    const customStyle = {
        filter:"blur(5px)"
    }

    return (
        <div className="row" style={editId ? customStyle : {}}>
            <div className="col-md-4 border-end border-5">
                <AddProduct/>
            </div>
            <div className="col-md-8">
                <ProductsList/>
            </div>
        </div>
    )
}

export default Products