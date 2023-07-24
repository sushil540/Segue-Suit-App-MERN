import React, { useState } from 'react'
import PropTypes from 'prop-types'
import TableRow from './TableRow'
import TableBody from './TableBody'
import { ChevronLeft, ChevronRight } from 'lucide-react'

const CustomTable = (props) =>{
    const { data } = props
    
    const [prevCount, setPrevCount] = useState(0)
    const [count, setCount] = useState(5)

    const tableHead = Object.keys(data[0])

    const preCount = () =>{
        setPrevCount(prevCount - 5)
        setCount(count - 5)
    }
    
    const handleCount = () =>{
        setPrevCount(prevCount + 5)
        setCount(count + 5)
    }

    const tableData = data?.slice(prevCount, count) 
    
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
            {data?.length > 5 && <div className="d-flex gap-1"> 
                <button 
                    disabled={prevCount <= 0} 
                    onClick={preCount}
                    className="btn btn-light">
                  <ChevronLeft size={32} />
                </button>
                <button 
                    disabled={data.length <= count} 
                    onClick={handleCount}
                    className="btn btn-light">
                   <ChevronRight size={32} />
                </button>
             </div>}
        </div>
    )
}
CustomTable.propTypes = {
    data:PropTypes.array.isRequired
}
export default CustomTable