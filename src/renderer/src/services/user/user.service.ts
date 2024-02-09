import { User } from '@renderer/@types/auth'
import { createAxiosClient } from '../../api/http.interceptor'
// import { User } from "../../types/auth.types";

class UserService {
  getUserFromLocalStorage() {
    const user = localStorage.getItem('user')
    return user ? JSON.parse(user) : null
  }

  async getProfile() {
    const client = createAxiosClient()
    const { data } = await client.get('get-me', {
      // @ts-ignore
      authorization: true
    })
    return data.user
  }

  saveUser(user: User): void {
    localStorage.setItem('user', JSON.stringify(user))
  }

  removeUser() {
    localStorage.removeItem('user')
  }

  saveUserToken(accessToken: string) {
    localStorage.setItem('accessToken', accessToken)
  }

  getUserToken() {
    const accessToken = localStorage.getItem('accessToken')
    return accessToken ? accessToken : null
  }

  removeUserToken() {
    localStorage.removeItem('accessToken')
  }
}

export default new UserService()
