import axios from 'axios'
import { API_BASE_URL } from '../constants'

const axiosReborn = async (method, endpoint, obj, session) => {
  const axiosInstance = axios.create({
    baseURL: API_BASE_URL,
    timeout: 5000,
    headers: {
      Authorization: session.token.access
        ? 'Bearer ' + session.token.access
        : null,
      'Content-Type': 'application/json',
      accept: 'application/json',
    },
  })

  axiosInstance.interceptors.response.use(
    (response) => {
      return response
    },
    async (error) => {
      const originalRequest = error.config
      const serverResponse = error.response

      // console.log('SE DISPARÓ UN ERROR: ', serverResponse)
      // if (
      //   serverResponse.status === 500 &&
      //   originalRequest.url === '/blog/posts/' &&
      //   serverResponse.data[0] === 'IntegrityError'
      // ) {
      //   error.response.message = 'Un post así ya fué creado hoy.'
      //   return Promise.reject(error)
      // }

      if (
        serverResponse.status === 401 &&
        serverResponse.data.code === 'token_not_valid' &&
        serverResponse.statusText === 'Unauthorized'
      ) {
        const refreshToken = session.token.refresh
        if (refreshToken) {
          const tokenParts = JSON.parse(atob(refreshToken.split('.')[1]))

          // exp date in token is expressed in seconds, while now() returns milliseconds:
          const now = Math.ceil(Date.now() / 1000)
          if (tokenParts.exp > now) {
            return axiosInstance
              .post('/accounts/token/refresh/', {
                refresh: refreshToken,
              })
              .then((response) => {
                session.token.access = response.data.access
                axiosInstance.defaults.headers['Authorization'] =
                  'Bearer ' + response.data.access
                originalRequest.headers['Authorization'] =
                  'Bearer ' + response.data.access

                return axiosInstance(originalRequest)
              })
              .catch((err) => {
                console.log('AXIOS INSTANCE REFRESH ERROR: ', err)
                return Promise.reject(err)
              })
          } else {
            console.log('token expired')
            window.location.href = '/login/'
          }
        } else {
          console.log('Refresh token not available.')
          window.location.href = '/login/'
        }
      }
      return Promise.reject(error)
    }
  )

  // THE ACTUAL CALLS
  switch (method) {
    case 'GET':
      try {
        const res = await axiosInstance.get(endpoint)
        const data = await res.data
        console.log('LAST GET: ', data)
        return data
      } catch (error) {
        console.log('GET SWITCH ERROR: ', error)
      }
      break
    case 'POST':
      try {
        console.log('starting...')
        const res = await axiosInstance.post(endpoint, obj)
        const data = await res
        return data
      } catch (error) {
        console.log('POST SWITCH ERROR: ', error)
        return error
      }
      break
    case 'DELETE':
      try {
        const res = await axiosInstance.delete(endpoint, { data: obj })
        const data = await res.data
        return data
      } catch (error) {
        console.log('POST SWITCH ERROR: ', error)
      }
      break
    case 'PATCH':
      try {
        const res = await axiosInstance.patch(endpoint, obj)
        const data = await res.data
        return data
      } catch (error) {
        console.log('POST SWITCH ERROR: ', error)
      }
      break
    case 'PUT':
      try {
        const res = await axiosInstance.put(endpoint, obj)
        const data = await res.data
        return data
      } catch (error) {
        console.log('POST SWITCH ERROR: ', error)
      }
      break

    default:
      break
  }
}

export default axiosReborn
