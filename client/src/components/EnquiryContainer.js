import React from 'react'
import { useSelector } from 'react-redux'
import EnquiryList from './EnquiryList'
import EnquirySearch from './EnquirySearch'
import AddEnquiry from './AddEnquiry'

const EnquiryContainer = (props) =>{

    const editId = useSelector((state)=>{
        return state.enquiry.editId
    })

    const customStyle = {
        filter:"blur(5px)"
    }

    return (
        <div className="row" style={editId ? customStyle : {}}>
            <div className="col-md-4 border-end border-5">
                <EnquirySearch/>
                <hr/>
                <AddEnquiry/>
            </div>
            <div className="col-md-8">
               <EnquiryList/>
            </div>
        </div>
    )
}

export default EnquiryContainer