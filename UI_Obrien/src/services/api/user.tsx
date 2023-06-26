import { IResetPassword } from '~/interfaces/IUser'
import instance from './instance'

export const forgotPassword = (email: string) => {
  return instance.post('/user/forgot-password', email)
}

export const verifyEmailCode = (emailToken: object) => {
  return instance.post('/user/verify-email', emailToken)
}

export const resetPassword = (data: IResetPassword) => {
  return instance.post('/user/reset-password', data)
}
