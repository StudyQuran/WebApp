import React, { useEffect } from 'react'
import Routes from './Components/Routes'
import { useDispatch } from 'react-redux'
import { Auth } from '@aws-amplify/auth'
import 'react-toastify/dist/ReactToastify.css'
import './App.css'
import { SetLogin } from './Redux/Auth/Actions'

function App() {
  const dispatch = useDispatch()
  useEffect(() => {
    const sessionPresistence = async () => {
      try {
        const session = (await Auth.currentSession()).getIdToken()
        dispatch(SetLogin(session))
      } catch (error) {
        console.log(error)
      }
    }
    sessionPresistence()
  }, [dispatch])
  return (
    <div className='App'>
      <Routes />
    </div>
  )
}

export default App
