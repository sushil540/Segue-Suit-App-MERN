import React from 'react'
import { Redirect, Route } from 'react-router-dom/cjs/react-router-dom.min'

const PrivateRoute = ({component:Component, ...rest}) =>{
    return (
        <Route 
            render={(props)=>{
                return localStorage.getItem('token') ? (
                    <Component/>
                ) : (
                    <Redirect to={{pathname:"/login"}}/>
                )
        }}/> 
    )
}

export default PrivateRoute