import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { startGetStaff, startRemoveStaff } from '../actions/staffActions'
import CustomTable from './CustomTable'
import { Trash } from 'lucide-react'

const StaffList = (props) =>{

    const dispatch = useDispatch()

    useEffect(()=>{
        dispatch(startGetStaff())
    },[dispatch])

    const staff = useSelector((state)=>{
        return state.staff?.data
    })

    const handleRemove = (id) =>{
        dispatch(startRemoveStaff(id))
    }

    const data = staff.map((ele)=>{
        return {
            Name:ele.username,
            Email:ele.email,
            Mobile:ele.mobile,
            Remove:<button className="btn btn-danger" onClick={()=>handleRemove(ele._id)}>
                <Trash strokeWidth={2.25} />
            </button> 
        }
    })

    return (    
        <div>
           {data.length > 0 && <CustomTable data={data}/>}
        </div>
    )
}

export default StaffList 