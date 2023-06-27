import { useState } from 'react'
import BreadCrumbs from '~/components/BreadCrumbs'
import styles from './Cart.module.scss'
import classNames from 'classnames/bind'
import Button from '~/components/Button/Button'
import { useCombinedContext } from '~/providers/CombinedProvider'

const cx = classNames.bind(styles)

const CheckOut = () => {
  const { cartProvider } = useCombinedContext()

  console.log(cartProvider.onCheckOut)

  const [showCoupon, setShowCoupon] = useState(false)

  const handleShowCoupon = () => {
    setShowCoupon(!showCoupon)
  }
  return (
    <>
      <BreadCrumbs title={'Checkout'} page={'Checkout'} />
      <div className={cx('checkout-area')}>
        <div className={cx('container')}>
          {/* row 1 */}
          <div className={cx('row-1-checkout')}>
            <div className={cx('coupon-accordion')}>
              <h3>
                Have a coupon? <span onClick={handleShowCoupon}>Click here to enter your code</span>
              </h3>
            </div>
            {showCoupon && (
              <div className={cx('wrap-coupon')}>
                <form action=''>
                  <input type='text' placeholder='Coupon code' />
                  <input type='submit' value='Apply Coupon' className={cx('coupon-inner-btn')} />
                </form>
              </div>
            )}
          </div>
          {/* row 1 */}

          {/* row 2 */}
          <form className={cx('row-2-checkout')}>
            <div className={cx('bill-detail-wrapper')}>
              <div>
                <h3>BILLING DETAILS</h3>
                <div className={cx('row-bill')}>
                  <div className={cx('checkout-for-list', 'col-md-12')}>
                    <label htmlFor='name'>Full Name*</label>
                    <input type='text' id='name' name='name' />
                  </div>
                  <div className={cx('checkout-for-list', 'col-md-12')}>
                    <label htmlFor='address'>Address*</label>
                    <input type='text' id='address' />
                  </div>
                  <div className={cx('wrap-input')}>
                    <div className={cx('checkout-for-list')}>
                      <label htmlFor='email'>Email*</label>
                      <input type='email' id='email' />
                    </div>
                    <div className={cx('checkout-for-list')}>
                      <label htmlFor='phone'>Phone*</label>
                      <input type='text' id='phone' />
                    </div>
                  </div>
                  <div className={cx('checkout-for-list')}>
                    <label htmlFor='order_notes'>Order Notes</label>
                    <textarea
                      id='order_notes'
                      cols={30}
                      rows={10}
                      placeholder='Notes about your order, e.g. special notes for delivery.'
                    ></textarea>
                  </div>
                </div>
              </div>
            </div>
            <div className={cx('bill-checkout')}>
              <div className={cx('your-order')}>
                <h3>Your Order</h3>
                <div className={cx('your-order-table')}>
                  <table className={cx('table-order')}>
                    <thead>
                      <tr>
                        <th>PRODUCT</th>
                        <th>TOTAL</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>
                          Fresh Pineapple <strong className={cx('product-quantity')}> × 1</strong>
                        </td>
                        <td className={cx('text-center')}>
                          <span>£165.00</span>
                        </td>
                      </tr>
                    </tbody>
                    <tfoot>
                      <tr>
                        <th>Cart Subtotal</th>
                        <td>
                          <span>£215.00</span>
                        </td>
                      </tr>
                      <tr>
                        <th>Shipping Fee</th>
                        <td>
                          <span>$10</span>
                        </td>
                      </tr>

                      <tr className={cx('order-total')}>
                        <th>Order Total</th>
                        <td className={cx('total-price')}>
                          <strong>
                            <span>£225.00</span>
                          </strong>
                        </td>
                      </tr>
                    </tfoot>
                  </table>
                </div>
                <div className={cx('checkout-payment-method')}>
                  <div className={cx('accordion')}>
                    <div className={cx('option-payment')}>
                      <input type='radio' id='bank_transfer' name='paymentMethod' value={'bank'} />
                      <label htmlFor='bank_transfer'>Direct Bank Transfer</label>
                    </div>

                    <div className={cx('option-payment')}>
                      <input type='radio' id='momo' name='paymentMethod' value={'momo'} />
                      <label htmlFor='momo'>Via Momo</label>
                    </div>
                    <div className={cx('option-payment')}>
                      <input type='radio' id='paypal' name='paymentMethod' value={'paypal'} />
                      <label htmlFor='paypal'>Via Paypal</label>
                    </div>
                    <div className={cx('option-payment')}>
                      <input type='radio' id='cod' name='paymentMethod' value={'cod'} />
                      <label htmlFor='cod'>COD (Cash On Delivery)</label>
                    </div>
                  </div>
                  <div className={cx('order-btn-payment')}>
                    <Button longerDark>Place Order</Button>
                  </div>
                </div>
              </div>
            </div>
          </form>
          {/* row 2 */}
        </div>
      </div>
    </>
  )
}

export default CheckOut
