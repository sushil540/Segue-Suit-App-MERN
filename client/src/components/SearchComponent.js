import React from 'react'

const SearchComponent = (props)=>{  
    const [search, setSearch] = useState('')

    const handleChange = (e) =>{
        setSearch(e.target.value)
    }

    return (
        <div>   
            <form>
                <input 
                    type="text"
                    onChange={handleChange}
                    value={search}
                /> 
            </form>
        </div>
    )
}

export default SearchComponent  