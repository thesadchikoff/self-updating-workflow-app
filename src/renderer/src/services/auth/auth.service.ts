import { LoginData, LoginResponse, RegisterData } from '@renderer/@types/auth'
import { httpInterceptor } from '@renderer/api/http.interceptor'
import userService from '../user/user.service'

class AuthService {
  async login(userData: LoginData) {
    const { data } = await httpInterceptor.post<LoginResponse>('login', userData)
    userService.saveUserToken(data.token)
    console.log(data.token === userService.getUserToken())
    console.log(data.token)
    console.log(userService.getUserToken())
    userService.saveUser(data.user)
    return data
  }
  logout() {
    userService.removeUserToken()
    userService.removeUser()
  }
  async register(userData: RegisterData) {
    const { data } = await httpInterceptor.post<LoginResponse>('register', userData)
    userService.saveUserToken(data.token)
    userService.saveUser(data.user)
    return data
  }
}

export default new AuthService()
