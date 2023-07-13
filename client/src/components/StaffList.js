import React from 'react'
import { useSelector } from 'react-redux'

const StaffList = (props) =>{

    const staff = useSelector((state)=>{
        return state.staff.data
    })

    console.log("staff",staff)

    return (    
        <div>
            <table>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Mobile</th>
                    </tr>
                </thead>
                <tbody>
                    {/* {staff.map((ele)=>{
                        return (
                            <tr>
                                <td>{ele.}</td>
                            </tr>
                        )
                    })} */}
                </tbody>
            </table>
        </div>
    )
}

export default StaffList 