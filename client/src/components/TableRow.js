import React from 'react'

const TableRow = (props) =>{
    const { tableHead } = props

    return (
        <tr>
            {tableHead?.map((ele,i)=>{  
                return <th key={i}>{ele}</th>
            })}  
        </tr>
    )
}

export default TableRow