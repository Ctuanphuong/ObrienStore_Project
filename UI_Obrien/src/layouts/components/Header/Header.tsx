import { useEffect, useState } from 'react'
import { Link, NavLink } from 'react-router-dom'
import { menus } from '~/data/menu'
import Button from '~/components/Button'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faXmark } from '@fortawesome/free-solid-svg-icons'
import styles from './Header.module.scss'
import classNames from 'classnames/bind'
import MenuDropdown from '~/components/Dropdown/Menu'
import images from '~/assets/images'
import getDecodedUser from '~/components/Auth/getDecodedUser'

import { getCartUser } from '~/services/api/cart'

const cx = classNames.bind(styles)
const Header = () => {
  const user = getDecodedUser()
  const [headerTop, setHeaderTop] = useState('block')

  // Lấy thông tin cart
  const [cart, setCart] = useState<any>({})
  useEffect(() => {
    ;(async () => {
      try {
        if (user && user !== undefined) {
          const { data } = await getCartUser(user._id)
          setCart(data.cart)
        }
      } catch (error) {
        console.log(error)
      }
    })()
  }, [user])

  // custom notice sale
  useEffect(() => {
    if (window.location.pathname === '/') {
      setHeaderTop('block')
    } else if (window.location.pathname !== '/') {
      setHeaderTop('none')
    }
  }, [window.location.pathname])

  const handleDisplayHeaderTop = () => {
    setHeaderTop('none')
  }

  const defaultUserImage = 'https://cdn-icons-png.flaticon.com/512/1053/1053244.png'
  //show or hide header notice at home page
  const getNotice = () => {
    if (window.location.pathname === '/') {
      return (
        <div className={cx('header-top-area', { [headerTop]: headerTop })}>
          <div className={cx('container')}>
            <div className={cx('row')}>
              <p className={cx('sale-title')}>Get 35% off for new product </p>
              <Button regular to='/product' className={cx('btn-shop')}>
                Shop Now
              </Button>
              <FontAwesomeIcon
                icon={faXmark}
                className={cx('close-btn')}
                onClick={handleDisplayHeaderTop}
              ></FontAwesomeIcon>
            </div>
          </div>
        </div>
      )
    }
  }
  return (
    <>
      <header className={cx('wrapper')}>
        {getNotice()}
        <div className={cx('main-header')}>
          <div className={cx('container')}>
            <div className={cx('navbar')}>
              <div className={cx('logo')}>
                <Link to='/'>
                  <img src={images.logo.headerLogo} alt="Obrien's Logo" />
                </Link>
              </div>
              <div className={cx('center-menu')}>
                <nav>
                  <ul>
                    {menus.map((menu, index) => {
                      return menu.icon ? (
                        <MenuDropdown items={menu.subMenu} key={index}>
                          <li>
                            <NavLink to={menu.to} className={({ isActive }) => cx({ active: isActive })}>
                              {menu.title} <span className={cx('drop-icon')}>{menu.icon}</span>
                            </NavLink>
                          </li>
                        </MenuDropdown>
                      ) : (
                        <li key={index}>
                          <NavLink to={menu.to} className={({ isActive }) => cx({ active: isActive })}>
                            {menu.title} <span className={cx('drop-icon')}>{menu.icon}</span>
                          </NavLink>
                        </li>
                      )
                    })}
                  </ul>
                </nav>
              </div>
              <div className={cx('right-menu')}>
                <nav>
                  <ul>
                    {/* menu when user logged */}
                    {user ? (
                      <MenuDropdown offset={[-20, 28]} user={user}>
                        <li style={{ marginRight: '10px' }}>
                          <a>
                            <img src={user.avatar || defaultUserImage} alt="User's avatar" className={cx('avatar')} />
                          </a>
                        </li>
                      </MenuDropdown>
                    ) : (
                      <li>
                        <NavLink to={'/login'} className={({ isActive }) => cx({ active: isActive })}>
                          Login
                        </NavLink>
                        <span className={cx('block-center')}>|</span>
                        <NavLink to={'/register'} className={({ isActive }) => cx({ active: isActive })}>
                          Register
                        </NavLink>
                      </li>
                    )}

                    <MenuDropdown cartItems={cart} offset={[-160, 34]}>
                      <li>
                        <NavLink to={`/cart/${user?._id}`} className={({ isActive }) => cx({ active: isActive })}>
                          <i className={cx('bi bi-handbag', 'bag-shopping')}></i>
                          <span className={cx('notice')}>{cart?.products?.length}</span>
                        </NavLink>
                      </li>
                    </MenuDropdown>
                  </ul>
                </nav>
              </div>
            </div>
          </div>
        </div>
      </header>
    </>
  )
}

export default Header
