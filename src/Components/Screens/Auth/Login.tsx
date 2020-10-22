import React, { useState } from 'react'
import MyInput from '../../Util/Resuable/MyInput'
import styled from 'styled-components'
import { Link, useHistory } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { Auth } from '@aws-amplify/auth'
import { useForm, SubmitHandler, FormProvider } from 'react-hook-form'
import { SetLogin } from '../../../Redux/Auth/Actions'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers'
import { CognitoHostedUIIdentityProvider } from '@aws-amplify/auth'

const schema = yup.object().shape({
  email: yup.string().required(),
  password: yup.string().required()
})
const Login: React.FC = () => {
  const [error, seterror] = useState<CognitoTypes.CognitoErrorState>()
  const LoginForm = useForm<FormTypes.SignInForm>({
    resolver: yupResolver(schema)
  })
  const { handleSubmit, errors } = LoginForm
  const dispatch = useDispatch()
  const history = useHistory()
  const onSubmit: SubmitHandler<FormTypes.SignInForm> = async (formData) => {
    const { email, password } = formData
    try {
      await Auth.signIn(email, password)
      const session = (await Auth.currentSession()).getIdToken()
      dispatch(SetLogin(session))
      history.push('/')
    } catch (error) {
      seterror(error)
    }
  }
  return (
    <>
      <LoginWrapper>
        <h2>Login</h2>
        <p>{error?.message}</p>
        <FormProvider {...LoginForm}>
          <form onSubmit={handleSubmit(onSubmit)}>
            {errors.email && <p className='text-danger'>Required</p>}
            <MyInput id='email' label='Email' placeholder='Enter Email' input_type='input' name='email' />
            {errors.password && <p className='text-danger'>Required</p>}
            <MyInput
              id='password'
              label='Password'
              placeholder='Enter Password'
              input_type='password'
              name='password'
            />
            <button type='submit'>Login</button>
          </form>
        </FormProvider>
        <MyLink to='/forgotpassword'>Forgot Password?</MyLink>
        <button onClick={() => Auth.federatedSignIn({ provider: CognitoHostedUIIdentityProvider.Google })}>
          Login with google
        </button>
      </LoginWrapper>
    </>
  )
}

export default Login

const LoginWrapper = styled.div`
  margin: 0;
  padding: 0;
  p {
    color: red;
  }
  button {
    padding: 7px 20px;
    color: wheat;
    background-color: rgb(40, 16, 172);
    border: none;
    border-radius: 50px;
    cursor: pointer;
    transition: all 1s ease 0s;
    :hover {
      background-color: red;
    }
  }
`
const MyLink = styled(Link)`
  color: blue;
  transition: all 1s ease 0s;
  :hover {
    color: red;
  }
`
