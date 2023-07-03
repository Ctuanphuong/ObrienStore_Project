import { useEffect, useState } from 'react'
import BreadCrumbs from '~/components/BreadCrumbs'
import styles from './ProductDetail.module.scss'
import classNames from 'classnames/bind'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faDollar, faMinus, faPlus, faStar } from '@fortawesome/free-solid-svg-icons'
import { faThumbsUp, faStar as faStarRegular } from '@fortawesome/free-regular-svg-icons'

import Button from '~/components/Button'
import { Link, useParams } from 'react-router-dom'
import { useCombinedContext } from '~/providers/CombinedProvider'
import { IProduct } from '~/interfaces/IProduct'
import { getProduct } from '~/services/api/product'
import getDecodedUser from '~/components/Auth/getDecodedUser'

const cx = classNames.bind(styles)

const ProductDetail = () => {
  const { id } = useParams()
  const user = getDecodedUser()
  const { productProvider, cartProvider } = useCombinedContext()
  const [product, setProduct] = useState<IProduct>()
  const [quantity, setQuantity] = useState(1)
  const [activeTab, setActiveTab] = useState(1)
  // Get One Product
  useEffect(() => {
    ;(async () => {
      try {
        const { data } = await getProduct(id!)
        setProduct(data.product)
      } catch (error) {
        console.log(error)
      }
    })()
  }, [id])

  const sameCategory = productProvider.products.filter((p: IProduct) =>
    p._id !== id && p.categoryId === product?.categoryId?._id ? product : null
  )

  const onHandleChange = (e: any) => {
    setQuantity(Number(e.target.value))
  }

  // Handle Increase quantity
  const onHandleIncrease = () => {
    setQuantity(quantity + 1)
  }

  // Handle Decrease quantity
  const onHandleDecrease = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1)
    }
  }

  // Handle AddToCart
  const onHandleAdd = () => {
    cartProvider.onAddToCart({
      userId: user?._id,
      productId: product?._id,
      quantity: quantity
    })
  }
  // Change Tab
  const handleChangeTab = (index: number): any => {
    setActiveTab(index)
  }
  return (
    <>
      <BreadCrumbs title={"Product's Detail"} page={"Product's Detail"} />
      <div className={cx('wrapper')}>
        <div className={cx('container')}>
          {/* row 1 */}
          <div className={cx('row-1')}>
            {/* col image */}
            <div className={cx('col-img')}>
              <div className={cx('big-img')}>
                <Link to={`/product/${product?._id}`}>
                  <img src={product?.images[0].url} alt="Obrien's details image" />
                </Link>
              </div>
              <div className={cx('multiple-img')}>
                {product?.images.map((image) => (
                  <div className={cx('small-img')} key={product._id}>
                    <img src={image.url} alt="Obrien's small image" />
                  </div>
                ))}
              </div>
            </div>
            {/* col image */}

            {/* col detail */}
            <div className={cx('col-details')}>
              <h2 className={cx('product-name-detail')}>{product?.name}</h2>
              <div className={cx('price-box')}>
                <span className={cx('regular-price-detail')}>
                  <FontAwesomeIcon icon={faDollar} className={cx('dollar-icon-large')} />
                  {product?.price}
                </span>
                <del className={cx('old-price-detail')}>
                  <FontAwesomeIcon icon={faDollar} className={cx('dollar-icon-old-price-large')} />
                  {product?.price}
                </del>
              </div>
              <div className={cx('product-rating-detail')}>
                <FontAwesomeIcon icon={faStar} />
                <FontAwesomeIcon icon={faStar} />
                <FontAwesomeIcon icon={faStar} />
                <FontAwesomeIcon icon={faStarRegular} />
                <FontAwesomeIcon icon={faStarRegular} />
              </div>
              <p className={cx('sku')}>
                SKU: <strong>#{product?._id}</strong>
              </p>
              <p className={cx('desc-content')}>{product?.description}</p>
              {/* col detail */}

              {/* actions area */}
              <div className={cx('actions-area')}>
                <div className={cx('wrap-actions-add')}>
                  <div className={cx('quantity')}>
                    <input type='text' value={quantity} className={cx('cart-mini')} onChange={onHandleChange} />
                    <button className={cx('btn-desc')}>
                      <FontAwesomeIcon icon={faMinus} onClick={onHandleDecrease} />
                    </button>
                    <button className={cx('btn-plus')}>
                      <FontAwesomeIcon icon={faPlus} onClick={onHandleIncrease} />
                    </button>
                  </div>
                  <div className={cx('add-btn-wrapper')}>
                    <Button primary className={cx('btn-add')} onClick={onHandleAdd}>
                      Add to cart
                    </Button>
                    <Button white className={cx('disabled')}>
                      Add to wishlist
                    </Button>
                  </div>
                </div>
                <div className={cx('buy-btn')} onClick={onHandleAdd}>
                  <Button large>Buy it now</Button>
                </div>
                {/* actions area */}

                {/* share product */}
                <div className={cx('share-product', 'disabled')}>
                  <span>Share: </span>
                  <a href='#'>
                    <svg
                      xmlns='http://www.w3.org/2000/svg'
                      height='1em'
                      viewBox='0 0 448 512'
                      className={cx('facebook')}
                    >
                      <path d='M400 32H48A48 48 0 0 0 0 80v352a48 48 0 0 0 48 48h137.25V327.69h-63V256h63v-54.64c0-62.15 37-96.48 93.67-96.48 27.14 0 55.52 4.84 55.52 4.84v61h-31.27c-30.81 0-40.42 19.12-40.42 38.73V256h68.78l-11 71.69h-57.78V480H400a48 48 0 0 0 48-48V80a48 48 0 0 0-48-48z' />
                    </svg>
                  </a>
                  <a href='#'>
                    <svg
                      xmlns='http://www.w3.org/2000/svg'
                      height='1em'
                      viewBox='0 0 448 512'
                      className={cx('instagram')}
                    >
                      <path d='M224,202.66A53.34,53.34,0,1,0,277.36,256,53.38,53.38,0,0,0,224,202.66Zm124.71-41a54,54,0,0,0-30.41-30.41c-21-8.29-71-6.43-94.3-6.43s-73.25-1.93-94.31,6.43a54,54,0,0,0-30.41,30.41c-8.28,21-6.43,71.05-6.43,94.33S91,329.26,99.32,350.33a54,54,0,0,0,30.41,30.41c21,8.29,71,6.43,94.31,6.43s73.24,1.93,94.3-6.43a54,54,0,0,0,30.41-30.41c8.35-21,6.43-71.05,6.43-94.33S357.1,182.74,348.75,161.67ZM224,338a82,82,0,1,1,82-82A81.9,81.9,0,0,1,224,338Zm85.38-148.3a19.14,19.14,0,1,1,19.13-19.14A19.1,19.1,0,0,1,309.42,189.74ZM400,32H48A48,48,0,0,0,0,80V432a48,48,0,0,0,48,48H400a48,48,0,0,0,48-48V80A48,48,0,0,0,400,32ZM382.88,322c-1.29,25.63-7.14,48.34-25.85,67s-41.4,24.63-67,25.85c-26.41,1.49-105.59,1.49-132,0-25.63-1.29-48.26-7.15-67-25.85s-24.63-41.42-25.85-67c-1.49-26.42-1.49-105.61,0-132,1.29-25.63,7.07-48.34,25.85-67s41.47-24.56,67-25.78c26.41-1.49,105.59-1.49,132,0,25.63,1.29,48.33,7.15,67,25.85s24.63,41.42,25.85,67.05C384.37,216.44,384.37,295.56,382.88,322Z' />
                    </svg>
                  </a>
                  <a href='#'>
                    <svg
                      xmlns='http://www.w3.org/2000/svg'
                      height='1em'
                      viewBox='0 0 448 512'
                      className={cx('twitter')}
                    >
                      <path d='M400 32H48C21.5 32 0 53.5 0 80v352c0 26.5 21.5 48 48 48h352c26.5 0 48-21.5 48-48V80c0-26.5-21.5-48-48-48zm-48.9 158.8c.2 2.8.2 5.7.2 8.5 0 86.7-66 186.6-186.6 186.6-37.2 0-71.7-10.8-100.7-29.4 5.3.6 10.4.8 15.8.8 30.7 0 58.9-10.4 81.4-28-28.8-.6-53-19.5-61.3-45.5 10.1 1.5 19.2 1.5 29.6-1.2-30-6.1-52.5-32.5-52.5-64.4v-.8c8.7 4.9 18.9 7.9 29.6 8.3a65.447 65.447 0 0 1-29.2-54.6c0-12.2 3.2-23.4 8.9-33.1 32.3 39.8 80.8 65.8 135.2 68.6-9.3-44.5 24-80.6 64-80.6 18.9 0 35.9 7.9 47.9 20.7 14.8-2.8 29-8.3 41.6-15.8-4.9 15.2-15.2 28-28.8 36.1 13.2-1.4 26-5.1 37.8-10.2-8.9 13.1-20.1 24.7-32.9 34z' />
                    </svg>
                  </a>
                  <a href='#'>
                    <svg
                      xmlns='http://www.w3.org/2000/svg'
                      height='1em'
                      viewBox='0 0 448 512'
                      className={cx('linkedin')}
                    >
                      <path d='M416 32H31.9C14.3 32 0 46.5 0 64.3v383.4C0 465.5 14.3 480 31.9 480H416c17.6 0 32-14.5 32-32.3V64.3c0-17.8-14.4-32.3-32-32.3zM135.4 416H69V202.2h66.5V416zm-33.2-243c-21.3 0-38.5-17.3-38.5-38.5S80.9 96 102.2 96c21.2 0 38.5 17.3 38.5 38.5 0 21.3-17.2 38.5-38.5 38.5zm282.1 243h-66.4V312c0-24.8-.5-56.7-34.5-56.7-34.6 0-39.9 27-39.9 54.9V416h-66.4V202.2h63.7v29.2h.9c8.9-16.8 30.6-34.5 62.9-34.5 67.2 0 79.7 44.3 79.7 101.9V416z' />
                    </svg>
                  </a>
                </div>
                {/* share product */}

                {/* payment */}
                <div className={cx('payment')}>
                  <div className={cx('payment-img')}>
                    <img
                      src='https://res.cloudinary.com/phuong-fpoly/image/upload/v1685896694/Obrien%20Store/messy/cod_qjujz9.png'
                      alt="Obrien's payment image"
                    />
                  </div>

                  <div className={cx('payment-img')}>
                    <img
                      src='https://upload.wikimedia.org/wikipedia/commons/thumb/5/5e/Visa_Inc._logo.svg/2560px-Visa_Inc._logo.svg.png'
                      alt="Obrien's payment image"
                    />
                  </div>

                  <div className={cx('payment-img')}>
                    <img
                      src='https://upload.wikimedia.org/wikipedia/commons/thumb/b/b7/MasterCard_Logo.svg/2560px-MasterCard_Logo.svg.png'
                      alt="Obrien's payment image"
                    />
                  </div>

                  <div className={cx('payment-img')}>
                    <img
                      src='https://res.cloudinary.com/phuong-fpoly/image/upload/v1685896362/Obrien%20Store/messy/momo_iowclo.png'
                      alt="Obrien's payment image"
                    />
                  </div>
                  <div className={cx('payment-img')}>
                    <img
                      src='https://res.cloudinary.com/phuong-fpoly/image/upload/v1685896362/Obrien%20Store/messy/vnpay_rm3rwh.png'
                      alt="Obrien's payment image"
                    />
                  </div>
                  <div className={cx('payment-img')}>
                    <img
                      src='https://res.cloudinary.com/phuong-fpoly/image/upload/v1685896362/Obrien%20Store/messy/paypal_zj6rao.png'
                      alt="Obrien's payment image"
                    />
                  </div>
                </div>
                {/* payment */}
              </div>
              {/* actions area */}
            </div>
          </div>
          {/* row 1 */}

          {/* row 2 */}
          <div className={cx('row-2')}>
            <div className={cx('tab-wrapper')}>
              <button className={cx({ activeTab: activeTab === 1 })} onClick={() => handleChangeTab(1)}>
                Description
              </button>

              <button className={cx({ activeTab: activeTab === 2 })} onClick={() => handleChangeTab(2)}>
                Reviews
              </button>

              <button className={cx({ activeTab: activeTab === 3 })} onClick={() => handleChangeTab(3)}>
                Shipping Policy
              </button>

              <button className={cx({ activeTab: activeTab === 4 })} onClick={() => handleChangeTab(4)}>
                Size chart
              </button>
            </div>
            <div className={cx('content-tab-wrapper')}>
              {/* one connect */}
              {activeTab === 1 && (
                <div className={cx('tab-pane')}>
                  <div className={cx('desc-tab-content')}>
                    <p>
                      We hope that all consumers will be able to use the freshest, most nutritious and safest fruit and
                      vegetable products at Dung Ha Agricultural Products Store. With the mission of becoming one of the
                      leading suppliers of clean food and processing agricultural products, packing fresh dry goods for
                      export in Vietnam, reaching out all over the world. Dung Ha is committed to bringing consumers the
                      freshest agricultural products from all over the country with the aim of "Bringing nature into
                      your home". With a strict selection and control process of Agricultural Products, Dung Ha has
                      created an investment fund specializing in purchasing and supplying and distributing the freshest
                      and freshest vegetable products from farms to distribute to consumers to help them have The
                      freshest meals in each distinct product from nature. With the business philosophy of complying and
                      ensuring the freshest quality, the origin of the product is clear. We are committed to not using
                      any preservatives that are prohibited by the Ministry of Health from being used and commitment to
                      customers about all products distributed through the distribution system of Obrien Organic to
                      ensure the safest.
                    </p>
                  </div>
                </div>
              )}
              {/* one connect */}

              {/* one connect */}
              {activeTab === 2 && (
                <div className={cx('tab-pane')}>
                  <p>Waiting to update the Reviews feature...</p>
                </div>
              )}
              {/* one connect */}

              {/* one connect */}
              {activeTab === 3 && (
                <div className={cx('tab-pane')}>
                  <p>Waiting for shipping policy update...</p>
                </div>
              )}
              {/* one connect */}

              {/* one connect */}
              {activeTab === 4 && (
                <div className={cx('tab-pane')}>
                  <p>Waiting for update size chart...</p>
                </div>
              )}
              {/* one connect */}
            </div>
          </div>
          {/* row 2 */}

          {/* SAME PRODUCT */}
          <div className={cx('product-area')}>
            <div className={cx('container')}>
              <div className={cx('row')}>
                <div className={cx('wrap-sale-content')}>
                  <div className={cx('section-sale')}>
                    <h2 className={cx('sale-title')}>RELATED PRODUCT</h2>
                    <div className={cx('sale-content')}>
                      <p>You can check the related product for your shopping collection.</p>
                    </div>
                  </div>
                </div>
              </div>
              <div className={cx('product-wrapper')}>
                {/* one product */}

                {sameCategory?.map((productSame: IProduct) => (
                  <div className={cx('wrap-col-product')} key={productSame._id}>
                    <div className={cx('col-product')}>
                      <div className={cx('product-image')}>
                        <Link to={`/product/${productSame._id}`}>
                          <img src={productSame.images[0].url} alt="Obrien's product" />
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
                            <Link to={`/product/${productSame._id}`}>{productSame.name}</Link>
                          </h3>

                          <button>
                            <FontAwesomeIcon icon={faThumbsUp} />
                          </button>
                        </div>
                        <div className={cx('product-price')}>
                          <span className={cx('regular-price')}>
                            <FontAwesomeIcon icon={faDollar} className={cx('dollar-icon')} />
                            {productSame.price}
                          </span>
                          <span className={cx('old-price')}>
                            <del>
                              <FontAwesomeIcon icon={faDollar} className={cx('dollar-icon-old-price')} />
                              {productSame.price}
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
                              productId: productSame?._id,
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
          </div>
          {/* END FPRODUCT */}
        </div>
      </div>
    </>
  )
}

export default ProductDetail
