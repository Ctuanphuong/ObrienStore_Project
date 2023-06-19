import BreadCrumbs from '~/components/BreadCrumbs'
import styles from './Cart.module.scss'
import axios from 'axios'

import classNames from 'classnames/bind'
import { Link } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMinus, faPlus, faTrashAlt } from '@fortawesome/free-solid-svg-icons'
import Button from '~/components/Button/Button'
import { useEffect, useState } from 'react'
const cx = classNames.bind(styles)
const Cart = () => {
  //updateCart
  const updateCart = async (userId: any, productId: any, quantity: any) => {
    try {
      const res = await axios.put('http://localhost:8000/api/cart/update', {
        userId: userId,
        productId: productId,
        quantity: quantity
      })
      console.log(res)
    } catch (error) {
      console.log(error)
    }
  }

  const [quantity, setQuantity] = useState(1)

  useEffect(() => {}, [])

  const onHandleDecrease = () => {
    if (quantity > 1) {
      const newQuantity = quantity - 1
      setQuantity(newQuantity)
      updateCart('648f4b97fb0d9cd53dde08ff', '648b317b52b8d62dcec27c82', newQuantity)
    }
  }

  const onHandleIncrease = () => {
    const newQuantity = quantity + 1
    setQuantity(newQuantity)
    updateCart('648f4b97fb0d9cd53dde08ff', '648b317b52b8d62dcec27c82', newQuantity)
  }

  return (
    <>
      <BreadCrumbs title={'Shopping Cart'} page={'Cart'} />
      <div className={cx('cart-wrapper')}>
        <div className={cx('container')}>
          {/* row 1 */}
          <div className={cx('row-1')}>
            {/* cart table */}
            <div className={cx('cart-table')}>
              <table className={cx('table-bordered')}>
                <thead>
                  <tr>
                    <th className={cx('pro-thumbnail')}>Image</th>
                    <th className={cx('pro-product')}>Product</th>
                    <th className={cx('pro-price')}>Price</th>
                    <th className={cx('pro-quantity')}>Quantity</th>
                    <th className={cx('pro-total')}>Total</th>
                    <th className={cx('pro-remove')}>Remove</th>
                  </tr>
                </thead>

                <tbody>
                  <tr>
                    <td className={cx('pro-thumbnail')}>
                      <Link to='/product'>
                        <img
                          src='https://res.cloudinary.com/phuong-fpoly/image/upload/v1685847065/Obrien%20Store/product/product-12_mgoaak.png'
                          alt="Obrien's product image"
                          className={cx('img-fluid')}
                        />
                      </Link>
                    </td>
                    <td className={cx('pro-product')}>
                      <Link to='/product'>Fresh Litchi</Link>
                    </td>
                    <td className={cx('pro-price')}>
                      <span>$80.00</span>
                    </td>

                    <td className={cx('pro-quantity')}>
                      <div className={cx('quantity')}>
                        <div className={cx('cart-mini')}>
                          <input type='text' value={quantity} onChange={(e) => setQuantity(parseInt(e.target.value))} />
                          <button className={cx('btn-desc')} onClick={onHandleDecrease}>
                            <FontAwesomeIcon icon={faMinus} />
                          </button>
                          <button className={cx('btn-plus')} onClick={onHandleIncrease}>
                            <FontAwesomeIcon icon={faPlus} />
                          </button>
                        </div>
                      </div>
                    </td>

                    <td className={cx('pro-total')}>
                      <span>$80.00</span>
                    </td>

                    <td className={cx('pro-remove')}>
                      <button>
                        <FontAwesomeIcon icon={faTrashAlt} />
                      </button>
                    </td>
                  </tr>
                  <tr>
                    <td className={cx('pro-thumbnail')}>
                      <Link to='/product'>
                        <img
                          src='https://res.cloudinary.com/phuong-fpoly/image/upload/v1685847063/Obrien%20Store/product/product-11_ibyufb.webp'
                          alt="Obrien's product image"
                          className={cx('img-fluid')}
                        />
                      </Link>
                    </td>
                    <td className={cx('pro-product')}>
                      <Link to='/product'>Fresh Pineapple</Link>
                    </td>
                    <td className={cx('pro-price')}>
                      <span>$80.00</span>
                    </td>

                    <td className={cx('pro-quantity')}>
                      <div className={cx('quantity')}>
                        <div className={cx('cart-mini')}>
                          <input type='text' defaultValue={1} />
                          <button className={cx('btn-desc')}>
                            <FontAwesomeIcon icon={faMinus} />
                          </button>
                          <button className={cx('btn-plus')}>
                            <FontAwesomeIcon icon={faPlus} />
                          </button>
                        </div>
                      </div>
                    </td>

                    <td className={cx('pro-total')}>
                      <span>$80.00</span>
                    </td>

                    <td className={cx('pro-remove')}>
                      <button>
                        <FontAwesomeIcon icon={faTrashAlt} />
                      </button>
                    </td>
                  </tr>
                  <tr>
                    <td className={cx('pro-thumbnail')}>
                      <Link to='/product'>
                        <img
                          src='https://res.cloudinary.com/phuong-fpoly/image/upload/v1685847064/Obrien%20Store/product/product-14_pbi7jo.png'
                          alt="Obrien's product image"
                          className={cx('img-fluid')}
                        />
                      </Link>
                    </td>
                    <td className={cx('pro-product')}>
                      <Link to='/product'>Fresh Plums</Link>
                    </td>
                    <td className={cx('pro-price')}>
                      <span>$80.00</span>
                    </td>

                    <td className={cx('pro-quantity')}>
                      <div className={cx('quantity')}>
                        <div className={cx('cart-mini')}>
                          <input type='text' defaultValue={1} />
                          <button className={cx('btn-desc')}>
                            <FontAwesomeIcon icon={faMinus} />
                          </button>
                          <button className={cx('btn-plus')}>
                            <FontAwesomeIcon icon={faPlus} />
                          </button>
                        </div>
                      </div>
                    </td>

                    <td className={cx('pro-total')}>
                      <span>$80.00</span>
                    </td>

                    <td className={cx('pro-remove')}>
                      <button>
                        <FontAwesomeIcon icon={faTrashAlt} />
                      </button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            {/* cart table */}

            {/* cart update options */}
            <div className={cx('cart-update-options')}>
              <div className={cx('apply-coupon')}>
                <form>
                  <input type='text' placeholder='Enter Your Coupon Code' />
                  <Button primary>Apply Coupon</Button>
                </form>
              </div>
              <div className={cx('update-cart')}>
                <Button primary>Update Cart</Button>
              </div>
            </div>
            {/* cart update options */}
          </div>
          {/* row 1 */}

          {/* row 2 */}
          <div className={cx('row-2')}>
            <div className={cx('calculator-cart-wrapper')}>
              <h3>Cart Totals</h3>
              <div className={cx('table-calculator-wrapper')}>
                <table className={cx('table-calculator')}>
                  <tbody>
                    <tr>
                      <td>Sub Total</td>
                      <td>$230</td>
                    </tr>
                    <tr>
                      <td>Shipping</td>
                      <td>$70</td>
                    </tr>
                    <tr className={cx('total')}>
                      <td>Total</td>
                      <td className={cx('total-amount')}>$300</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <Button to={'/checkout'} longerPink>
                Proceed To Checkout
              </Button>
            </div>
          </div>
          {/* row 2 */}
        </div>
      </div>
    </>
  )
}

export default Cart
