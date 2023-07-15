import React, { useState } from 'react'

const TableBody = (props) =>{
    const { tableData, tableHead } = props 

    return (
            <tbody>
                {tableData.map((ele, i)=>{
                    return (
                        <tr key={i}>
                            {tableHead.map((thead,index)=>{
                                return <td key={index}>{ele[thead]}</td>
                            })}
                        </tr>
                    )
                })} 
            </tbody>
    )
}

export default TableBody