import React from 'react'

const SearchComponent = (props)=>{  
    const { search, handleSearch ,text} = props

    const handleChange = (e) =>{
        handleSearch(e.target.value)
    }

    return (
        <div className="card p-4">   
            <form>
                <input 
                    type="text"
                    placeholder="Search..."
                    className="form-control" 
                    onChange={handleChange}
                    value={search}
                /> 
                <span className="text-secondary">{text}</span>
            </form>
        </div>
    )
}

export default SearchComponent  