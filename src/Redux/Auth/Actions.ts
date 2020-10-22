import * as types from './Types'

export const SetLogin = (data: any) => {
  return {
    type: types.login,
    payload: data
  }
}
export const SetLogout = () => {
  return {
    type: types.logout
  }
}
