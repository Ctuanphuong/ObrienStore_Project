import BreadCrumbs from '~/components/BreadCrumbs'
import styles from './Login.module.scss'
import classNames from 'classnames/bind'
import Button from '~/components/Button'
import { Link } from 'react-router-dom'

const cx = classNames.bind(styles)
const Login = () => {
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
              <form action=''>
                <div className={cx('single-input-item')}>
                  <input type='email' placeholder='Email or Username' className={cx('input-text')} />
                </div>
                <div className={cx('single-input-item')}>
                  <input type='password' placeholder='Enter Your Password' className={cx('input-text')} />
                </div>
                <div className={cx('single-input-item')}>
                  <div className={cx('login-reg-form-meta')}>
                    <div className={cx('remember-meta')}>
                      <div className={cx('custom-checkbox')}>
                        <input type='checkbox' id='rememberMe' />
                        <label htmlFor='rememberMe'>Remember Me</label>
                      </div>
                    </div>
                    <Link to='/forget-password' className={cx('forget-password')}>
                      Forget Password?
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
