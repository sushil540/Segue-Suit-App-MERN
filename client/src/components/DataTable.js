import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setEditId, startRemoveCustomer } from '../actions/customerActions'
import ModelComponent from './ModelComponent'
import EditCustomer from './EditCustomer'
import { setModal } from '../actions/userActions'

const DataTable = (props) =>{
  const [count, setCount] = useState(5)
  const [prevCount, setPrevCount] = useState(0)

  const modal = useSelector((state)=>{
    return state.user.modal
  })

  // const [toggle, setToggle] = useState(false)

  const dispatch = useDispatch()

  const { data } = props
    
  const preCount = () =>{
    setCount(count - 5)
    setPrevCount(count - count)
  }

  const handleCount = () =>{
      setCount(count + 5)
      setPrevCount(prevCount + count)
  }

  const handleEdit = (id) =>{
     dispatch(setEditId(id))
     dispatch(setModal(!modal))
  }

  const handleRemove =(id) =>{
    dispatch(startRemoveCustomer(id))
  }

  // const handleToggle = () =>{
  //   setToggle(!toggle)
  // }

  // // const calculate = (data) =>{
  //     for(let i=0;data.length - 1;i++){
  //       for(let j=0;data.length - i - 1;j++){
  //         if(data[i].productIds.length > data[i+1].productIds.length){
  //           const temp = data[i]
  //           data[i+1] = data[i]
  //           data[i] = temp
  //         }
  //       }  
  //     }
  //   // }
    
  // console.log("sorted",data)
  
  // const computedVAlues = (data) =>{
  //   return toggle ? calculate(data) : data.sort((a, b)=> a - b)
  // }
    
  return (
    <div>
      <table className="table">
          <thead>
              <tr>
                <th>Name</th>
                <th>Mobile</th>
                <th>Address</th>
                <th>Products</th>
                <th>Edit</th>
                <th>Remove</th>
              </tr>
          </thead>
        <tbody>
            {data.slice(prevCount,count).map((ele)=>{
                return (
                <tr key={ele._id}>
                    <td>{ele.name}</td>
                    <td>{ele.mobile}</td>
                    <td>{ele.address}</td>  
                    <td>{ele.productIds.length}</td>
                    <td><button className="btn btn-secondary" onClick={()=>handleEdit(ele._id)}>Edit</button></td>
                    <td><button className="btn btn-danger" onClick={()=>handleRemove(ele._id)}>Remove</button></td>
                </tr>
                )    
            })}
        </tbody>
      </table>
      {data.length >= 5 && <div className="d-flex justify-content-between">
            <button 
                disabled={data.length > count} 
                onClick={preCount}
                className="btn btn-secondary">
                prev
            </button>
            <button 
                disabled={data.length < count} 
                onClick={handleCount}
                className="btn btn-primary">
                next
            </button>
        </div>}
        <ModelComponent Component={EditCustomer} />
    </div>
  )
}

export default DataTable