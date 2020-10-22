import React from 'react'
import { Switch, Route } from 'react-router-dom'
import SignUp from './Screens/Auth/SignUp'
import Login from './Screens/Auth/Login'
import Home from './Screens/Home/Home'
import Error from './Error'
import Nav from './Screens/Nav/Nav'
import VerifyEmail from './Screens/Auth/VerifyEmail'
import ForgotPassword from './Screens/Auth/ForgotPassword'
import ChangePassword from './Screens/Auth/ChangePassword'

const Routes: React.FC = () => {
  return (
    <>
      <Nav />
      <Switch>
        <Route path='/' component={Home} exact />
        <Route path='/login' component={Login} exact />
        <Route path='/signup' component={SignUp} exact />
        <Route path='/verifyemail' component={VerifyEmail} exact />
        <Route path='/forgotpassword' component={ForgotPassword} exact />
        <Route path='/changepassword' component={ChangePassword} exact />
        <Route component={Error} />
      </Switch>
    </>
  )
}

export default Routes
