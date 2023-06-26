import styles from './Verify.module.scss'
import classNames from 'classnames/bind'
import Button from '~/components/Button'
import { useForm, SubmitHandler } from 'react-hook-form'
import { useCombinedContext } from '~/providers/CombinedProvider'
import { useState } from 'react'
import { verifyTokenSchema } from '~/schemas/user'
import { Link, useNavigate } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowAltCircleLeft } from '@fortawesome/free-solid-svg-icons'

const cx = classNames.bind(styles)
const VerifyEmail = (): any => {
  const navigate = useNavigate()
  const { authProvider } = useCombinedContext()
  const { register, handleSubmit } = useForm<any>()
  const [errors, setErrors] = useState<any>({})

  // check xem đã nhập đi qua trang forgot password và nhập email vào chưa
  if (!authProvider.email || authProvider.email == null) {
    return navigate('/forgot-password')
  }

  const onSubmit: SubmitHandler<any> = (data: string) => {
    const { error } = verifyTokenSchema.validate(data, { abortEarly: false })
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

    authProvider.onVerifyEmail(data)
    authProvider.setDataReset(data)
  }
  return (
    <>
      <div className={cx('login-area')}>
        <div className={cx('container')}>
          <div className={cx('row')}>
            <div className={cx('form-login-wrapper')}>
              <div className={cx('section-content')}>
                <h2>Verify</h2>
                <p>Please enter the verification code that has been sent to your email.</p>
              </div>
              <form onSubmit={handleSubmit(onSubmit)}>
                <div className={cx('single-input-item')}>
                  <input
                    type='text'
                    placeholder='Verify Code'
                    className={cx('input-text')}
                    {...register('verifyToken')}
                  />
                  {errors.verifyToken &&
                    errors.verifyToken.map((error: string, index: number) => (
                      <p key={index} className={cx('error-validate')}>
                        {error}
                      </p>
                    ))}
                  <input type='hidden' {...register('email')} defaultValue={authProvider?.email} />
                </div>
                <div className={cx('single-input-item')}>
                  <Button small>Verify</Button>
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

export default VerifyEmail
