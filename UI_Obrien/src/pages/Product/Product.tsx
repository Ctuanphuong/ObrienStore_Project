import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import styles from './Product.module.scss'
import classNames from 'classnames/bind'
import BreadCrumbs from '~/components/BreadCrumbs/BreadCrumbs'
import { faCartShopping, faDollar, faSearch, faStar } from '@fortawesome/free-solid-svg-icons'
import { faEye, faStar as faStarRegular, faThumbsUp } from '@fortawesome/free-regular-svg-icons'
import { Link } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { IProduct } from '~/interfaces/IProduct'
import { useCombinedContext } from '~/providers/CombinedProvider'
import getDecodedUser from '~/components/Auth/getDecodedUser'
import { ICategory } from '~/interfaces/ICategory'

const cx = classNames.bind(styles)

const Product = () => {
  const { cartProvider, productProvider, categoryProvider } = useCombinedContext()

  // lấy thông tin user khi đã đăng nhập bằng cách gọi hàm getDecodedUser()
  const user = getDecodedUser()

  const [products, setProducts] = useState<IProduct[]>([])
  const [categories, setCategories] = useState<ICategory[]>([])
  const [selectedCategoryId, setSelectedCategoryId] = useState<string | null>(null)
  const [showAllProduct, setShowAllProduct] = useState(true)
  const [keywords, setKeywords] = useState('')

  // Get All Product
  useEffect(() => {
    // Nếu showAllProduct = false hoặc selectedCategoryId không tồn tại (chưa có danh mục nào được chọn), hiển thị toàn bộ sản phẩm
    if (showAllProduct || !selectedCategoryId) {
      setProducts(productProvider.products)
    } else {
      // Nếu đã chọn danh mục, hiển thị các sản phẩm có categoryId trùng với selectedCategoryId
      const productOfCate = productProvider.products.filter(
        (product: IProduct) => product.categoryId === selectedCategoryId
      )
      setProducts(productOfCate)
    }
  }, [showAllProduct, selectedCategoryId, productProvider.products])

  // Get All Category
  useEffect(() => {
    setCategories(categoryProvider.categories)
  }, [categoryProvider.categories])

  const onHandleClick = (id: string) => {
    setSelectedCategoryId(id)
    setShowAllProduct(false)
  }

  const recentProducts = productProvider.products.slice(0, 3)

  // Handle AddToCart
  const onHandleAdd = (productId: any) =>
    cartProvider.onAddToCart({
      userId: user?._id,
      productId: productId,
      quantity: 1
    })

  // Handle Change Keywords
  const onHandleChangeKeywords = (e: any) => {
    if (e.target.value === '') {
      productProvider.setKeywords('')
      console.log(e.target.value)
    } else {
      setKeywords(e.target.value)
    }
  }

  // Handle Change Sort Info
  const onHandleChangeSort = (e: any) => {
    productProvider.setSortInfo(e.target.value)
  }

  // Handle Change Keywords
  const onHandleSubmit = (e: any) => {
    e.preventDefault()
    productProvider.setKeywords(keywords)
  }

  // render ra số lượng page
  const renderPageNumbers = () => {
    const pageNumbers = []
    for (let i = 1; i <= productProvider.totalPages; i++) {
      pageNumbers.push(
        <li key={i}>
          <button
            onClick={() => productProvider.onChangePage(i)}
            className={cx('number-btn', { 'active-pagination': i === productProvider.currentPage })}
          >
            {i}
          </button>
        </li>
      )
    }
    return pageNumbers
  }

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
                      <form onSubmit={onHandleSubmit} className={cx('input-wrap')}>
                        <input
                          type='text'
                          placeholder='Search Our Store'
                          name='keywords'
                          onChange={onHandleChangeKeywords}
                        />
                        <button>
                          <FontAwesomeIcon icon={faSearch} />
                        </button>
                      </form>
                    </div>
                  </div>
                  {/* one col */}

                  {/* one col  */}
                  <div className={cx('widget-list')}>
                    <h3 className={cx('widget-title')}>Categories</h3>
                    <nav>
                      <ul>
                        <li>
                          <button onClick={() => setShowAllProduct(true)}>All Category</button>
                        </li>
                        {categories.map((category: ICategory) => (
                          <li key={category._id}>
                            <button onClick={() => onHandleClick(category._id)}>{category.name}</button>
                          </li>
                        ))}
                      </ul>
                    </nav>
                  </div>
                  {/* one col  */}

                  {/* one col  */}
                  {/* <div className={cx('widget-list')}>
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
                  </div> */}
                  {/* one col  */}

                  {/* one col  */}
                  <div className={cx('widget-list')}>
                    <h3 className={cx('widget-title')}>Recent Products</h3>

                    {recentProducts.map((product: IProduct) => (
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
                    <select
                      name='sortInfo'
                      className={cx('sort-product')}
                      onChange={onHandleChangeSort}
                      defaultValue={'createdAt-desc'}
                    >
                      <option value='name-asc' style={{ padding: '15px 0px' }}>
                        Alphabetically, A-Z
                      </option>
                      <option value='price-asc'>Sort by price: low to high</option>
                      <option value='price-desc'>Sort by price: high to low</option>
                      <option value='createdAt-desc'>Sort by date create: new to old</option>
                      <option value='createdAt-asc'>Sort by date create: old to new</option>
                      <option value='name-desc'>Alphabetically, Z-A</option>
                    </select>
                  </form>
                </div>
              </div>
              {/* Toolbar Area */}

              {/* Product wrapper */}
              <div className={cx('product-grid-wrapper', { 'grid-block': grid, 'grid-none': !grid })}>
                {products.length > 0 ? (
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
                            <button className={cx('btn-add')} onClick={() => onHandleAdd(product._id)}>
                              Add to cart
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}

                    {/* end one product */}
                  </div>
                ) : (
                  <div className={cx('wrap-not-found-product')}>
                    <img
                      src='https://res.cloudinary.com/phuong-fpoly/image/upload/v1688184014/Obrien%20Store/messy/4968593-em-breve-novo-produto-lancamento-conceito-ilustracao-plano-design-eps10-simples-moderno-grafico-elemento-para-icone-pagina-de-destino-vazio-estado-ui-infografico-etc-vetor-removebg-preview_bvsbyy.png'
                      alt='not found product'
                    />
                    <h3>Sorry, no products exist.</h3>
                  </div>
                )}
              </div>

              {/* Product wrapper */}

              {/* Product list wrapper */}
              <div className={cx('product-list-wrapper', { 'list-block': list, 'list-none': !list })}>
                {/* one col */}
                {products.length > 0 ? (
                  products.map((product) => (
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
                          <button onClick={() => onHandleAdd(product._id)}>
                            <FontAwesomeIcon icon={faCartShopping} />
                          </button>
                          <button>
                            <FontAwesomeIcon icon={faThumbsUp} />
                          </button>
                          <Link to={'#'} className={cx('product-list-detail')}>
                            <FontAwesomeIcon icon={faEye} />
                          </Link>
                        </div>
                        <p className={cx('list-product-content')}>{product.description}</p>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className={cx('wrap-not-found-product')}>
                    <img
                      src='https://res.cloudinary.com/phuong-fpoly/image/upload/v1688184014/Obrien%20Store/messy/4968593-em-breve-novo-produto-lancamento-conceito-ilustracao-plano-design-eps10-simples-moderno-grafico-elemento-para-icone-pagina-de-destino-vazio-estado-ui-infografico-etc-vetor-removebg-preview_bvsbyy.png'
                      alt='not found product'
                    />
                    <h3>Sorry, no products exist.</h3>
                  </div>
                )}

                {/* one col */}
              </div>
              {/* Product list wrapper */}

              {/* Bottom toolbar wrapper */}
              <div className={cx('bottom-toolbar')}>
                <div className={cx('col-bottom-toolbar')}>
                  <nav className={cx('pagination-wrap')}>
                    <ul>
                      <li>
                        <button
                          className={cx({ 'disabled-btn': productProvider.currentPage === 1 })}
                          disabled={productProvider.currentPage === 1}
                          onClick={() => productProvider.onChangePage(productProvider.currentPage - 1)}
                        >
                          <i className='bi bi-arrow-left'></i>
                        </button>
                      </li>
                      {renderPageNumbers()}
                      <li>
                        <button
                          className={cx({ 'disabled-btn': productProvider.currentPage === productProvider.totalPages })}
                          disabled={productProvider.currentPage === productProvider.totalPages}
                          onClick={() => productProvider.onChangePage(productProvider.currentPage + 1)}
                        >
                          <i className='bi bi-arrow-right'></i>
                        </button>
                      </li>
                    </ul>
                  </nav>
                  <p>There are {products.length} products on this page</p>
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
