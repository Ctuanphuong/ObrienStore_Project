import { LoginUser, RegisterUser } from '~/interfaces/IAuth'
import instance from './instance'
export const useRegister = (user: RegisterUser) => {
  return instance.post(`/register`, user)
}

export const useLogin = (user: LoginUser) => {
  return instance.post(`/login`, user)
}
