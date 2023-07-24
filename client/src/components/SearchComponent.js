import React,{useEffect} from 'react'
import { useDispatch } from 'react-redux'
import { setSearch } from '../actions/userActions'

const SearchComponent = (props)=>{  
    const { search, handleSearch, text} = props

    const dispatch=useDispatch()

    useEffect(()=>{
        return ()=>{
            dispatch(setSearch(''))
        }
    },[dispatch])
    
    const handleChange = (e) =>{
        handleSearch(e.target.value)
    }

    return (
        <div className="p-4">   
                <form>
                    <input  
                        type="text"
                        placeholder="Search..."
                        className="form-control w-75 py-3 fw-bold"  
                        onChange={handleChange}
                        value={search}
                    /> 
                    <span className="text-secondary">{text}</span>
                </form>                
            </div>
    )
}

export default SearchComponent  