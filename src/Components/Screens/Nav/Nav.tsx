import React, { MouseEvent } from 'react'
import Settings from '../../../Settings.json'
import styled from 'styled-components'
import { Link, useHistory } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { Auth } from '@aws-amplify/auth'
import { SetLogout } from '../../../Redux/Auth/Actions'

const Header: React.FC = () => {
  const dispatch = useDispatch()
  const history = useHistory()
  const AuthState: ReduxStateTypes.AuthState = useSelector<ReduxStateTypes.Auth, ReduxStateTypes.AuthState>(
    (state) => state.Auth
  )
  const HandleLogout = async (e: MouseEvent) => {
    e.preventDefault()
    try {
      await Auth.signOut()
      dispatch(SetLogout())
      history.push('/')
    } catch (error) {
      console.log(error)
    }
  }
  return (
    <NavWrapper>
      <nav>
        <h4 className='logo'>
          <MyLink to='/'>{Settings.ProjectName} </MyLink>
        </h4>
        <ul>
          {!AuthState.isAuth ? (
            <>
              <MyLink to='/login'>
                <button type='button'>Login</button>
              </MyLink>
              <MyLink to='/signup'>
                <button type='button'>Sign Up</button>
              </MyLink>
            </>
          ) : (
            <>
              <MyLink to='/accountpage'>
                <button type='button'>{AuthState.user.payload.given_name}</button>
              </MyLink>
              <button type='button' onClick={HandleLogout}>
                Logout
              </button>
            </>
          )}
        </ul>
      </nav>
    </NavWrapper>
  )
}

export default Header

const NavWrapper = styled.div`
  margin: 0;
  padding: 0;
  .logo {
    color: white;
    cursor: pointer;
    margin-right: auto;
  }
  nav {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 5px 10%;
    background-color: black;
  }
  button {
    padding: 5px 15px;
    margin: 0px 10px;
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
  ul {
    list-style: none;
    margin-bottom: 0;
  }
  li {
    display: inline-block;
    padding: 0px 20px;
  }
`

const MyLink = styled(Link)`
  color: white;
  transition: all 1s ease 0s;
  :hover {
    color: red;
  }
`
