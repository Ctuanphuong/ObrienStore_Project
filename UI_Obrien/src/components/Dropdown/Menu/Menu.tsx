import Tippy from '@tippyjs/react/headless'
import styles from './Menu.module.scss'
import classNames from 'classnames/bind'
import MenuItem from './MenuItem'
import DropdownWrapper from '../Dropdown'
import Button from '~/components/Button'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faRightFromBracket } from '@fortawesome/free-solid-svg-icons'
import { useCombinedContext } from '~/providers/CombinedProvider'
import { useEffect, useState } from 'react'
import { IProductCart } from '~/interfaces/ICart'
import getDecodedUser from '~/components/Auth/getDecodedUser'
const cx = classNames.bind(styles)

const Menu = ({ items, cartItems, offset = [0, 29], user = '', children }: any) => {
  const { authProvider } = useCombinedContext()
  const [productsCart, setProductsCart] = useState<IProductCart[]>([])
  const userCart = getDecodedUser()
  if (cartItems) {
    useEffect(() => {
      setProductsCart(cartItems.products)
    }, [cartItems, user])
  }

  const renderItem = () => {
    if (items) {
      return items.map((item: object, index: number) => {
        return <MenuItem key={index} data={item}></MenuItem>
      })
    } else if (cartItems) {
      return (
        <div className={cx('wrap-cart-items')}>
          {productsCart?.map((product: object, index: number) => {
            return <MenuItem key={index} cartData={product}></MenuItem>
          })}
          <div className={cx('wrap-total')}>
            <h3>Total: </h3>
            <p>
              <span style={{ marginRight: 2 }}>$</span>
              {cartItems?.totalOrder}
            </p>
          </div>
          <div className={cx('wrap-btn-cart')}>
            <Button to={`/cart/${userCart?._id}`} secondary>
              View Cart
            </Button>
            <Button to={'/checkout'} secondary>
              Checkout
            </Button>
          </div>
        </div>
      )
    } else if (user) {
      return (
        <>
          <div className={cx('hello')}>
            <span className={cx('greet')}>Welcome,</span> <span>{user.name}</span>
            <span className={cx('handwave')}>👋🏻</span>
          </div>
          <MenuItem user={user} />
          <div className={cx('logout-area')}>
            <div className={cx('wrap-btn-logout')}>
              <button
                onClick={() => {
                  authProvider.onLogout()
                }}
              >
                Logout <FontAwesomeIcon icon={faRightFromBracket} className={cx('logout-icon')} />
              </button>
            </div>
          </div>
        </>
      )
    }
  }

  const renderMenu = (attrs: any) => (
    <div className='box' tabIndex='-1' {...attrs}>
      <DropdownWrapper>{renderItem()}</DropdownWrapper>
    </div>
  )
  return (
    <Tippy interactive offset={offset} placement='bottom' render={renderMenu}>
      {children}
    </Tippy>
  )
}

export default Menu
