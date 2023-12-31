import React,{useState,useEffect} from "react"
import Label from "./Label"
import { useDispatch,useSelector } from "react-redux"
import validator from "validator"
import Select from 'react-select'
import { startGetProducts } from "../actions/productActions"

const EnquiryForm=(props)=>{
    const {formSubmission} = props

    const dispatch= useDispatch()

    useEffect(()=>{ 
        dispatch(startGetProducts())
    },[dispatch])

    const [enquiry, productList] = useSelector((state)=>{
        return [state.enquiry?.data.find((ele)=>ele?._id === state.enquiry?.editId), state.product.data]
    })

    const findProducts = (ids) =>{
        const productData = ids.map((ele)=>{
            const data = productList.find((e)=>{
                return ele === e._id
            })
            if(data) return {value:data._id,label:data.name}
        })
        return productData
    }

   const [name,setName] = useState(enquiry?.name ? enquiry?.name : '')
   const [mobile,setMobile] = useState(enquiry?.mobile ? enquiry?.mobile : '')
   const [selectedOptions,setSelectedOptions] = useState(enquiry?.productIds.length > 0 ? findProducts(enquiry?.productIds) : [])
   const [items,setItems] = useState(enquiry?.status ? enquiry?.status : '')
   const [formErrors, setFormErrors] = useState({})
   const errors={}

    const products = useSelector((state)=>{
        return state.product.data.map((ele)=>{
            return {value:ele._id,label:ele.name}
        })
    })

   console.log("products",products)

   const handleMultiSelectChange = (selectedOptions) => {
    setSelectedOptions(selectedOptions)
    }
   
    const handleValidator=()=>{
        if(validator.isEmpty(name)){
            errors.name = "Customer name is required"
        }

        if(validator.isEmpty(mobile)){
            errors.mobile = "Customer mobile is required"
        }else if(!validator.isNumeric(mobile)){
            errors.mobile = "Invalid mobile number"
        }

        if(selectedOptions.length === 0){
            errors.options = "Atleast select 1 product"
        }

        if(!items){
            errors.items = "Select any one option"
        }

        setFormErrors(errors)
    }

    const handleSubmit = (e) =>{
        e.preventDefault()

        handleValidator()

        if(Object.keys(errors).length === 0){
            const formData = {
                name:name,
                mobile:mobile,
                productIds:selectedOptions.map((ele=>ele.value)),
                status:items
            }
            
            const reset = () =>{
                setName('')
                setMobile('')
                setSelectedOptions([])
                setItems('')
            }
            formSubmission(formData,reset)
        }
    }

    return(
        <div className="card p-4">
            <form onSubmit={handleSubmit}>
            <Label text="Name"/> <br/>
            <input 
                className="form-control" 
                type="text" value={name} 
                placeholder="Enter your name" 
                onChange={(e)=>setName(e.target.value)}/>
            {formErrors?.name && <span className="text-danger">{formErrors?.name}</span>}
            <br/>
            <Label text="mobile"/><br/>
            <input 
                className="form-control" 
                type="text" 
                value={mobile}
                placeholder="Enter your mobile number" 
                onChange={(e)=>setMobile(e.target.value)}/>
            {formErrors?.mobile && <span className="text-danger">{formErrors?.mobile}</span>}
            <br/>
            <Label text = "Products"/><br/>
            <Select
                options={products}
                isMulti
                onChange={handleMultiSelectChange}
                value={selectedOptions}
            />
            {formErrors?.options && <span className="text-danger">{formErrors?.options}</span>}
            <br/>
            <Label text="Status"/><br/>
            <select  className="form-select" value={items} onChange={(e)=>setItems(e.target.value)}>
                <option value="">--Select--</option>
                <option value="Hot">Hot</option>
                <option value="Warm">Warm</option>
                <option value="Cold">cold</option>
            </select>
            {formErrors?.items && <span className="text-danger">{formErrors?.items}</span>}
            <br/>
            <input 
                        type="submit"
                        value={enquiry?.name ? "Edit Enquiry" : "Add Enquiry"}
                        className="btn btn-primary"
                    />
            </form>     
        </div>
    )
}
export default EnquiryForm