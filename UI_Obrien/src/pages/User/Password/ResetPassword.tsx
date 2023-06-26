import styles from './Password.module.scss'
import classNames from 'classnames/bind'
import Button from '~/components/Button'
import { useState } from 'react'
import { useForm, SubmitHandler } from 'react-hook-form'
import { useCombinedContext } from '~/providers/CombinedProvider'
import { resetPasswordSchema } from '~/schemas/user'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowAltCircleLeft } from '@fortawesome/free-solid-svg-icons'
import { Link, useNavigate } from 'react-router-dom'

const cx = classNames.bind(styles)
const ResetPassword = (): any => {
  const navigate = useNavigate()
  const { authProvider } = useCombinedContext()
  const verifyToken = authProvider?.dataReset?.verifyToken
  const email = authProvider?.dataReset?.email

  const { register, handleSubmit } = useForm<any>()
  const [errors, setErrors] = useState<any>({})

  // check xem đã đi qua verify email chưa, chưa thì cho quay lại từ đầu trang
  // forgot password để nhập email lấy mã xác thực
  if (!authProvider.dataReset || authProvider.dataReset == null) {
    return navigate('/forgot-password')
  }

  const onSubmit: SubmitHandler<any> = (data: any) => {
    const { error } = resetPasswordSchema.validate(data, { abortEarly: false })
    if (error) {
      const validationErrors: Record<any, any[]> = {}
      error.details.forEach((err: any) => {
        const { key } = err.context
        if (!validationErrors[key]) {
          validationErrors[key] = []
        }
        validationErrors[key].push(err.message)
      })
      setErrors(validationErrors)
    }

    if (data.confirmPassword !== data.password) {
      throw new Error('Mat khau khong khop')
    }

    delete data.confirmPassword

    authProvider.onResetPassword(data)
  }
  return (
    <>
      <div className={cx('login-area')}>
        <div className={cx('container')}>
          <div className={cx('row')}>
            <div className={cx('form-login-wrapper')}>
              <div className={cx('section-content')}>
                <h2>Reset Password</h2>
                <p>Enter new password to complete your password reset.</p>
              </div>
              <form onSubmit={handleSubmit(onSubmit)}>
                <div className={cx('single-input-item')}>
                  <input type='hidden' {...register('email')} defaultValue={email!} />
                  <input type='hidden' {...register('verifyToken')} defaultValue={verifyToken!} />
                  <input
                    type='password'
                    placeholder='New Password'
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
                  <input
                    type='password'
                    placeholder='Confirm New Password'
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
                <div className={cx('single-input-item')}>
                  <Button small>Submit</Button>
                </div>
                <Link to={'/'} className={cx('back-to-home')}>
                  <FontAwesomeIcon icon={faArrowAltCircleLeft} className={cx('icon-back')} /> Back Home
                </Link>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default ResetPassword
