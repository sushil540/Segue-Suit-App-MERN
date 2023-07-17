import React,{useEffect,useState} from 'react'
import { useDispatch, useSelector } from "react-redux"
import { setEnquiryEditId, startGetEnquiries, startRemoveEnquiry } from '../actions/enquiryAction'
import { toast } from 'react-hot-toast'
import ModelComponent from './ModelComponent'
import EditEnquiry from './EditEnquiry'
import { setModal, startGetLoggedInUser } from '../actions/userActions'
import CustomTable from './CustomTable'

const EnquiryList=(props)=>{
  
  const dispatch = useDispatch()
  
  useEffect(()=>{
     dispatch(startGetEnquiries())
     dispatch(startGetLoggedInUser())
  },[dispatch])

  const enquiry = useSelector((state)=>{
    return state.enquiry.data
  })
  
  const enquiry1 =  useSelector((state)=>{
    return state.user.modal
  })
  

const handleRemove =(id)=>{
  dispatch(startRemoveEnquiry(id))
}

const handleEdit=(id)=>{
  dispatch(setEnquiryEditId(id))
  dispatch(setModal(!enquiry1))
}

const enquiryData = enquiry.map((ele)=>{
  return {
      Name:ele.name,
      Mobile:ele.mobile,
      Address:ele.address,
      Products:ele.productIds.length,
      Status : ele.status,
      Edit:<button className="btn btn-secondary" onClick={()=>handleEdit(ele._id)}>Edit</button>,
      Remove:<button className="btn btn-danger" onClick={()=>handleRemove(ele._id)}>Remove</button>
  }})
    return(
        <div>
             {enquiryData.length > 0 && <CustomTable data={enquiryData}/>}
            <ModelComponent Component={EditEnquiry}/>
        </div>
    )
}

export default EnquiryList