import { useEffect, useState } from 'react'
import { Link, NavLink } from 'react-router-dom'
import { menus } from '~/data/menu'
import Button from '~/components/Button'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faXmark } from '@fortawesome/free-solid-svg-icons'
import styles from './Header.module.scss'
import classNames from 'classnames/bind'
import MenuDropdown from '~/components/Dropdown/Menu'
import { products } from '~/data/products'
import { menuLogged } from '~/data/menuLogged'
import images from '~/assets/images'

const cx = classNames.bind(styles)
const Header = () => {
  const [headerTop, setHeaderTop] = useState('block')

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
                    <li>
                      <NavLink to={'/login'} className={({ isActive }) => cx({ active: isActive })}>
                        Login
                      </NavLink>
                      <span className={cx('block-center')}>|</span>
                      <NavLink to={'/register'} className={({ isActive }) => cx({ active: isActive })}>
                        Register
                      </NavLink>
                    </li>

                    {/* menu when user logged */}
                    {/* <MenuDropdown menuloggedItems={menuLogged} offset={[-20, 28]}>
                      <li style={{ marginRight: '10px' }}>
                        <a>
                          <img src={images.header.userAvatar} alt="User's avatar" className={cx('avatar')} />
                        </a>
                      </li>
                    </MenuDropdown> */}

                    <MenuDropdown cartItems={products} offset={[-160, 34]}>
                      <li>
                        <NavLink to='/cart' className={({ isActive }) => cx({ active: isActive })}>
                          <i className={cx('bi bi-handbag', 'bag-shopping')}></i>
                          <span className={cx('notice')}>2</span>
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
