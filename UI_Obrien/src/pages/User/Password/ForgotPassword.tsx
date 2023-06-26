import styles from './Password.module.scss'
import classNames from 'classnames/bind'
import Button from '~/components/Button'
import { useForm, SubmitHandler } from 'react-hook-form'
import { useCombinedContext } from '~/providers/CombinedProvider'
import { useState } from 'react'
import { emailSchema } from '~/schemas/user'
import { Link } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowAltCircleLeft } from '@fortawesome/free-solid-svg-icons'

const cx = classNames.bind(styles)
const ForgotPassword = () => {
  const { authProvider } = useCombinedContext()
  const { register, handleSubmit } = useForm<any>()
  const [errors, setErrors] = useState<any>({})

  const onSubmit: SubmitHandler<any> = (data: any) => {
    const { error } = emailSchema.validate(data, { abortEarly: false })
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

    authProvider.onForgotPassword(data)
    authProvider.setEmail(data.email)
  }
  return (
    <div className={cx('login-area')}>
      <div className={cx('container')}>
        <div className={cx('row')}>
          <div className={cx('form-login-wrapper')}>
            <div className={cx('section-content')}>
              <h2>Forgot Password</h2>
              <p>Please enter your email to send a password reset request.</p>
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
  )
}

export default ForgotPassword
