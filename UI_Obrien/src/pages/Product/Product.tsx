import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import styles from './Product.module.scss'
import classNames from 'classnames/bind'
import BreadCrumbs from '~/components/BreadCrumbs/BreadCrumbs'
import { faCartShopping, faDollar, faSearch, faStar } from '@fortawesome/free-solid-svg-icons'
import { faEye, faStar as faStarRegular, faThumbsUp } from '@fortawesome/free-regular-svg-icons'
import { categories } from '~/data/categories'
import { Link } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { IProduct } from '~/interfaces/IProduct'
import { useCombinedContext } from '~/providers/CombinedProvider'
import getDecodedUser from '~/components/Auth/getDecodedUser'

const cx = classNames.bind(styles)

const Product = () => {
  const { cartProvider } = useCombinedContext()

  // lấy thông tin user khi đã đăng nhập bằng cách gọi hàm getDecodedUser()
  const user = getDecodedUser()

  // phần chuyển đổi giao diện hiển thị sản phẩm theo dạng list hoặc grid
  const [grid, setGrid] = useState(true)
  const [list, setList] = useState(false)

  const handleDisplayGrid = () => {
    setGrid(true)
    setList(false)
  }

  const handleDisplayList = () => {
    setList(true)
    setGrid(false)
  }

  // end phần chuyển đổi giao diện
  const { productProvider } = useCombinedContext()
  const [products, setProducts] = useState<IProduct[]>([])
  useEffect(() => {
    setProducts(productProvider.products)
  }, [productProvider.products])

  const recentProducts = products.slice(0, 3)

  return (
    <>
      <BreadCrumbs title={"Obrien's Product"} page={'Product'} />
      <div className={cx('shop-main-area')}>
        <div className={cx('container')}>
          <div className={cx('row')}>
            {/* Col-actions*/}
            <div className={cx('col-actions')}>
              <aside className={cx('sidebar-widget')}>
                <div className={cx('widget-inner')}>
                  {/* one col */}
                  <div className={cx('widget-list')}>
                    <h3 className={cx('widget-title')}>Search</h3>
                    <div className={cx('search-box')}>
                      <div className={cx('input-wrap')}>
                        <input type='text' placeholder='Search Our Store' />
                        <button>
                          <FontAwesomeIcon icon={faSearch} />
                        </button>
                      </div>
                    </div>
                  </div>
                  {/* one col */}

                  {/* one col  */}
                  <div className={cx('widget-list')}>
                    <h3 className={cx('widget-title')}>Menu Categories</h3>
                    <nav>
                      <ul>
                        {categories.map((category, index) => {
                          return (
                            <li key={index}>
                              <button>{category.name}</button>
                            </li>
                          )
                        })}
                      </ul>
                    </nav>
                  </div>
                  {/* one col  */}

                  {/* one col  */}
                  <div className={cx('widget-list')}>
                    <h3 className={cx('widget-title')}>Menu Categories</h3>
                    <nav>
                      <ul>
                        <li>
                          <button>All Product</button>
                        </li>
                        <li>
                          <button>Best Seller (5)</button>
                        </li>
                        <li>
                          <button>Featured (4)</button>
                        </li>
                        <li>
                          <button>New Products (6)</button>
                        </li>
                      </ul>
                    </nav>
                  </div>
                  {/* one col  */}

                  {/* one col  */}
                  <div className={cx('widget-list')}>
                    <h3 className={cx('widget-title')}>Recent Products</h3>

                    {recentProducts.map((product) => (
                      <div className={cx('sidebar-product')} key={product._id}>
                        <Link to={`/product/${product._id}`} className={cx('img-recent_product')}>
                          <img src={product.images[0].url} alt="Obrien's product" />
                        </Link>
                        <div className={cx('content-recent-product')}>
                          <h4 className={cx('name-recent-product')}>
                            <Link to={`/product/${product._id}`}>{product.name}</Link>
                          </h4>
                          <p className={cx('price-recent-product')}>
                            <FontAwesomeIcon icon={faDollar} className={cx('dollar-icon')} />
                            {product.price}
                            <del>
                              <FontAwesomeIcon icon={faDollar} className={cx('dollar-icon')} />
                              {product.price}
                            </del>
                          </p>
                          <div className={cx('product-recent-rating')}>
                            <FontAwesomeIcon icon={faStar} />
                            <FontAwesomeIcon icon={faStar} />
                            <FontAwesomeIcon icon={faStar} />
                            <FontAwesomeIcon icon={faStarRegular} />
                            <FontAwesomeIcon icon={faStarRegular} />
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                  {/* one col  */}
                </div>
              </aside>
            </div>
            {/* Col-actions */}

            <div className={cx('product-area')}>
              {/* Toolbar Area */}
              <div className={cx('shop-toolbar-wrapper')}>
                <div className={cx('shop-toolbar-btn')}>
                  <button className={cx('btn-grid-3', { 'active-btn': grid })} onClick={handleDisplayGrid}>
                    <i className='bi bi-grid-3x3-gap-fill'></i>
                  </button>
                  <button className={cx('btn-list', { 'active-btn': list })} onClick={handleDisplayList}>
                    <i className='bi bi-list-task'></i>
                  </button>
                </div>

                <div className={cx('shop-select')}>
                  <form action='shop-select-form'>
                    <select name='sort_by' id='' className={cx('sort-product')} defaultValue={'1'}>
                      <option value='1' style={{ padding: '15px 0px' }}>
                        Alphabetically, A-Z
                      </option>
                      <option value='2'>Sort by popularity</option>
                      <option value='3'>Sort by newness</option>
                      <option value='4'>Sort by price: low to high</option>
                      <option value='5'>Sort by price: high to low</option>
                      <option value='6'>Product Name: Z</option>
                    </select>
                  </form>
                </div>
              </div>
              {/* Toolbar Area */}

              {/* Product wrapper */}
              <div className={cx('product-grid-wrapper', { 'grid-block': grid, 'grid-none': !grid })}>
                <div className={cx('product-wrapper')}>
                  {/* one product */}
                  {products.map((product) => (
                    <div className={cx('wrap-col-product')} key={product._id}>
                      <div className={cx('col-product')}>
                        <div className={cx('product-image')}>
                          <Link to={`/product/${product._id}`}>
                            <img src={product.images[0].url} alt="Obrien's product" />
                          </Link>
                        </div>
                        {/* <div className={cx('label-product')}>
                    <span>Soldout</span>
                  </div> */}
                        <div className={cx('product-context')}>
                          <div className={cx('product-rating')}>
                            <FontAwesomeIcon icon={faStar} />
                            <FontAwesomeIcon icon={faStar} />
                            <FontAwesomeIcon icon={faStar} />
                            <FontAwesomeIcon icon={faStarRegular} />
                            <FontAwesomeIcon icon={faStarRegular} />
                          </div>
                          <div className={cx('product-name')}>
                            <h3>
                              <Link to={`/product/${product._id}`}>{product.name}</Link>
                            </h3>

                            <button>
                              <FontAwesomeIcon icon={faThumbsUp} />
                            </button>
                          </div>
                          <div className={cx('product-price')}>
                            <span className={cx('regular-price')}>
                              <FontAwesomeIcon icon={faDollar} className={cx('dollar-icon')} />
                              {product.price}
                            </span>
                            <span className={cx('old-price')}>
                              <del>
                                <FontAwesomeIcon icon={faDollar} className={cx('dollar-icon')} />
                                {product.price}
                              </del>
                            </span>
                          </div>
                        </div>
                        <div className={cx('add-to-cart')}>
                          <button
                            className={cx('btn-add')}
                            onClick={() =>
                              cartProvider.onAddToCart({
                                userId: user?._id,
                                productId: product._id,
                                quantity: 1
                              })
                            }
                          >
                            Add to cart
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}

                  {/* end one product */}
                </div>
              </div>
              {/* Product wrapper */}

              {/* Product list wrapper */}
              <div className={cx('product-list-wrapper', { 'list-block': list, 'list-none': !list })}>
                {/* one col */}
                {products.map((product) => (
                  <div className={cx('row-product-list')} key={product._id}>
                    <div className={cx('product-list-img')}>
                      <Link to={`/product/${product._id}`} className={cx('wrap-img-list')}>
                        <img src={product.images[0].url} alt="Obrien's product" />
                      </Link>
                    </div>
                    <div className={cx('product-list-content')}>
                      <div className={cx('product-list-rating')}>
                        <FontAwesomeIcon icon={faStar} />
                        <FontAwesomeIcon icon={faStar} />
                        <FontAwesomeIcon icon={faStar} />
                        <FontAwesomeIcon icon={faStarRegular} />
                        <FontAwesomeIcon icon={faStarRegular} />
                      </div>
                      <div className={cx('product-list-title')}>
                        <h4>
                          <Link to={`/product/${product._id}`}>{product.name}</Link>
                        </h4>
                      </div>
                      <div className={cx('product-list-price-box')}>
                        <span className={cx('product-list-price')}>
                          <FontAwesomeIcon icon={faDollar} className={cx('dollar-icon')} />
                          {product.price}
                        </span>
                        <del className={cx('product-list-old-price')}>
                          <FontAwesomeIcon icon={faDollar} className={cx('dollar-icon-old-price')} />
                          {product.price}
                        </del>
                      </div>
                      <div className={cx('product-list-actions')}>
                        <button>
                          <FontAwesomeIcon icon={faCartShopping} />
                        </button>
                        <button>
                          <FontAwesomeIcon icon={faThumbsUp} />
                        </button>
                        <Link to={'/product'} className={cx('product-list-detail')}>
                          <FontAwesomeIcon icon={faEye} />
                        </Link>
                      </div>
                      <p className={cx('list-product-content')}>{product.description}</p>
                    </div>
                  </div>
                ))}
                {/* one col */}
              </div>
              {/* Product list wrapper */}

              {/* Bottom toolbar wrapper */}
              <div className={cx('bottom-toolbar')}>
                <div className={cx('col-bottom-toolbar')}>
                  <nav className={cx('pagination-wrap')}>
                    <ul>
                      <li>
                        <i className='bi bi-arrow-left'></i>
                      </li>
                      <li>
                        <a className={cx('active-pagination')}>1</a>
                      </li>
                      <li>
                        <a>2</a>
                      </li>
                      <li className={cx('disabled-btn')}>
                        <i className='bi bi-arrow-right'></i>
                      </li>
                    </ul>
                  </nav>
                  <p>Showing 1 - 9 of {products.length} products</p>
                </div>
              </div>
              {/* Bottom toolbar wrapper */}
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Product
