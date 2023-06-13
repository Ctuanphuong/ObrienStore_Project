import { Link, NavLink } from 'react-router-dom'
import styles from './Menu.module.scss'
import classNames from 'classnames/bind'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrashAlt } from '@fortawesome/free-solid-svg-icons'

const cx = classNames.bind(styles)
const MenuItem = ({ data, cartData, menuLoggedData }: any): any => {
  if (data) {
    return (
      <NavLink to={data?.to} className={({ isActive }) => cx('menu-item', { active: isActive })}>
        {data?.name}
      </NavLink>
    )
  } else if (cartData) {
    return (
      <div className={cx('cart-item')}>
        <div className={cx('cart-img')}>
          <Link to={'/product'}>
            <img src={cartData.image} alt="Obrien's product image" />
          </Link>
        </div>
        <div className={cx('cart-content')}>
          <h5>
            <Link to={'/product/:id'}>{cartData.name}</Link>
          </h5>
          <div className={cx('cart-text-btn')}>
            <div className={cx('cart-text')}>
              <span className={cx('count')}> 1× </span> <span className={cx('price')}>${cartData.price}</span>
            </div>
            <div className={cx('cart-btn')}>
              <FontAwesomeIcon icon={faTrashAlt} />
            </div>
          </div>
        </div>
      </div>
    )
  } else if (menuLoggedData) {
    return (
      <NavLink to={menuLoggedData?.to} className={({ isActive }) => cx('menu-item', { active: isActive })}>
        {menuLoggedData?.title}
      </NavLink>
    )
  }
}

export default MenuItem
