import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import EditProduct from './EditProduct'
import { setEditId, startGetProducts, startRemoveProduct } from '../actions/productActions'
import ModelComponent from './ModelComponent'
import { setModal } from '../actions/userActions'

const ProductsList = (props) =>{
    const [count, setCount] = useState(5)
    const [prevCount, setPrevCount] = useState(0)

    const dispatch = useDispatch()

    const [modal, products] = useSelector((state)=>{
        return [state.user?.modal, state.product?.data]
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

    const preCount = () =>{
        setCount(count - 5)
        setPrevCount(count - count)
    }
    
    const handleCount = () =>{
        setCount(count + 5)
        setPrevCount(prevCount + count)
    }

    console.log(prevCount, count)

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
                    {products.slice(prevCount,count).map((ele)=>{
                        return <tr key={ele._id}>
                            <td>{ele.name}</td>
                            <td>{ele.brand}</td>
                            <td>{ele.model}</td>
                            <td>{ele.description}</td>
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
           {products.length >= 5 && <div className="d-flex justify-content-between">
                <button 
                    disabled={products.length > count} 
                    onClick={preCount}
                    className="btn btn-secondary">
                    prev
                </button>
                <button 
                    disabled={products.length < count} 
                    onClick={handleCount}
                    className="btn btn-primary">
                    next
                </button>
            </div>}
            <ModelComponent component={EditProduct}/>
        </div>
    )
}

export default ProductsList