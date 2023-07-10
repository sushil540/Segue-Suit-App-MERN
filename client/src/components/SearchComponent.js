import React from 'react'

const SearchComponent = (props)=>{  
<<<<<<< HEAD
    const { search, handleSearch , text} = props
=======
    const { search, handleSearch ,text} = props
>>>>>>> cc8cf67891b1e688c12ae5e7b0a327d8b74e4250

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