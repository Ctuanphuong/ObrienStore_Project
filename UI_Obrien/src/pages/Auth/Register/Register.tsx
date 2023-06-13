import React from 'react'
import styles from './Register.module.scss'
import classNames from 'classnames/bind'
import BreadCrumbs from '~/components/BreadCrumbs'
import Button from '~/components/Button'

const cx = classNames.bind(styles)
const Register = () => {
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
              <form action=''>
                <div className={cx('single-input')}>
                  <input type='text' placeholder='First Name' className={cx('input-text')} />
                </div>
                <div className={cx('single-input')}>
                  <input type='text' placeholder='Last Name' className={cx('input-text')} />
                </div>
                <div className={cx('single-input')}>
                  <input type='email' placeholder='Email or Username' className={cx('input-text')} />
                </div>
                <div className={cx('single-input')}>
                  <input type='email' placeholder='Enter your Password' className={cx('input-text')} />
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
