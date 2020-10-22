import React, { useState } from 'react'
import { useForm, SubmitHandler, FormProvider } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers'
import * as yup from 'yup'
import MyInput from '../../Util/Resuable/MyInput'
import { Auth } from '@aws-amplify/auth'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import { ToastContainer, toast } from 'react-toastify'

const schema = yup.object().shape(
  {
    email: yup
      .string()
      .email()
      .when('username', {
        is: (value) => !value,
        then: yup.string().required()
      }),
    username: yup.string().when('email', { is: (value) => !value, then: yup.string().required() })
  },
  [['email', 'username']]
)
const ForgotPassword: React.FC = () => {
  const [error, seterror] = useState<CognitoTypes.CognitoErrorState>()
  const [toggleButton, setToggleButton] = useState<boolean>(false)
  const Toast = () => toast('Email sent!')
  const ForgotPasswordForm = useForm<FormTypes.ForgotPassword>({
    defaultValues: {
      email: '',
      username: ''
    },
    resolver: yupResolver(schema)
  })
  const { handleSubmit, errors, formState } = ForgotPasswordForm
  const { dirtyFields } = formState
  const onSubmit: SubmitHandler<FormTypes.ForgotPassword> = async (formData) => {
    const { email, username } = formData
    const cred = dirtyFields.email ? email : username
    try {
      await Auth.forgotPassword(cred)
      Toast()
      setToggleButton(true)
    } catch (error) {
      seterror(error)
    }
  }
  return (
    <ForgotPasswordWrapper>
      <h2>Forgot Password</h2>
      <p> Please enter the email address associated with your account and we'll email you a password reset link.</p>
      <p>{error?.message}</p>
      <FormProvider {...ForgotPasswordForm}>
        <form onSubmit={handleSubmit(onSubmit)}>
          {errors.email && <p className='text-danger'>Please enter a vaild email.</p>}
          {errors.username && <p className='text-danger'>Please enter a User Name.</p>}
          {!dirtyFields.email && (
            <MyInput id='username' label='User Name' placeholder='Enter User Name' input_type='input' name='username' />
          )}
          {!dirtyFields.email && !dirtyFields.username && (
            <>
              <br></br>Or<br></br>
            </>
          )}
          {!dirtyFields.username && (
            <MyInput id='email' label='Email' placeholder='Enter Email' input_type='input' name='email' />
          )}
          <br></br>
          <button type='submit'>Submit</button>
        </form>
      </FormProvider>
      <ToastContainer />
      {toggleButton && <MyLink to='changepassword'>I have the code.</MyLink>}
    </ForgotPasswordWrapper>
  )
}

export default ForgotPassword

const ForgotPasswordWrapper = styled.div`
  margin: 0;
  padding: 0;
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
  color: red;
  transition: all 1s ease 0s;
  :hover {
    color: blue;
  }
`
