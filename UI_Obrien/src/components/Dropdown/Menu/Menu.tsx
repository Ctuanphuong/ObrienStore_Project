import Tippy from '@tippyjs/react/headless'
import styles from './Menu.module.scss'
import classNames from 'classnames/bind'
import MenuItem from './MenuItem'
import DropdownWrapper from '../Dropdown'
import Button from '~/components/Button'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faRightFromBracket } from '@fortawesome/free-solid-svg-icons'
import { useCombinedContext } from '~/providers/CombinedProvider'
const cx = classNames.bind(styles)

const Menu = ({ items, cartItems, offset = [0, 29], user = '', children }: any) => {
  const { authProvider } = useCombinedContext()
  const renderItem = () => {
    if (items) {
      return items.map((item: object, index: number) => {
        return <MenuItem key={index} data={item}></MenuItem>
      })
    } else if (cartItems) {
      return (
        <div className={cx('wrap-cart-items')}>
          {cartItems.map((cart: object, index: number) => {
            return <MenuItem key={index} cartData={cart}></MenuItem>
          })}
          <div className={cx('wrap-total')}>
            <h3>Total: </h3>
            <p>$110</p>
          </div>
          <div className={cx('wrap-btn-cart')}>
            <Button to={'/cart'} secondary>
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
