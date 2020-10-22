import React, { useState } from 'react'
import styled from 'styled-components'
import { useHistory } from 'react-router-dom'
import { useForm, SubmitHandler, FormProvider } from 'react-hook-form'
import { Auth } from '@aws-amplify/auth'
import MyInput from '../../Util/Resuable/MyInput'

const SignUp: React.FC = () => {
  const [error, seterror] = useState<CognitoTypes.CognitoErrorState>()
  const RegisterForm = useForm<FormTypes.SignUpForm>()
  const { handleSubmit } = RegisterForm
  const history = useHistory()
  const onSubmit: SubmitHandler<FormTypes.SignUpForm> = async (formData) => {
    const { given_name, email, password } = formData
    try {
      const signUpRes = await Auth.signUp({
        username: email,
        password,
        attributes: {
          given_name
        }
      })
      console.log(signUpRes)
      history.push('/verifyemail')
    } catch (error) {
      seterror(error)
    }
  }
  return (
    <>
      <SignUpWrapper>
        <h2>Sign Up</h2>
        <p>{error?.message}</p>
        <FormProvider {...RegisterForm}>
          <form onSubmit={handleSubmit(onSubmit)}>
            <MyInput
              id='given_name'
              label='First Name'
              placeholder='Enter First Name'
              input_type='input'
              name='given_name'
            />
            <MyInput id='email' label='Email' placeholder='Enter Emial' input_type='input' name='email' />
            <MyInput
              id='password'
              label='Password'
              placeholder='Enter Password'
              input_type='password'
              name='password'
            />
            <MyInput
              id='confirmpassword'
              label='Confirm Password'
              placeholder='Enter Password again'
              input_type='password'
              name='confirmpassword'
            />
            <button type='submit'>Sign Up</button>
          </form>
        </FormProvider>
      </SignUpWrapper>
    </>
  )
}

export default SignUp

const SignUpWrapper = styled.div`
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
