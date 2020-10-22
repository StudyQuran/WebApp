declare namespace ReduxStateTypes {
  interface Auth {
    Auth: AuthState
  }
  interface AuthState {
    isAuth: boolean
    user: UserObject
  }
  interface UserObject {
    jwtToken: string
    payload: Payload
  }
  interface Payload {
    at_hash?: string
    sub: string
    aud: string
    auth_time: number
    'cognito:groups'?: object
    'cognito:username': string
    event_id?: string
    email: string
    email_verified: boolean
    exp: number
    iat: number
    identities?: object
    iss: string
    given_name: string
    nonce?: string
    picture?: string
    token_use: string
  }
}
