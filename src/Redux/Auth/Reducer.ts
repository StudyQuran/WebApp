import * as types from './Types'

const AuthState = {
  isAuth: false,
  user: {}
}

const AuthReducer = (state = AuthState, action: any) => {
  switch (action.type) {
    case types.login:
      return {
        ...state,
        isAuth: true,
        user: action.payload
      }
    case types.logout:
      return {
        ...state,
        isAuth: false,
        user: {}
      }
    default:
      return state
  }
}

export default AuthReducer
