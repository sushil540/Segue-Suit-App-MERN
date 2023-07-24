import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import EditProduct from './EditProduct'
import { setEditId, startGetProducts, startRemoveProduct } from '../actions/productActions'
import ModelComponent from './ModelComponent'
import { setModal } from '../actions/userActions'
import CustomTable from './CustomTable'

const ProductsList = (props) =>{
    const dispatch = useDispatch()

    const [user, modal, products] = useSelector((state)=>{
        return [state.user.data, state.user?.modal, state.product?.data]
    })

    useEffect(()=>{
        dispatch(startGetProducts())
    },[dispatch])

    const handleRemove = (id) =>{
        dispatch(startRemoveProduct(id))
    }

    const handleEdit = (id) =>{
        dispatch(setEditId(id))
        dispatch(setModal(!modal) )
    }

    const data = products.map((ele)=>{
        return {
            Name:ele.name,
            Brand:ele.brand,
            Model:ele.model,
            Description:ele.description,
            Weightage:ele.weightage,
            Edit:<button onClick={()=>{handleEdit(ele._id)}} className="btn btn-secondary">
                <span className="material-symbols-outlined">
                    edit_square
                </span>
            </button>,
            Remove:<button onClick={()=>{handleRemove(ele._id)}} disabled={user?.role !== "admin"} className="btn btn-danger">
                <span className="material-symbols-outlined">
                    delete
                </span>
            </button>
        }
    })

    return (
        <div>  
            <h2 className="text-center"> Listing Products - {products.length} </h2>
            {products.length > 0 && <CustomTable data={data} />}
            <ModelComponent component={EditProduct}/>
        </div>
    )
}

export default ProductsList