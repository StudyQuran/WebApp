import axios from 'axios'
import { Auth } from '@aws-amplify/auth'

export const instance = axios.create({
  baseURL: 'https://gju63hb8gi.execute-api.us-east-2.amazonaws.com'
})
Auth.currentAuthenticatedUser()
  .then((data) => {
    instance.defaults.headers.common['Authorization'] = data.signInUserSession.accessToken.jwtToken
  })
  .catch((err) => console.log(err))

export const request = {
  Home: ''
}
