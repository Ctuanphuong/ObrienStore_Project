import { Link, NavLink } from 'react-router-dom'
import styles from './Menu.module.scss'
import classNames from 'classnames/bind'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faDollar, faTrashAlt } from '@fortawesome/free-solid-svg-icons'
import { useCombinedContext } from '~/providers/CombinedProvider'
import getDecodedUser from '~/components/Auth/getDecodedUser'

const cx = classNames.bind(styles)
const MenuItem = ({ data, cartData, user }: any): any => {
  const { cartProvider } = useCombinedContext()
  const userLogged = getDecodedUser()
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
          <Link to={`/product/${cartData.productId._id}`}>
            <img src={cartData.productId.images[0].url} alt="Obrien's product image" />
          </Link>
        </div>
        <div className={cx('cart-content')}>
          <h5>
            <Link to={`/product/${cartData.productId._id}`}>{cartData.productId.name}</Link>
          </h5>
          <div className={cx('cart-text-btn')}>
            <div className={cx('cart-text')}>
              <span className={cx('count')}> {cartData.quantity}× </span>
              <span className={cx('price')}>
                <FontAwesomeIcon icon={faDollar} className={cx('dollar-icon')} />
                {cartData.price}
              </span>
            </div>
            <div
              className={cx('cart-btn')}
              onClick={() =>
                cartProvider.onDeleteOneProductCart({ userId: userLogged._id, productId: cartData.productId._id })
              }
            >
              <FontAwesomeIcon icon={faTrashAlt} />
            </div>
          </div>
        </div>
      </div>
    )
  } else {
    return (
      <>
        {user && user.role === 'admin' ? (
          <NavLink to={'/admin'} className={({ isActive }) => cx('menu-item', { active: isActive })}>
            Administrator Page
          </NavLink>
        ) : null}
        <NavLink to={'/my-account'} className={({ isActive }) => cx('menu-item', 'disabled', { active: isActive })}>
          My Account (processing..)
        </NavLink>
        <NavLink to={'/my-order'} className={({ isActive }) => cx('menu-item', 'disabled', { active: isActive })}>
          My Order (processing..)
        </NavLink>
      </>
    )
  }
}

export default MenuItem
