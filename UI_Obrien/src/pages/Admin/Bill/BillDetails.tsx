import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import styles from './Bill.module.scss'
import classNames from 'classnames/bind'
const cx = classNames.bind(styles)
import { faDollar, faMoneyCheckDollar, faPrint } from '@fortawesome/free-solid-svg-icons'
import { Link, useParams } from 'react-router-dom'
import { useCombinedContext } from '~/providers/CombinedProvider'
import { useState, useEffect } from 'react'
import { IBills } from '~/interfaces/IBill'
import getDecodedUser from '~/components/Auth/getDecodedUser'
import { IProductCart } from '~/interfaces/ICart'
const BillDetails = () => {
  const { billProvider } = useCombinedContext()
  const { billId } = useParams()
  const user = getDecodedUser()

  const [bill, setBill] = useState<any>()
  const [productCart, setProductCart] = useState<any>([])
  const [userInfo, setUserInfo] = useState<any>('')

  // Gọi hàm getUserId để truyền vào User nhằm chạy lại useEffect call lại api lấy về danh sách bill
  useEffect(() => {
    if (user) {
      billProvider.getUserId(user._id)
    }
  }, [user])

  // Get bill
  useEffect(() => {
    setBill(billProvider.bills.find((bill: IBills) => bill._id === billId))
  }, [billProvider.bills])

  // Lấy mảng sản phẩm giỏ hàng
  useEffect(() => {
    setProductCart(bill?.products)
  }, [bill])

  //Lấy thông tin người đặt
  useEffect(() => {
    setUserInfo(bill?.userId)
  }, [bill])

  // Print html
  const handlePrint = () => {
    const btnPrint = document.querySelector('#print-button')
    btnPrint?.classList.remove(styles['print-button'])
    window.print()
  }
  return (
    <div className={cx('wrapper')}>
      <div className={cx('container')}>
        <div className={cx('bill-details')}>
          <div className={cx('flex-space')}>
            <div className={cx('title')}>
              <h1>User Bill Details</h1>
            </div>
          </div>
          <div className={cx('wrap-info-order')}>
            <div className={cx('info-customer')}>
              <p>
                <strong>Name:</strong> {userInfo?.name}
              </p>
              <p>
                <strong>Phone:</strong> {userInfo?.phone}
              </p>
              <p>
                <strong>Email:</strong> {userInfo?.email}
              </p>
              <p>
                <strong>Address:</strong> {bill?.shippingAddress}
              </p>
              <p>
                <strong>Order Notes:</strong> {bill?.orderNotes}
              </p>
            </div>
            <div className={cx('code-status')}>
              <p className={cx('bill-code')}>
                <strong> BILL:</strong> <span>#{billId}</span>
              </p>
              <div className={cx('wrap-status')}>
                <p className={cx('status-pay', 'payment')}>{bill?.paymentMethod}</p>
                {bill?.paymentStatus === 'Unpaid' ? (
                  <p className={cx('status-pay', 'unpaid')}>{bill?.paymentStatus}</p>
                ) : (
                  <p className={cx('status-pay', 'paid')}>{bill?.paymentStatus}</p>
                )}
                {bill?.status === 'Delivered' ? (
                  <p className={cx('status', 'delivered')}>{bill?.status}</p>
                ) : (
                  <p className={cx('status', 'shipping')}>{bill?.status}</p>
                )}
              </div>
              <div className={cx('order-no')}>
                <p>
                  <strong>Order Date:</strong>{' '}
                  {new Date(bill?.createdAt).toLocaleString('en-GB', {
                    day: '2-digit',
                    month: '2-digit',
                    year: 'numeric',
                    hour: '2-digit',
                    minute: '2-digit',
                    second: '2-digit'
                  })}
                </p>
              </div>
            </div>
          </div>
        </div>
        <hr />

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
              </tr>
            </thead>

            <tbody>
              {productCart?.map((product: IProductCart) => (
                <tr>
                  <td className={cx('pro-thumbnail')}>
                    <Link to={`/product/${product.productId._id}}`}>
                      <img
                        src={product.productId.images[0].url}
                        alt="Obrien's product image"
                        className={cx('img-fluid')}
                      />
                    </Link>
                  </td>
                  <td className={cx('pro-product')}>
                    <Link to={`/product/${product.productId._id}}`}>{product.productId.name}</Link>
                  </td>
                  <td className={cx('pro-price')}>
                    <span>
                      <FontAwesomeIcon icon={faDollar} className={cx('dollar-icon')} />
                      {product.productId.price}
                    </span>
                  </td>

                  <td className={cx('pro-quantity')}>
                    <div className={cx('quantity')}>
                      <div className={cx('cart-mini')}>
                        <input type='text' name='quantity' value={product.quantity} disabled />
                      </div>
                    </div>
                  </td>

                  <td className={cx('pro-total')}>
                    <span>
                      <FontAwesomeIcon icon={faDollar} className={cx('dollar-icon')} />
                      {product.price}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {/* cart table */}

        <div className={cx('table-calculator-wrapper')}>
          <table className={cx('table-calculator')}>
            <tbody>
              <tr>
                <td>Sub Total</td>
                <td>
                  <FontAwesomeIcon icon={faDollar} className={cx('dollar-icon')} />
                  {bill?.totalPrice}
                </td>
              </tr>
              <tr>
                <td>Shipping</td>
                <td>
                  <FontAwesomeIcon icon={faDollar} className={cx('dollar-icon')} />
                  {bill?.shippingFee}
                </td>
              </tr>
              <tr>
                <td>Discount</td>
                <td>
                  <FontAwesomeIcon icon={faDollar} className={cx('dollar-icon')} />0
                </td>
              </tr>
              <tr className={cx('total')}>
                <td>Total</td>
                <td className={cx('total-amount')}>
                  <FontAwesomeIcon icon={faDollar} className={cx('dollar-icon')} />
                  {bill?.totalOrder}
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <div className={cx('btn-redirect')}>
          <div className={cx('btn-back-home')}></div>
          <div className={cx('wrap-btn-print')}>
            <button onClick={handlePrint} className={cx('btn-print')} id='print-button'>
              <FontAwesomeIcon icon={faPrint} />
            </button>
            <Link to={'/admin/bills'} className={cx('btn-print')} id='print-button'>
              Back to Bill List
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default BillDetails
