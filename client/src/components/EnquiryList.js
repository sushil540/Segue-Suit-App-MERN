import React,{useEffect} from 'react'
import { withRouter } from'react-router-dom' 
import { Pencil, Trash, UserPlus2 } from 'lucide-react'
import { useDispatch, useSelector } from "react-redux"
import { setEnquiryEditId, startGetEnquiries, startRemoveEnquiry } from '../actions/enquiryAction'
import ModelComponent from './ModelComponent'
import EditEnquiry from './EditEnquiry'
import { setModal, startGetLoggedInUser } from '../actions/userActions'
import CustomTable from './CustomTable'
import { setId } from '../actions/customerActions'

const EnquiryList=(props)=>{
  
  const dispatch = useDispatch()
  
  useEffect(()=>{
     dispatch(startGetEnquiries())
     dispatch(startGetLoggedInUser())
  },[dispatch])

  const [enquiry, modal] = useSelector((state)=>{
    return [state.enquiry.data, state.user.modal]
  })
  
  const handleRemove =(id)=>{
    dispatch(startRemoveEnquiry(id))
  }

  const handleEdit=(id)=>{
    dispatch(setEnquiryEditId(id))
    dispatch(setModal(!modal))
  }

  const handleCreateCustomer = (equiryId) =>{
      dispatch(setId(equiryId))
      props.history.push('/customers')
  }

  const enquiryData = enquiry.map((ele)=>{
    return {
        Name:ele.name,
        Mobile:ele.mobile,
        Products:ele.productIds.length,
        Status : ele.status,  
        Edit:<button className="btn btn-secondary" onClick={()=>handleEdit(ele._id)}>
          <Pencil strokeWidth={2.25} />
        </button>,  
        Remove:<button className="btn btn-danger" onClick={()=>handleRemove(ele._id)}>
          <Trash strokeWidth={2.25} />
        </button>,
        Make_As_Customer: <button className="btn btn-outline-success px-4" onClick={()=>handleCreateCustomer(ele._id)}>
          <UserPlus2 size={30} />
        </button>
    }})

    return(
        <div>
             <h2 className="text-center"> Listing Enquiries - {enquiry.length} </h2>
             {enquiryData.length > 0 && <CustomTable data={enquiryData}/>}
            <ModelComponent component={EditEnquiry}/>
        </div>
    )
}

export default withRouter(EnquiryList)