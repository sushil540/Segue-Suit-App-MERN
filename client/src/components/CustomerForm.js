import React,{useState,useEffect} from "react"
import Label from "./Label"
import { useDispatch,useSelector } from "react-redux"
import { startGetProducts } from "../actions/productActions"
import Select from 'react-dropdown-select'
import validator from "validator"

const CustomerForm =(props)=>{
    
    const [nam,setNam] = useState('')
    const [mobile,setMobile] = useState('')
    const [address,setAddress] = useState('')
    const [products,setProducts] = useState('')
    const [name,setName] = useState([])
    console.log('products',products)
    const [formErrors,setFormErrors]=useState({})
    const errors={}
   
    const dispatch = useDispatch()

    useEffect(()=>{
        dispatch(startGetProducts())
    },[dispatch])
   
    const material = useSelector((state)=>{
        return state.product?.data.map((ele)=>{
            return ele.name
        })
    })
    console.log('material',material)

    // let product=[]
    // material.forEach((ele)=>{
    //      return product.push(ele.name)
    // })


    const handleValidation=()=>{
        if(validator.isEmpty(name)){
            errors.name = "customer name is required"
        }

        if(validator.isEmpty(mobile)){
            errors.mobile = "mobile number is required"
        }

        if(validator.isEmpty(address)){
            errors.address = "address is required"
        }

        // if(sort.length<=0){
        //     errors.product = "product is required"
        // }

        setFormErrors(errors)
    }
    
    const handleSubmit=(e)=>{
        e.preventDefault()
        
        handleValidation()

        if(Object.keys(errors).length === 0){
            const formData ={
                name,
                mobile,
                address,
                productIds:products
            }
          console.log('formData',formData)
            const reset = () =>{
                setName('')
                setMobile('')
                setAddress('')
            }
            console.log(formData, reset)
        }
    }

    return(
        <div className="card p-4">
             <h1>Add Customers</h1>
             <br/>
             <form onSubmit={handleSubmit}>
             <Label text = "Name"/>
             <br/> 
             <input className="form-control" type='text' value={nam} placeholder="Enter your name" onChange={(e)=>setNam(e.target.value)}/>
             <br/>
             <Label text = "mobile"/>
             <input className="form-control" type='text' value={mobile} placeholder="Enter your number" onChange={(e)=>setMobile(e.target.value)}/>
             <br/>
             <Label text = "Address"/>
             <textarea className="form-control"  value={address} placeholder="Enter your address" onChange={(e)=>setAddress(e.target.value)}/>
             <br/>
             <Label text = "Products"/>
             <Select 
                 name="select"
                 options={material}
                 labelField="id"
                 valueField="name"
                 multi
                 onChange={name=>setName(name)} 
            >
            </Select>
            
             <br/>
             <input 
                  type="submit"
                  value="Add Customer"
                  className="btn btn-primary"
             />
             </form>
        </div>


    )
}
export default CustomerForm



///////////////

