import React from 'react'
import { useSelector } from 'react-redux'
import DataTable from './DataTable'

const CustomerList = (props) =>{

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