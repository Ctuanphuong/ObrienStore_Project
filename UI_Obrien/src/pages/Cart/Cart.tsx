import BreadCrumbs from '~/components/BreadCrumbs'
import styles from './Cart.module.scss'
import classNames from 'classnames/bind'
import { Link, useParams } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faDollar, faMinus, faPlus, faTrashAlt } from '@fortawesome/free-solid-svg-icons'
import Button from '~/components/Button/Button'
import { useEffect, useState } from 'react'
import { useCombinedContext } from '~/providers/CombinedProvider'
import { ICart, IDeleteCart, IDeleteOneProductCart, IProductCart } from '~/interfaces/ICart'
import { Empty } from 'antd'
import { Popconfirm } from 'antd'
import { QuestionCircleOutlined } from '@ant-design/icons'

const cx = classNames.bind(styles)
const Cart = () => {
  const { userId } = useParams()
  const { cartProvider } = useCombinedContext()
  const [cart, setCart] = useState<ICart>()
  const [products, setProducts] = useState<IProductCart[]>([])

  // Gọi hàm getCart() rồi truyền userId vào để lấy về thông tin cart của user đang đăng nhập
  // Cho vào useEffect và điều kiện chạy làm hàm getCart là userId thay đổi để cho api ko bị call vô hạn
  useEffect(() => {
    cartProvider.getUserId(userId)
  }, [userId])

  // gọi cartProvider để lấy data cart
  useEffect(() => {
    setCart(cartProvider.cart)
  }, [cartProvider.cart])

  // Gọi cartProvider để lấy danh sách sản phẩm trong giỏ hàng của userId
  useEffect(() => {
    setProducts(cartProvider.products)
  }, [cartProvider.products])

  // Cập nhật số lượng sản phẩm trong giỏ hàng
  const onHandleDecrease = (quantity: number, productId: string) => {
    if (quantity > 1) {
      const newQuantity = quantity - 1
      const updatedProducts = products.map((product) => {
        if (product.productId._id === productId) {
          return { ...product, quantity: newQuantity }
        }
        return product
      })
      cartProvider.onUpdateCart({ userId, productId, quantity: newQuantity })
      setProducts(updatedProducts)
    }
  }

  const onHandleIncrease = (quantity: number, productId: string) => {
    const newQuantity = quantity + 1
    const updatedProducts = products.map((product) => {
      if (product.productId._id === productId) {
        return { ...product, quantity: newQuantity }
      }
      return product
    })
    cartProvider.onUpdateCart({ userId, productId, quantity: newQuantity })
    setProducts(updatedProducts)
  }

  // Xử lý thay đổi số lượng khi người dùng  nhập số lượng bằng tay
  const onHandleChangeQuantity = (productId: string, quantity: number) => {
    if (!isNaN(quantity)) {
      const updatedProducts = products.map((product) => {
        if (product.productId._id === productId) {
          return { ...product, quantity }
        }
        return product
      })
      setProducts(updatedProducts)
      cartProvider.onUpdateCart({ userId, productId, quantity })
    }
  }

  // Xóa 1 sản phẩm trong giỏ hàng
  const onHandleDelete = (data: IDeleteOneProductCart) => {
    cartProvider.onDeleteOneProductCart(data)
  }

  // Xóa giỏ hàng
  const onHandleDeleteCart = (data: IDeleteCart) => {
    cartProvider.onDeleteCart(data)
  }

  const showUserCart = () => {
    if (!userId || userId === 'undefined') {
      return (
        <div className={cx('not-logged-in')}>
          <h3>Please login to view your shopping cart information!</h3>
          <Link to={'/login'}>
            <Button regular>Login Now</Button>
          </Link>
        </div>
      )
    } else if (products.length === 0) {
      return (
        <Empty
          image='https://res.cloudinary.com/phuong-fpoly/image/upload/v1687833885/Obrien%20Store/messy/preview-removebg-preview_omf3kb.png'
          imageStyle={{ height: 200, marginTop: 75 }}
          description={<span style={{ fontSize: 17 }}>There are no product in your cart.</span>}
        >
          <Link to={'/product'}>
            <Button regular>Add Now</Button>
          </Link>
        </Empty>
      )
    } else {
      return (
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
                    {products.map((product) => (
                      <tr key={product._id}>
                        <td className={cx('pro-thumbnail')}>
                          <Link to={`/product/${product.productId._id}`}>
                            <img
                              src={product.productId.images[0].url}
                              alt="Obrien's product image"
                              className={cx('img-fluid')}
                            />
                          </Link>
                        </td>
                        <td className={cx('pro-product')}>
                          <Link to={`/product/${product.productId._id}`}>{product.productId.name}</Link>
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
                              <input
                                type='text'
                                value={product.quantity}
                                name='quantity'
                                onChange={(e) => onHandleChangeQuantity(product.productId._id, Number(e.target.value))}
                              />
                              <button
                                className={cx('btn-desc')}
                                onClick={() => onHandleDecrease(product.quantity, product.productId._id)}
                              >
                                <FontAwesomeIcon icon={faMinus} />
                              </button>
                              <button
                                className={cx('btn-plus')}
                                onClick={() => onHandleIncrease(product.quantity, product.productId._id)}
                              >
                                <FontAwesomeIcon icon={faPlus} />
                              </button>
                            </div>
                          </div>
                        </td>

                        <td className={cx('pro-total')}>
                          <span>
                            <FontAwesomeIcon icon={faDollar} className={cx('dollar-icon')} />
                            {product.price}
                          </span>
                        </td>

                        <td className={cx('pro-remove')}>
                          <Popconfirm
                            title='Delete this product from cart.'
                            description='Are you sure want to delete this product?'
                            icon={<QuestionCircleOutlined style={{ color: 'red' }} />}
                            okButtonProps={{
                              className: cx('ok-btn-delete')
                            }}
                            onConfirm={() => onHandleDelete({ userId, productId: product.productId._id })}
                          >
                            <button>
                              <FontAwesomeIcon icon={faTrashAlt} />
                            </button>
                          </Popconfirm>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              {/* cart table */}

              {/* cart update options */}
              <div className={cx('cart-update-options')}>
                <div className={cx('remove-all-product')}>
                  <Popconfirm
                    title='Delete all product in cart.'
                    description='Are you sure want to delete all product?'
                    icon={<QuestionCircleOutlined style={{ color: 'red' }} />}
                    okButtonProps={{
                      className: cx('ok-btn-delete')
                    }}
                    onConfirm={() => onHandleDeleteCart({ userId })}
                  >
                    <button>Delete All Product</button>
                  </Popconfirm>
                </div>
                <div className={cx('apply-coupon', 'disabled')}>
                  <form>
                    <input type='text' placeholder='Enter Your Coupon Code' />
                    <Button primary>Apply Coupon</Button>
                  </form>
                </div>
                {/* <div className={cx('update-cart')}>
                  <Button primary>Update Cart</Button>
                </div> */}
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
                        <td>
                          <FontAwesomeIcon icon={faDollar} className={cx('dollar-icon')} />
                          {cart?.totalPrice}
                        </td>
                      </tr>
                      <tr>
                        <td>Shipping</td>
                        <td>
                          <FontAwesomeIcon icon={faDollar} className={cx('dollar-icon')} />
                          {cart?.shippingFee}
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
                          {cart?.totalOrder}
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <Button to={`/checkout/${userId}`} longerPink onClick={() => cartProvider.setRedirectCheckOut(true)}>
                  Proceed To Checkout
                </Button>
              </div>
            </div>
            {/* row 2 */}
          </div>
        </div>
      )
    }
  }

  return (
    <>
      <BreadCrumbs title={'Shopping Cart'} page={'Cart'} />
      {showUserCart()}
    </>
  )
}

export default Cart
