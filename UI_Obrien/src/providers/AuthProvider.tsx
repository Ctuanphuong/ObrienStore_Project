import { message } from 'antd'
import { useNavigate } from 'react-router-dom'
import { LoginUser, RegisterUser } from '~/interfaces/IAuth'
import { useLogin, useRegister } from '~/services/api/auth'
import { useState } from 'react'
import { forgotPassword, resetPassword, verifyEmailCode } from '~/services/api/user'
import { IResetPassword } from '~/interfaces/IUser'

const AuthProvider = () => {
  const navigate = useNavigate()
  const [email, setEmail] = useState()
  const [dataReset, setDataReset] = useState()

  // Register Account
  const onHandleRegister = async (user: RegisterUser) => {
    try {
      await useRegister(user)
      navigate('/login')
      message.success(`Register account successfully! Please login.`)
    } catch (error: any) {
      if (error.response.data.message) {
        message.error(error.response.data.message)
      }
      console.error(error)
    }
  }

  // Login Account
  const onHandleLogin = async (user: LoginUser) => {
    try {
      const { data } = await useLogin(user)
      localStorage.setItem('accessToken', JSON.stringify(data.accessToken))
      localStorage.setItem('refreshToken', JSON.stringify(data.refreshToken))
      navigate('/')
      window.location.reload()
      alert(`Login successfully!`)
    } catch (error: any) {
      if (error.response.data.message) {
        message.error(error.response.data.message)
      }
      console.error(error)
    }
  }

  // Logout Account
  const onHandleLogout = () => {
    const confirmLogout = window.confirm(`Are you sure want to logout?`)
    if (localStorage.getItem('accessToken') && localStorage.getItem('refreshToken')) {
      if (confirmLogout) {
        localStorage.removeItem('accessToken')
        localStorage.removeItem('refreshToken')
        navigate('/login')
        window.location.reload()
        alert(`You have logged out.`)
      }
    } else {
      message.info("You haven't logged in.")
    }
  }

  // Forgot Password
  const onHandleForgotPassword = async (email: string) => {
    try {
      const { data } = await forgotPassword(email)
      message.info(`${data.message}`)
      navigate('/verify-email')
    } catch (error: any) {
      if (error.response.data.message) {
        message.error(error.response.data.message)
      }
      console.error(error)
    }
  }

  // Verify Email
  const onHandleVerifyEmail = async (emailToken: object) => {
    try {
      const { data } = await verifyEmailCode(emailToken)
      message.info(`${data.message}`)
      navigate('/reset-password')
    } catch (error: any) {
      if (error.response.data.message) {
        message.error(error.response.data.message)
      }
      console.error(error)
    }
  }

  // Reset Password
  const onHandleResetPassword = async (newData: IResetPassword) => {
    try {
      const { data } = await resetPassword(newData)
      message.success(`${data.message}`)
      navigate('/login')
    } catch (error: any) {
      if (error.response.data.message) {
        message.error(error.response.data.message)
      }
      console.error(error)
    }
  }

  return {
    onRegister: onHandleRegister,
    onLogin: onHandleLogin,
    onLogout: onHandleLogout,
    onForgotPassword: onHandleForgotPassword,
    onVerifyEmail: onHandleVerifyEmail,
    onResetPassword: onHandleResetPassword,
    email,
    setEmail,
    dataReset,
    setDataReset
  }
}
export default AuthProvider
