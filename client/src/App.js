import React, { useEffect } from 'react'
import Container from './components/Container'
import { useDispatch } from 'react-redux'
import { startGetLoggedInUser } from './actions/userActions'

function App(props) {

  const dispatch = useDispatch()
  
  useEffect(()=>{
    if(localStorage.getItem('token')){
        dispatch(startGetLoggedInUser())
    }
  },[dispatch]) 

  return (
    <div className="mx-4">
      <Container/>
    </div>
  )
}

export default App
