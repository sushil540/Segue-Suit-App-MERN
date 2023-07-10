import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import SearchComponent from './SearchComponent'
import { setSearch } from '../actions/userActions'
import { setGetEnquiryItems, startSearchEnquiry } from '../actions/enquiryAction'


const EnquirySearch = (props) =>{

    const dispatch = useDispatch()

    const search = useSelector((state)=>{
        return state.user.search
    })

    const handleSearch = (data) =>{
        dispatch(setSearch(data))
        if(data){
            dispatch(startSearchEnquiry(data))   
        }else{
            dispatch(setGetEnquiryItems())
        }
    }

    return (
        <div>
            <SearchComponent 
                search={search}
                text="Search By Name"
                handleSearch={handleSearch}/>
        </div>
    )
}

export default EnquirySearch