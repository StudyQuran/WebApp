import { instance, request } from './Axios'

const getHome = async () => {
  const data = (await instance.get(request.Home)) as ApiDataTypes.ApiData
  return data
}

export const ApiCalls = {
  getHome
}
