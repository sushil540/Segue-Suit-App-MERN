import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
//  setCustomerEditId,
import { setId, startGetCustomers, startRemoveCustomer } from '../actions/customerActions'
import CustomTable from './CustomTable'
import { setModal } from '../actions/userActions'
import ModelComponent from './ModelComponent'
import EditCustomer from './EditCustomer'
import { Pencil, Trash } from 'lucide-react'

const CustomerList = (props) =>{

    const dispatch = useDispatch()

    useEffect(()=>{ 
        dispatch(startGetCustomers())
    },[dispatch])

    const [user, customers, modal] = useSelector((state)=>{
        return [state.user.data, state.customer.data, state.user.modal]
    })

    const handleEdit = (id) =>{
        dispatch(setId(id))
        dispatch(setModal(!modal))
    }
   
    const handleRemove =(id) =>{
        dispatch(startRemoveCustomer(id))
    }

    const data = customers.map((ele)=>{
        return {    
            Name:ele.name,
            Mobile:ele.mobile,
            Address:ele.address,
            Products:ele.productIds.length,
            Edit:<button className="btn btn-secondary" onClick={()=>handleEdit(ele._id)}>
                <Pencil strokeWidth={2.25} />
        </button>,
            Remove:<button className="btn btn-danger" disabled={user?.role !== "admin"} onClick={()=>handleRemove(ele._id)}>
                <Trash strokeWidth={2.25} />
            </button>
        }})

    return (    
        <div>
            <h2 className="text-center"> Listing Customer - {data.length}</h2>
            {data.length > 0 && <CustomTable data={data}/>}
            <ModelComponent component={EditCustomer} />
        </div>
    )
}

export default CustomerList  