import React, { useEffect } from 'react'
import Container from './components/Container'
import { useDispatch } from 'react-redux'
import { startGetLoggedInUser } from './actions/userActions'
import { Redirect } from 'react-router-dom/cjs/react-router-dom.min'

const App = (props) => {

  const dispatch = useDispatch()
  
  useEffect(()=>{
    if(localStorage.getItem('token')){
        dispatch(startGetLoggedInUser())
    }else{
        <Redirect to={{pathname:"/"}}/>
    }
  },[dispatch]) 

  return (
    <div className="mx-4">
      <Container/>
    </div>
  )
}

export default App
