import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import DataTable from './DataTable'
import { startGetCustomers } from '../actions/customerActions'

const CustomerList = (props) =>{

    const dispatch = useDispatch()

    useEffect(()=>{ 
        dispatch(startGetCustomers())
    },[])

    const customer = useSelector((state)=>{
        return state.customer.data
    })

    return (    
        <div>
            <DataTable data={customer}/>
        </div>
    )
}

export default CustomerList  