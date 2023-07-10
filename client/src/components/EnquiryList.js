import React,{useEffect,useState} from 'react'
import { useDispatch,useSelector } from "react-redux"
import { setEnquiryEditId, setGetEnquiryItems, startRemoveEnquiry } from '../actions/enquiryAction'
import { toast } from 'react-hot-toast'
import ModelComponent from './ModelComponent'
import { setModal, startGetLoggedInUser } from '../actions/userActions'

const EnquiryList=(props)=>{
  
  const [count, setCount] = useState(5)
  const [prevCount, setPrevCount] = useState(0)

  const dispatch = useDispatch()
  
  useEffect(()=>{
     dispatch(setGetEnquiryItems())
     dispatch(startGetLoggedInUser())
  },[dispatch])

  const enquiry = useSelector((state)=>{
    return state.enquiry.data
  })
  
  const enquiry1 =  useSelector((state)=>{
    return state.user.modal
  })
  

  const products = useSelector((state)=>{
    return state.product.data
   })
  
  const productDetails=(ids)=>{
    const value = ids.map((ele)=>{
          const data = products.find((e)=>{
            return e._id === ele
          })
          if(data){
            return data
          }
    })
    
    toast(
      <ul>
        {value.map((ele)=>{
          return <li>{ele?.name}</li>
        })}
      </ul>,
      {
        duration: 6000,
      }
    )
  }

  const preCount = () =>{
    setCount(count - 5)
    setPrevCount(count - count)
}

const handleCount = () =>{
    setCount(count + 5)
    setPrevCount(prevCount + count)
}
  
const handleRemove =(id)=>{
  dispatch(startRemoveEnquiry(id))
}

const handleEdit=(id)=>{
  dispatch(setEnquiryEditId(id))
  dispatch(setModal(!enquiry1))
}
    return(
        <div>
             <h2 className="text-center"> Listing Enquiries - {enquiry.length} </h2>
             <table className="table">
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Mobile</th>
                        <th>Products</th>
                        <th>Status</th>
                        <th>Remove</th>
                        <th>Edit</th>
                        
                    </tr>
                </thead>
                <tbody>
                     {enquiry.slice(prevCount,count).map((ele)=>{
                        return <tr>
                            <td>{ele.name}</td>
                            <td>{ele.mobile}</td>
                            <td onClick = {()=>{productDetails(ele.productIds)}}>{ele.productIds.length}</td>
                            <td>{ele.status}</td>
                            <td><button className="btn btn-danger" onClick={()=>handleRemove(ele._id)} >Remove</button></td>
                            <td><button className="btn btn-secondary" onClick={()=>{handleEdit(ele._id)}}>Edit</button></td>
                        </tr>
                     })}
                </tbody>
             </table>

             {enquiry?.length >= 5 && <div className="d-flex justify-content-between">
                <button 
                    disabled={enquiry.length > count} 
                    onClick={preCount}
                    className="btn btn-secondary">
                    prev
                </button>
                <button 
                    disabled={enquiry.length < count} 
                    onClick={handleCount}
                    className="btn btn-primary">
                    next
                </button>
            </div>}
            <ModelComponent Component={EnquiryList}/>
        </div>
    )
}

export default EnquiryList