import React from 'react'
import { Redirect, Route } from 'react-router-dom/cjs/react-router-dom.min'

const ProtectedRoute = ({component:Component, ...rest}) =>{
    const { permitted, path} = rest
    return (
        <Route 
            {...rest}
            render = {(props)=>{
                if(path === "/staffs"){
                    return (
                        localStorage.getItem("token") && permitted === "admin" ? ( 
                            <Component {...props}/>
                        ) : (
                            <Redirect
                                to = {{
                                    pathname:"/dashboard"
                                }}
                            />
                        )
                    )
                }
        }}/> 
    )
}

export default ProtectedRoute