import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import styles from './Product.module.scss'
import classNames from 'classnames/bind'
import BreadCrumbs from '~/components/BreadCrumbs/BreadCrumbs'
import { faCartShopping, faSearch, faStar } from '@fortawesome/free-solid-svg-icons'
import { faEye, faStar as faStarRegular, faThumbsUp } from '@fortawesome/free-regular-svg-icons'
import { categories } from '~/data/categories'
import { Link } from 'react-router-dom'
import { useState } from 'react'

const cx = classNames.bind(styles)

const Product = () => {
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
                    <div className={cx('sidebar-product')}>
                      <Link to='/product' className={cx('img-recent_product')}>
                        <img src='./src/assets/images/product/product-1.jpg' alt="Obrien's product" />
                      </Link>
                      <div className={cx('content-recent-product')}>
                        <h4 className={cx('name-recent-product')}>
                          <Link to={'/product'}>Fresh Coconut</Link>
                        </h4>
                        <p className={cx('price-recent-product')}>
                          $80.00 <del>$90.00</del>
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
                    <div className={cx('sidebar-product')}>
                      <Link to='/product' className={cx('img-recent_product')}>
                        <img src='./src/assets/images/product/product-1.jpg' alt="Obrien's product" />
                      </Link>
                      <div className={cx('content-recent-product')}>
                        <h4 className={cx('name-recent-product')}>
                          {' '}
                          <Link to={'/product'}>Fresh Coconut</Link>
                        </h4>
                        <p className={cx('price-recent-product')}>
                          $80.00 <del>$90.00</del>
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
                    <div className={cx('sidebar-product')}>
                      <Link to='/product' className={cx('img-recent_product')}>
                        <img src='./src/assets/images/product/product-1.jpg' alt="Obrien's product" />
                      </Link>
                      <div className={cx('content-recent-product')}>
                        <h4 className={cx('name-recent-product')}>
                          {' '}
                          <Link to={'/product'}>Fresh Coconut</Link>
                        </h4>
                        <p className={cx('price-recent-product')}>
                          $80.00 <del>$90.00</del>
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

                  <div className={cx('wrap-col-product')}>
                    <div className={cx('col-product')}>
                      <div className={cx('product-image')}>
                        <Link to={'/product/:id'}>
                          <img
                            src='https://res.cloudinary.com/phuong-fpoly/image/upload/v1685847064/Obrien%20Store/product/product-14_pbi7jo.png '
                            alt="Obrien's product"
                          />
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
                            <Link to={'/product'}>Fresh Plums</Link>
                          </h3>

                          <button>
                            <FontAwesomeIcon icon={faThumbsUp} />
                          </button>
                        </div>
                        <div className={cx('product-price')}>
                          <span className={cx('regular-price')}>$80.00</span>
                          <span className={cx('old-price')}>
                            <del>$90.00</del>
                          </span>
                        </div>
                      </div>
                      <div className={cx('add-to-cart')}>
                        <button className={cx('btn-add')}>Add to cart</button>
                      </div>
                    </div>
                  </div>
                  {/* end one product */}

                  {/* one product */}
                  <div className={cx('wrap-col-product')}>
                    <div className={cx('col-product')}>
                      <div className={cx('product-image')}>
                        <Link to={'/product'}>
                          <img
                            src='https://res.cloudinary.com/phuong-fpoly/image/upload/v1685847065/Obrien%20Store/product/product-12_mgoaak.png'
                            alt="Obrien's product"
                          />
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
                            <Link to={'/product'}>Fresh Litchi</Link>
                          </h3>

                          <button>
                            <FontAwesomeIcon icon={faThumbsUp} />
                          </button>
                        </div>
                        <div className={cx('product-price')}>
                          <span className={cx('regular-price')}>$80.00</span>
                          <span className={cx('old-price')}>
                            <del>$90.00</del>
                          </span>
                        </div>
                      </div>
                      <div className={cx('add-to-cart')}>
                        <button className={cx('btn-add')}>Add to cart</button>
                      </div>
                    </div>
                  </div>
                  {/* end one product */}

                  {/* one product */}
                  <div className={cx('wrap-col-product')}>
                    <div className={cx('col-product')}>
                      <div className={cx('product-image')}>
                        <Link to={'/product'}>
                          <img
                            src='https://res.cloudinary.com/phuong-fpoly/image/upload/v1685847066/Obrien%20Store/product/product-13_oltc0p.png'
                            alt="Obrien's product"
                          />
                        </Link>
                      </div>
                      <div className={cx('label-product')}>
                        <span>Soldout</span>
                      </div>
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
                            <Link to={'/product'}>custard apple</Link>
                          </h3>

                          <button>
                            <FontAwesomeIcon icon={faThumbsUp} />
                          </button>
                        </div>
                        <div className={cx('product-price')}>
                          <span className={cx('regular-price')}>$80.00</span>
                          <span className={cx('old-price')}>
                            <del>$90.00</del>
                          </span>
                        </div>
                      </div>
                      <div className={cx('add-to-cart')}>
                        <button className={cx('btn-add')}>Add to cart</button>
                      </div>
                    </div>
                  </div>
                  {/* end one product */}

                  {/* one product */}
                  <div className={cx('wrap-col-product')}>
                    <div className={cx('col-product')}>
                      <div className={cx('product-image')}>
                        <Link to={'/product'}>
                          <img
                            src='https://res.cloudinary.com/phuong-fpoly/image/upload/v1685847063/Obrien%20Store/product/product-11_ibyufb.webp'
                            alt="Obrien's product"
                          />
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
                            <Link to={'/product'}>Fresh Pineapple</Link>
                          </h3>

                          <button>
                            <FontAwesomeIcon icon={faThumbsUp} />
                          </button>
                        </div>
                        <div className={cx('product-price')}>
                          <span className={cx('regular-price')}>$80.00</span>
                          <span className={cx('old-price')}>
                            <del>$90.00</del>
                          </span>
                        </div>
                      </div>
                      <div className={cx('add-to-cart')}>
                        <button className={cx('btn-add')}>Add to cart</button>
                      </div>
                    </div>
                  </div>
                  {/* end one product */}

                  {/* one product */}
                  <div className={cx('wrap-col-product')}>
                    <div className={cx('col-product')}>
                      <div className={cx('product-image')}>
                        <Link to={'/product'}>
                          <img
                            src='https://res.cloudinary.com/phuong-fpoly/image/upload/v1685847064/Obrien%20Store/product/product-10_zzc5w7.png'
                            alt="Obrien's product"
                          />
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
                            <Link to={'/product'}>Fresh Apple</Link>
                          </h3>

                          <button>
                            <FontAwesomeIcon icon={faThumbsUp} />
                          </button>
                        </div>
                        <div className={cx('product-price')}>
                          <span className={cx('regular-price')}>$80.00</span>
                          <span className={cx('old-price')}>
                            <del>$90.00</del>
                          </span>
                        </div>
                      </div>
                      <div className={cx('add-to-cart')}>
                        <button className={cx('btn-add')}>Add to cart</button>
                      </div>
                    </div>
                  </div>
                  {/* end one product */}

                  {/* one product */}
                  <div className={cx('wrap-col-product')}>
                    <div className={cx('col-product')}>
                      <div className={cx('product-image')}>
                        <Link to={'/product'}>
                          <img
                            src='https://res.cloudinary.com/phuong-fpoly/image/upload/v1685847063/Obrien%20Store/product/product-9_bq7mzo.webp'
                            alt="Obrien's product"
                          />
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
                            <Link to={'/product'}>vegetables cabbage</Link>
                          </h3>

                          <button>
                            <FontAwesomeIcon icon={faThumbsUp} />
                          </button>
                        </div>
                        <div className={cx('product-price')}>
                          <span className={cx('regular-price')}>$80.00</span>
                          <span className={cx('old-price')}>
                            <del>$90.00</del>
                          </span>
                        </div>
                      </div>
                      <div className={cx('add-to-cart')}>
                        <button className={cx('btn-add')}>Add to cart</button>
                      </div>
                    </div>
                  </div>
                  {/* end one product */}

                  {/* one product */}
                  <div className={cx('wrap-col-product')}>
                    <div className={cx('col-product')}>
                      <div className={cx('product-image')}>
                        <Link to={'/product'}>
                          <img
                            src='https://res.cloudinary.com/phuong-fpoly/image/upload/v1685847062/Obrien%20Store/product/product-8_iwnzro.webp'
                            alt="Obrien's product"
                          />
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
                            <Link to={'/product'}>Spicy chili pepper</Link>
                          </h3>

                          <button>
                            <FontAwesomeIcon icon={faThumbsUp} />
                          </button>
                        </div>
                        <div className={cx('product-price')}>
                          <span className={cx('regular-price')}>$80.00</span>
                          <span className={cx('old-price')}>
                            <del>$90.00</del>
                          </span>
                        </div>
                      </div>
                      <div className={cx('add-to-cart')}>
                        <button className={cx('btn-add')}>Add to cart</button>
                      </div>
                    </div>
                  </div>
                  {/* end one product */}

                  {/* one product */}
                  <div className={cx('wrap-col-product')}>
                    <div className={cx('col-product')}>
                      <div className={cx('product-image')}>
                        <Link to={'/product'}>
                          <img
                            src='https://res.cloudinary.com/phuong-fpoly/image/upload/v1685847063/Obrien%20Store/product/product-7_p4hopy.webp'
                            alt="Obrien's product"
                          />
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
                            <Link to={'/product'}>Fresh papaya</Link>
                          </h3>

                          <button>
                            <FontAwesomeIcon icon={faThumbsUp} />
                          </button>
                        </div>
                        <div className={cx('product-price')}>
                          <span className={cx('regular-price')}>$80.00</span>
                          <span className={cx('old-price')}>
                            <del>$90.00</del>
                          </span>
                        </div>
                      </div>
                      <div className={cx('add-to-cart')}>
                        <button className={cx('btn-add')}>Add to cart</button>
                      </div>
                    </div>
                  </div>
                  {/* end one product */}

                  {/* one product */}
                  <div className={cx('wrap-col-product')}>
                    <div className={cx('col-product')}>
                      <div className={cx('product-image')}>
                        <Link to={'/product'}>
                          <img
                            src='https://res.cloudinary.com/phuong-fpoly/image/upload/v1685847062/Obrien%20Store/product/product-6_n25qgp.webp'
                            alt="Obrien's product"
                          />
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
                            <Link to={'/product'}>Ginger</Link>
                          </h3>

                          <button>
                            <FontAwesomeIcon icon={faThumbsUp} />
                          </button>
                        </div>
                        <div className={cx('product-price')}>
                          <span className={cx('regular-price')}>$80.00</span>
                          <span className={cx('old-price')}>
                            <del>$90.00</del>
                          </span>
                        </div>
                      </div>
                      <div className={cx('add-to-cart')}>
                        <button className={cx('btn-add')}>Add to cart</button>
                      </div>
                    </div>
                  </div>
                  {/* end one product */}
                </div>
              </div>
              {/* Product wrapper */}

              {/* Product list wrapper */}
              <div className={cx('product-list-wrapper', { 'list-block': list, 'list-none': !list })}>
                {/* one col */}
                <div className={cx('row-product-list')}>
                  <div className={cx('product-list-img')}>
                    <Link to='/product' className={cx('wrap-img-list')}>
                      <img src='./src/assets/images/product/product-11.jpg' alt="Obrien's product" />
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
                        <Link to={'/product'}>Fresh Pineapple</Link>
                      </h4>
                    </div>
                    <div className={cx('product-list-price-box')}>
                      <span className={cx('product-list-price')}>$80.00</span>
                      <del className={cx('product-list-old-price')}>$90.00</del>
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
                    <p className={cx('list-product-content')}>
                      Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of
                      classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin
                      professor at Hampden-Sydney College in Virginia,
                    </p>
                  </div>
                </div>
                {/* one col */}

                {/* one col */}
                <div className={cx('row-product-list')}>
                  <div className={cx('product-list-img')}>
                    <Link to='/product' className={cx('wrap-img-list')}>
                      <img src='./src/assets/images/product/product-13.jpg' alt="Obrien's product" />
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
                        <Link to={'/product'}>custard apple</Link>
                      </h4>
                    </div>
                    <div className={cx('product-list-price-box')}>
                      <span className={cx('product-list-price')}>$80.00</span>
                      <del className={cx('product-list-old-price')}>$90.00</del>
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
                    <p className={cx('list-product-content')}>
                      Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of
                      classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin
                      professor at Hampden-Sydney College in Virginia,
                    </p>
                  </div>
                </div>
                {/* one col */}

                {/* one col */}
                <div className={cx('row-product-list')}>
                  <div className={cx('product-list-img')}>
                    <Link to='/product' className={cx('wrap-img-list')}>
                      <img src='./src/assets/images/product/product-14.png' alt="Obrien's product" />
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
                        <Link to={'/product'}>Fresh plums</Link>
                      </h4>
                    </div>
                    <div className={cx('product-list-price-box')}>
                      <span className={cx('product-list-price')}>$80.00</span>
                      <del className={cx('product-list-old-price')}>$90.00</del>
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
                    <p className={cx('list-product-content')}>
                      Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of
                      classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin
                      professor at Hampden-Sydney College in Virginia,
                    </p>
                  </div>
                </div>
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
                  <p>Showing 1 - 9 of 34 products</p>
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
