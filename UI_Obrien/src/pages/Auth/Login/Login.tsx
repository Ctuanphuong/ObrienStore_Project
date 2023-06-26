import BreadCrumbs from '~/components/BreadCrumbs'
import styles from './Login.module.scss'
import classNames from 'classnames/bind'
import Button from '~/components/Button'
import { Link, useNavigate } from 'react-router-dom'
import { useCombinedContext } from '~/providers/CombinedProvider'
import { useForm, SubmitHandler } from 'react-hook-form'
import { LoginUser } from '~/interfaces/IAuth'
import { loginSchema } from '~/schemas/auth'
import { useState } from 'react'

const cx = classNames.bind(styles)
const Login = () => {
  const { authProvider } = useCombinedContext()
  const { register, handleSubmit } = useForm<LoginUser>()
  const [errors, setErrors] = useState<any>({})

  const onSubmit: SubmitHandler<LoginUser> = (data: LoginUser) => {
    const { error } = loginSchema.validate(data, { abortEarly: false })
    if (error) {
      const validationErrors: Record<string, string[]> = {}
      error.details.forEach((err: any) => {
        const { key } = err.context
        if (!validationErrors[key]) {
          validationErrors[key] = []
        }
        validationErrors[key].push(err.message)
      })
      setErrors(validationErrors)
    }
    authProvider.onLogin(data)
  }
  return (
    <>
      <BreadCrumbs title='Login To Account' page='Login' />
      <div className={cx('login-area')}>
        <div className={cx('container')}>
          <div className={cx('row')}>
            <div className={cx('form-login-wrapper')}>
              <div className={cx('section-content')}>
                <h2>Login</h2>
                <p>Please login using account detail bellow.</p>
              </div>
              <form onSubmit={handleSubmit(onSubmit)}>
                <div className={cx('single-input-item')}>
                  <input type='text' placeholder='Email' className={cx('input-text')} {...register('email')} />
                  {errors.email &&
                    errors.email.map((error: string, index: number) => (
                      <p key={index} className={cx('error-validate')}>
                        {error}
                      </p>
                    ))}
                </div>
                <div className={cx('single-input-item')}>
                  <input
                    type='password'
                    placeholder='Password'
                    className={cx('input-text')}
                    {...register('password')}
                  />
                  {errors.password &&
                    errors.password.map((error: string, index: number) => (
                      <p key={index} className={cx('error-validate')}>
                        {error}
                      </p>
                    ))}
                </div>
                <div className={cx('single-input-item')}>
                  <div className={cx('login-reg-form-meta')}>
                    <div className={cx('remember-meta')}>
                      <div className={cx('custom-checkbox')}>
                        <input type='checkbox' id='rememberMe' />
                        <label htmlFor='rememberMe'>Remember Me</label>
                      </div>
                    </div>
                    <Link to='/forgot-password' className={cx('forgot-password')}>
                      Forgot Password?
                    </Link>
                  </div>
                </div>
                <div className={cx('single-input-item')}>
                  <Button small>Login</Button>
                </div>
                <Link to={'/register'} className={cx('create-account')}>
                  Creat Account
                </Link>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Login
