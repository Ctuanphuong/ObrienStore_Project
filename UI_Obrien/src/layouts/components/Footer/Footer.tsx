import { useState, useEffect } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import styles from './Footer.module.scss'
import classNames from 'classnames/bind'
import { faChevronUp } from '@fortawesome/free-solid-svg-icons'
import Button from '~/components/Button'
import { Link } from 'react-router-dom'
import images from '~/assets/images'

const cx = classNames.bind(styles)
const Footer = () => {
  const [show, setShow] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      window.scrollY >= 200 ? setShow(true) : setShow(false)
    }
    window.addEventListener('scroll', handleScroll)

    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  return (
    <footer className={cx('wrapper')}>
      {/* SUPPORT AREA */}
      <div className={cx('support-area')}>
        <div className={cx('container')}>
          <div className={cx('row-support')}>
            <div className={cx('col-support')}>
              <div className={cx('support-context')}>
                <h1 className={cx('title')}>Need Help ?</h1>
                <p>Call our support 24/7 at 0869-784-543</p>
              </div>
              <div className={cx('wrap-support-btn')}>
                <Button primary>Contact Now</Button>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/*END SUPPORT AREA */}
      {/* FOOTER AREA */}
      <div className={cx('footer-widget-area')}>
        <div className={cx('container')}>
          <div className={cx('row-widget')}>
            {/* one col */}
            <div className={cx('col-brand')}>
              <div className={cx('footer-logo')}>
                <Link to={'/'}>
                  <img src={images.logo.footerLogo} alt="Obrien's logo" />
                </Link>
              </div>
              <p className={cx('desc-content')}>
                Obrien is the best parts shop of your daily nutritions. What kind of nutrition do you need you can get
                here soluta nobis
              </p>

              <div className={cx('social-links')}>
                <ul>
                  <li>
                    <a href='https://www.facebook.com/phuongctdev'>
                      <svg xmlns='http://www.w3.org/2000/svg' height='1em' viewBox='0 0 320 512'>
                        <path d='M279.14 288l14.22-92.66h-88.91v-60.13c0-25.35 12.42-50.06 52.24-50.06h40.42V6.26S260.43 0 225.36 0c-73.22 0-121.08 44.38-121.08 124.72v70.62H22.89V288h81.39v224h100.17V288z' />
                      </svg>
                    </a>
                  </li>
                  <li>
                    <a href='https://www.instagram.com/empty.ctp/'>
                      <i className='bi bi-instagram'></i>
                    </a>
                  </li>
                  <li>
                    <a href='https://twitter.com/ctuanphuong'>
                      <i className='bi bi-twitter'></i>
                    </a>
                  </li>
                  <li>
                    <a href='https://www.tiktok.com/@ctuanphuong_'>
                      <i className='bi bi-tiktok'></i>
                    </a>
                  </li>
                  <li>
                    <a href='https://www.linkedin.com/in/chu-tuan-phuong-8739b1241/'>
                      <svg xmlns='http://www.w3.org/2000/svg' height='1em' viewBox='0 0 448 512'>
                        <path d='M100.28 448H7.4V148.9h92.88zM53.79 108.1C24.09 108.1 0 83.5 0 53.8a53.79 53.79 0 0 1 107.58 0c0 29.7-24.1 54.3-53.79 54.3zM447.9 448h-92.68V302.4c0-34.7-.7-79.2-48.29-79.2-48.29 0-55.69 37.7-55.69 76.7V448h-92.78V148.9h89.08v40.8h1.3c12.4-23.5 42.69-48.3 87.88-48.3 94 0 111.28 61.9 111.28 142.3V448z' />
                      </svg>
                    </a>
                  </li>
                </ul>
              </div>
            </div>
            {/* one col */}

            <div className={cx('grid-col-context')}>
              <div className={cx('col-context')}>
                <h2 className={cx('widget-title')}>Information</h2>
                <ul>
                  <li>
                    <Link to='/about'>Our Company</Link>
                  </li>
                  <li>
                    <Link to='/contact'>Contact Us</Link>
                  </li>
                  <li>
                    <Link to='/about'>Our Services</Link>
                  </li>
                  <li>
                    <Link to='/about'>Why We?</Link>
                  </li>
                  <li>
                    <Link to='/about'>Careers</Link>
                  </li>
                </ul>
              </div>

              <div className={cx('col-context')}>
                <h2 className={cx('widget-title')}>Quicklink</h2>
                <ul>
                  <li>
                    <Link to='/about'>About</Link>
                  </li>
                  <li>
                    <Link to='/blog'>Blog</Link>
                  </li>
                  <li>
                    <Link to='/product'>Shop</Link>
                  </li>
                  <li>
                    <Link to='/cart'>Cart</Link>
                  </li>
                  <li>
                    <Link to='/contact'>Contact</Link>
                  </li>
                </ul>
              </div>

              <div className={cx('col-context')}>
                <h2 className={cx('widget-title')}>Support</h2>
                <ul>
                  <li>
                    <Link to='/contact'>Online Support</Link>
                  </li>
                  <li>
                    <Link to='/contact'>Shipping Policy</Link>
                  </li>
                  <li>
                    <Link to='/contact'>Return Policy</Link>
                  </li>
                  <li>
                    <Link to='/contact'>Privacy Policy</Link>
                  </li>
                  <li>
                    <Link to='/contact'>Terms of Service</Link>
                  </li>
                </ul>
              </div>

              <div className={cx('col-context')}>
                <h2 className={cx('widget-title')}>See Information</h2>
                <address>
                  Address: Stamford Bridge, Fulham Road, Lodon, England.
                  <br />
                  Phone: +84 869 784 543
                  <br />
                  Email: ctuanphuong18@gmail.com
                </address>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className={cx('footer-copyright-area')}>
        <div className={cx('container')}>
          <div className={cx('row-copyright')}>
            <div className={cx('col-copyright')}>
              <div className={cx('copyright-content')}>
                <p>
                  Copyright © 2023 <a href='https://www.instagram.com/empty.ctp/'>P-Empty</a> | Built with{' '}
                  <Link to={'/'} className={cx('link-brand')}>
                    <strong>Obrien</strong>
                  </Link>
                  by <a href='https://www.instagram.com/empty.ctp/'>P-Empty</a>.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* END FOOTER AREA */}
      {show && (
        <div className={cx('back-to-top')}>
          <a href='#' className={cx('scroll-to-top', { show: show })}>
            <FontAwesomeIcon icon={faChevronUp} />
          </a>
        </div>
      )}
    </footer>
  )
}

export default Footer
