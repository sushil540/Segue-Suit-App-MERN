import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setEditId, setModal, startGetProducts, startRemoveProduct } from '../actions/productActions'
import ModelComponent from './ModelComponent'
const ProductsList = (props) =>{

    const dispatch = useDispatch()

    const [modal,products] = useSelector((state)=>{
        return [state.product.modal, state.product.data]
    })

    useEffect(()=>{
        dispatch(startGetProducts())
    },[dispatch])

    const handleRemove = (id) =>{
        dispatch(startRemoveProduct(id))
    }

    const handleEdit = (id) =>{
        dispatch(setEditId(id))
        dispatch(setModal(!modal))
    }

    return (
        <div>  
            <h2 className="text-center"> Listing Products - {products.length} </h2>
            <table className="table">
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Brand</th>
                        <th>Model</th>
                        <th>Description</th>                        
                        <th>weightage</th>
                        <th>Remove</th>
                        <th>Edit</th>
                    </tr>
                </thead>
                <tbody>
                    {products.map((ele)=>{
                        return <tr key={ele._id}>
                            <td>{ele.name}</td>
                            <td>{ele.brand}</td>
                            <td>{ele.model}</td>
                            <td>{ele.decription}</td>
                            <td>{ele.weightage}</td>
                            <td>
                                <button 
                                    className="btn btn-danger"
                                    onClick={()=>{handleRemove(ele._id)}}>
                                    remove
                                </button>
                            </td>
                            <td>
                                <button 
                                    className="btn btn-secondary"
                                    onClick={()=>{handleEdit(ele._id)}}>
                                    edit
                                </button>
                            </td>
                        </tr>
                    })}
                </tbody>
            </table>
            <ModelComponent/>
        </div>
    )
}

export default ProductsList