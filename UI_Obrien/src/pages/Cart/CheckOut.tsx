import { useEffect, useState } from 'react'
import BreadCrumbs from '~/components/BreadCrumbs'
import styles from './Cart.module.scss'
import classNames from 'classnames/bind'
import Button from '~/components/Button/Button'
import { useCombinedContext } from '~/providers/CombinedProvider'
import { ICart } from '~/interfaces/ICart'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faDollar } from '@fortawesome/free-solid-svg-icons'
import { useNavigate, useParams } from 'react-router-dom'
import { CheckOutSchema } from '~/schemas/cart'

const cx = classNames.bind(styles)

const CheckOut = () => {
  const { userId } = useParams()
  const navigate = useNavigate()
  const { cartProvider } = useCombinedContext()
  const [showCoupon, setShowCoupon] = useState(false)
  const [cart, setCart] = useState<ICart>()
  const [userBill, setUserBill] = useState<any>()
  const [errors, setErrors] = useState<any>({})
  // Call Api get giỏ hàng khi userId thay đổi
  useEffect(() => {
    cartProvider.getUserId(userId)
  }, [userId])

  // Get cart
  useEffect(() => {
    setCart(cartProvider.cart)
  }, [cartProvider.cart])

  // Get User
  useEffect(() => {
    const { userId } = cartProvider.cart
    const userBillDetail = {
      userId: userId?._id,
      name: userId?.name,
      phone: userId?.phone,
      email: userId?.email,
      shippingAddress: userId?.address
    }
    setUserBill(userBillDetail)
  }, [cartProvider.cart])

  const onHandleChange = (e: any) => {
    const { name, value } = e.target
    setUserBill({ ...userBill, [name]: value })
  }

  const handleSubmit = (e: any) => {
    e.preventDefault()

    const { error } = CheckOutSchema.validate(userBill, { abortEarly: false })
    if (error) {
      const validationErrors: Record<string, string[]> = {}
      error.details.forEach((err: any) => {
        const { key } = err.context
        if (!validationErrors[key]) {
          validationErrors[key] = []
        }
        validationErrors[key].push(err.message)
      })
      setErrors(validationErrors)
    } else {
      cartProvider.onCheckOut(userBill)
    }
  }

  // Show or hidden form coupon
  const handleShowCoupon = () => {
    setShowCoupon(!showCoupon)
  }

  return cartProvider.redirectCheckOut ? (
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
              <div className={cx('wrap-coupon', 'disabled')}>
                <form action=''>
                  <input type='text' placeholder='Coupon code' />
                  <input type='submit' value='Apply Coupon' className={cx('coupon-inner-btn')} />
                </form>
              </div>
            )}
          </div>
          {/* row 1 */}

          {/* row 2 */}
          <form className={cx('row-2-checkout')} onSubmit={handleSubmit}>
            <div className={cx('bill-detail-wrapper')}>
              <div>
                <h3>BILLING DETAILS</h3>
                <div className={cx('row-bill')}>
                  <div className={cx('wrap-input')}>
                    <div className={cx('checkout-for-list')}>
                      <label htmlFor='name'>Full Name*</label>
                      <input type='text' id='name' name='name' value={userBill?.name} onChange={onHandleChange} />
                      {errors.name &&
                        errors.name.map((error: string, index: number) => (
                          <p key={index} className={cx('error-validate')}>
                            {error}
                          </p>
                        ))}
                    </div>
                    <div className={cx('checkout-for-list')}>
                      <label htmlFor='phone'>Phone*</label>
                      <input type='text' id='phone' name='phone' value={userBill?.phone} onChange={onHandleChange} />
                      {errors.phone &&
                        errors.phone.map((error: string, index: number) => (
                          <p key={index} className={cx('error-validate')}>
                            {error}
                          </p>
                        ))}
                    </div>
                  </div>
                  <div className={cx('checkout-for-list', 'col-md-12')}>
                    <label htmlFor='email'>Email*</label>
                    <input type='text' id='email' name='email' value={userBill?.email} onChange={onHandleChange} />
                    {errors.email &&
                      errors.email.map((error: string, index: number) => (
                        <p key={index} className={cx('error-validate')}>
                          {error}
                        </p>
                      ))}
                  </div>
                  <div className={cx('checkout-for-list', 'col-md-12')}>
                    <label htmlFor='shippingAddress'>Address*</label>
                    <input
                      type='text'
                      id='shippingAddress'
                      name='shippingAddress'
                      value={userBill?.address}
                      onChange={onHandleChange}
                    />
                    {errors.shippingAddress &&
                      errors.shippingAddress.map((error: string, index: number) => (
                        <p key={index} className={cx('error-validate')}>
                          {error}
                        </p>
                      ))}
                  </div>
                  <div className={cx('checkout-for-list')}>
                    <label htmlFor='orderNotes'>Order Notes</label>
                    <textarea
                      id='orderNotes'
                      name='orderNotes'
                      onChange={onHandleChange}
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
                      {cart?.products?.map((product) => (
                        <tr key={product.productId._id}>
                          <td>
                            {product.productId.name}
                            <strong className={cx('product-quantity')}> × {product.quantity}</strong>
                          </td>
                          <td className={cx('text-center')}>
                            <span>
                              <FontAwesomeIcon icon={faDollar} className={cx('dollar-icon-regular')} />
                              {product.price}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                    <tfoot>
                      <tr>
                        <th>Cart Subtotal</th>
                        <td>
                          <span>
                            <FontAwesomeIcon icon={faDollar} className={cx('dollar-icon-regular')} />
                            {cart?.totalPrice}
                          </span>
                        </td>
                      </tr>
                      <tr>
                        <th>Shipping Fee</th>
                        <td>
                          <span>
                            <FontAwesomeIcon icon={faDollar} className={cx('dollar-icon-regular')} />
                            {cart?.shippingFee}
                          </span>
                        </td>
                      </tr>

                      <tr className={cx('order-total')}>
                        <th>Order Total</th>
                        <td className={cx('total-price')}>
                          <strong>
                            <span>
                              <FontAwesomeIcon icon={faDollar} className={cx('dollar-icon-larger')} />
                              {cart?.totalOrder}
                            </span>
                          </strong>
                        </td>
                      </tr>
                    </tfoot>
                  </table>
                </div>
                <div className={cx('checkout-payment-method')}>
                  <div className={cx('accordion')}>
                    <div className={cx('option-payment')}>
                      <input
                        type='radio'
                        id='bank'
                        name='paymentMethod'
                        value={'bank'}
                        onChange={onHandleChange}
                        disabled
                      />
                      <label htmlFor='bank' className={cx('disable-method')}>
                        Bank transfer (developing...)
                      </label>
                    </div>

                    <div className={cx('option-payment')}>
                      <input
                        type='radio'
                        id='momo'
                        name='paymentMethod'
                        value={'momo'}
                        onChange={onHandleChange}
                        disabled
                      />
                      <label htmlFor='momo' className={cx('disable-method')}>
                        Via Momo (developing...)
                      </label>
                    </div>
                    <div className={cx('option-payment')}>
                      <input
                        type='radio'
                        id='paypal'
                        name='paymentMethod'
                        value={'paypal'}
                        onChange={onHandleChange}
                        disabled
                      />
                      <label htmlFor='paypal' className={cx('disable-method')}>
                        Via Paypal (developing...)
                      </label>
                    </div>
                    <div className={cx('option-payment')}>
                      <input type='radio' id='cash' name='paymentMethod' value={'Cash'} onChange={onHandleChange} />
                      <label htmlFor='cash'>Cash On Delivery</label>
                    </div>
                  </div>
                  {errors.paymentMethod &&
                    errors.paymentMethod.map((error: string, index: number) => (
                      <p key={index} className={cx('error-validate')}>
                        {error}
                      </p>
                    ))}

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
  ) : (
    navigate('/')
  )
}

export default CheckOut
