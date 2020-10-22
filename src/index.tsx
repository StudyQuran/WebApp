import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import store from './Redux/Store'
import { HashRouter as Router } from 'react-router-dom'
import Amplify from 'aws-amplify'
import App from './App'

Amplify.configure({
  Auth: {
    mandatorySignId: true,
    region: process.env.REACT_APP_COGNITO_REGION,
    userPoolId: process.env.REACT_APP_COGNITO_POOL_ID,
    userPoolWebClientId: process.env.REACT_APP_COGNITO_APP_ID,
    oauth: {
      domain: 'learnquran.auth.us-east-2.amazoncognito.com',
      redirectSignIn: 'http://localhost:3000/',
      redirectSignOut: 'http://localhost:3000/',
      responseType: 'token'
    }
  }
})

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <Router>
        <App />
      </Router>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
)
