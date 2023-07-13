import React, { Component } from 'react'
import { useSelector } from 'react-redux'
import { Redirect, Route } from 'react-router-dom/cjs/react-router-dom.min'

const ProtectedRoute = ({Component:component, ...rest}) =>{
    const user = useSelector((state)=>{
        return state.user.data
    })
    console.log("user?.role",user?.role)

    return (
        <Route 
            {...rest}
            render={(props)=>{
                return localStorage.getItem('token') && user?.role === 'admin' ? (
                    <Component/>
                ) : (
                    <Redirect to={{pathname:"/dashboard"}}/>
                )
        }}/> 
    )
}

export default ProtectedRoute