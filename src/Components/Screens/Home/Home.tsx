import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { ApiCalls } from '../../Util/Api/ApiCalls'

const Home: React.FC = () => {
  const [HomeData, setHomeData] = useState<ApiDataTypes.ApiData>()
  const AuthState: ReduxStateTypes.AuthState = useSelector<ReduxStateTypes.Auth, ReduxStateTypes.AuthState>(
    (state) => state.Auth
  )
  const getHome = async () => {
    setHomeData(await ApiCalls.getHome())
  }
  return (
    <div>
      Home Page {AuthState.isAuth && <button onClick={getHome}>http test</button>}
      <p>{HomeData?.data}</p>
    </div>
  )
}

export default Home
