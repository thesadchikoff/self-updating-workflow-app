import axios from 'axios'

import userService from '@renderer/services/user/user.service.js'
import config from '@renderer/shared/config'

// import userService from "../services/user/user.service.ts";

export const httpInterceptor = axios.create({
  baseURL: config.baseURL
  // withCredentials: true
})

export const httpInterceptorWithToken = axios.create({
  baseURL: config.baseURL,
  headers: {
    Authorization: `Bearer ${userService.getUserToken()}`,
    'Content-Security-Policy': 'policy'
  }
})

export function createAxiosClient() {
  const client = axios.create({
    baseURL: config.baseURL
    // withCredentials: true
  })

  client.interceptors.request.use(
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (config: any) => {
      if (config.authorization !== false) {
        const token = userService.getUserToken()
        if (token) {
          config.headers.Authorization = 'Bearer ' + token
        }
      }
      return config
    },
    (error) => {
      return Promise.reject(error)
    }
  )

  return client
}
