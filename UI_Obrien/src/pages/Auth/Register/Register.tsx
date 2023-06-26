import styles from './Register.module.scss'
import classNames from 'classnames/bind'
import BreadCrumbs from '~/components/BreadCrumbs'
import Button from '~/components/Button'
import { useCombinedContext } from '~/providers/CombinedProvider'
import { useForm, SubmitHandler } from 'react-hook-form'
import { RegisterUser } from '~/interfaces/IAuth'
import { registerSchema } from '~/schemas/auth'
import { useState } from 'react'

const cx = classNames.bind(styles)

const Register = () => {
  const { authProvider } = useCombinedContext()
  const { register, handleSubmit } = useForm<RegisterUser>()
  const [errors, setErrors] = useState<any>({})

  const onSubmit: SubmitHandler<RegisterUser> = (data: RegisterUser) => {
    const { error } = registerSchema.validate(data, { abortEarly: false })
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
    authProvider.onRegister(data)
  }

  return (
    <>
      <BreadCrumbs title='Register Account' page='Register' />
      <div className={cx('register-area')}>
        <div className={cx('container')}>
          <div className={cx('row')}>
            <div className={cx('login-register-wrapper')}>
              <div className={cx('section-content')}>
                <h2>Create Account</h2>
                <p>Please Register using account detail bellow.</p>
              </div>
              <form onSubmit={handleSubmit(onSubmit)}>
                <div className={cx('single-input')}>
                  <input type='text' placeholder='Full Name' className={cx('input-text')} {...register('name')} />
                  {errors.name &&
                    errors.name.map((error: string, index: number) => (
                      <p key={index} className={cx('error-validate')}>
                        {error}
                      </p>
                    ))}
                </div>
                <div className={cx('single-input')}>
                  <input type='text' placeholder='Phone Number' className={cx('input-text')} {...register('phone')} />
                  {errors.phone &&
                    errors.phone.map((error: string, index: number) => (
                      <p key={index} className={cx('error-validate')}>
                        {error}
                      </p>
                    ))}
                </div>
                <div className={cx('single-input')}>
                  <input type='text' placeholder='Email' className={cx('input-text')} {...register('email')} />
                  {errors.email &&
                    errors.email.map((error: string, index: number) => (
                      <p key={index} className={cx('error-validate')}>
                        {error}
                      </p>
                    ))}
                </div>
                <div className={cx('single-input')}>
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
                <div className={cx('single-input')}>
                  <input
                    type='password'
                    placeholder='Confirm Password'
                    className={cx('input-text')}
                    {...register('confirmPassword')}
                  />
                  {errors.confirmPassword &&
                    errors.confirmPassword.map((error: string, index: number) => (
                      <p key={index} className={cx('error-validate')}>
                        {error}
                      </p>
                    ))}
                </div>
                <div className={cx('single-input')}>
                  <div className={cx('register-reg-form-meta')}>
                    <div className={cx('subscribe-meta')}>
                      <div className={cx('custom-checkbox')}>
                        <input type='checkbox' id='subscribe' />
                        <label htmlFor='subscribe'>Subscribe Our Newsletter</label>
                      </div>
                    </div>
                  </div>
                </div>
                <div className={cx('single-input')}>
                  <Button small>Register</Button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Register
