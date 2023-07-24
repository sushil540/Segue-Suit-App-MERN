import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import SearchComponent from './SearchComponent'
import { setSearch } from '../actions/userActions'
import { startGetProducts, startSearchProducts } from '../actions/productActions'

const ProductSearch = (props) =>{

    const dispatch = useDispatch()

    const search = useSelector((state)=>{
        return state.user.search
    })

    const handleSearch = (data) =>{
        dispatch(setSearch(data))
        if(data){
            dispatch(startSearchProducts(data))   
        }else{
            dispatch(startGetProducts())
        }
    }

    return (
        <div>
            <SearchComponent 
                search={search}
                text= "Search by Brand and Weightage"
                handleSearch={handleSearch}/>
        </div>
    )
}

export default ProductSearch