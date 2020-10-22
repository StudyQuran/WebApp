import React from 'react'
import styled from 'styled-components'
import { Link } from 'react-router-dom'

const VerifyEmail: React.FC = () => {
  return (
    <>
      <p>Thank you for signing up, please verify your email.</p>
      <MyLink to='/login'>Login</MyLink>
    </>
  )
}

export default VerifyEmail

const MyLink = styled(Link)`
  color: white;
  transition: all 1s ease 0s;
  :hover {
    color: red;
  }
`
