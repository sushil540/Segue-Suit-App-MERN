import React from 'react'
import { useSelector } from 'react-redux'
import EnquiryForm from './EnquiryForm'

const EnquiryContainer = (props) =>{

    const editId = useSelector((state)=>{
        return state.product.editId
    })

    const customStyle = {
        filter:"blur(5px)"
    }

    return (
        <div className="row" style={editId ? customStyle : {}}>
            <div className="col-md-4 border-end border-5">
                <EnquiryForm/>
            </div>
            <div className="col-md-8">
               
            </div>
        </div>
    )
}

export default EnquiryContainer