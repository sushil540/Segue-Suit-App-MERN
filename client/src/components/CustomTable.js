import React, { useState } from 'react'
import PropTypes from 'prop-types'
import TableRow from './TableRow'
import TableBody from './TableBody'

const CustomTable = (props) =>{
    const { data } = props
    const [count, setCount] = useState(5)
    const [prevCount, setPrevCount] = useState(0)

    const tableHead = Object.keys(data[0])

    const preCount = () =>{
        setCount(count - 5)
        setPrevCount(count - count)
    }
    
    const handleCount = () =>{
        setCount(count + 5)
        setPrevCount(prevCount + count)
    }

    const tableData = data.slice(prevCount,count) 
    
    return (
        <div>
            <table className="table">
                <thead>
                    <TableRow tableHead={tableHead}/>
                </thead> 
                    <TableBody 
                        tableData={tableData}
                        tableHead={tableHead}/>
            </table>
            {data.length >= 5 && <div className="d-flex gap-2"> 
                <button 
                    disabled={data.length > count} 
                    onClick={preCount}
                    className="btn btn-secondary">
                    prev
                </button>
                <button 
                    disabled={data.length < count} 
                    onClick={handleCount}
                    className="btn btn-primary">
                    next
                </button>
             </div>}
        </div>
    )
}
CustomTable.propTypes = {
    data:PropTypes.array.isRequired
}
export default CustomTable