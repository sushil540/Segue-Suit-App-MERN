import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setCustomerEditId, startGetCustomers, startRemoveCustomer } from '../actions/customerActions'
import CustomTable from './CustomTable'
import { setModal } from '../actions/userActions'
import ModelComponent from './ModelComponent'
import EditCustomer from './EditCustomer'

const CustomerList = (props) =>{

    const dispatch = useDispatch()

    useEffect(()=>{ 
        dispatch(startGetCustomers())
    },[dispatch])

    const [user, customers, modal] = useSelector((state)=>{
        return [state.user.data, state.customer.data, state.user.modal]
    })

    const handleEdit = (id) =>{
        dispatch(setCustomerEditId(id))
        dispatch(setModal(!modal))
    }
   
    const handleRemove =(id) =>{
        dispatch(startRemoveCustomer(id))
    }

    const tableData = customers.map((ele)=>{
        return {
            Name:ele.name,
            Mobile:ele.mobile,
            Address:ele.address,
            Products:ele.productIds.length,
            Edit:<button className="btn btn-secondary" onClick={()=>handleEdit(ele._id)}>Edit</button>,
            Remove:<button className="btn btn-danger" disabled={user?.role !== "admin"} onClick={()=>handleRemove(ele._id)}>Remove</button>
        }})

    return (    
        <div>
            {tableData.length > 0 && <CustomTable data={tableData}/>}
            <ModelComponent component={EditCustomer} />
        </div>
    )
}

export default CustomerList  