import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import styles from './Home.module.scss'
import classNames from 'classnames/bind'
import { Link } from 'react-router-dom'
import SlideShow from '~/components/Slideshow'
import { faStar as faStarRegular, faThumbsUp } from '@fortawesome/free-regular-svg-icons'
import { faStar } from '@fortawesome/free-solid-svg-icons'
import Button from '~/components/Button'
import images from '~/assets/images'
import Tippy from '@tippyjs/react'

const cx = classNames.bind(styles)

const Home = () => {
  return (
    <div className={cx('wrapper')}>
      <SlideShow />
      {/* FEATURE CONTENT */}
      <div className={cx('feature-area')}>
        <div className={cx('container')}>
          <div className={cx('row')}>
            <div className={cx('col')}>
              <div className={cx('feature-content-wrapper')}>
                <h2 className={cx('title')}>Important to eat fruit</h2>
                <p className={cx('desc-content')}>
                  Eating fruit provides health benefits — people who eat more fruits and vegetables as part of an
                  overall healthy diet are likely to have a reduced risk of some chronic diseases. Fruits provide
                  nutrients vital for health and maintenance of your body.
                </p>
                <p className={cx('desc-content')}>
                  Fruits are sources of many essential nutrients that are underconsumed, including potassium, dietary
                  fiber, vitamin C, and folate (folic acid).
                </p>
                <p className={cx('desc-content')}>
                  Most fruits are naturally low in fat, sodium, and calories. None have cholesterol.
                </p>
              </div>
            </div>
            <div className={cx('col')}>
              <div className={cx('feature-image')}>
                <img src={images.banner.featureBanner} alt="Obrien's Feature" />
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* END FEATURE CONTENT */}

      {/* FPRODUCT */}
      <div className={cx('product-area')}>
        <div className={cx('container')}>
          <div className={cx('row')}>
            <div className={cx('wrap-sale-content')}>
              <div className={cx('section-sale')}>
                <h2 className={cx('sale-title')}>BEST SALE</h2>
                <div className={cx('sale-content')}>
                  <p>
                    All best seller product are now available for you and your can buy this product from here any time
                    any where so sop now
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className={cx('product-wrapper')}>
            {/* one product */}

            <div className={cx('wrap-col-product')}>
              <div className={cx('col-product')}>
                <div className={cx('product-image')}>
                  <Link to={'/product'}>
                    <img
                      src='https://res.cloudinary.com/phuong-fpoly/image/upload/v1685847064/Obrien%20Store/product/product-14_pbi7jo.png'
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
          </div>
        </div>
      </div>
      {/* END FPRODUCT */}

      {/* SALE BANNER */}
      <div className={cx('banner-area')}>
        <div className={cx('container')}>
          <div className={cx('row-banner')}>
            {/* one col */}
            <div className={cx('col-banner')}>
              <div className={cx('img-banner')}>
                <img src={images.banner.flashBanner} alt="Obrie's banner" />
              </div>
            </div>

            {/* one col */}

            {/* one col */}
            <div className={cx('col-banner')}>
              <div className={cx('banner-flash')}>
                <h2 className={cx('head-deal')}>FLASH DEALS</h2>
                <h3 className={cx('head-title')}>HURRY UP AND GET 25% DISCOUNT</h3>

                <Button to={'/product'} primary>
                  Shop now
                </Button>

                <div className={cx('wrap-countdown')}>
                  <div className={cx('single-countdown')}>
                    <span className={cx('single-countdown-time')}>00</span>
                    <span className={cx('single-countdown-text')}>days</span>
                  </div>
                  <div className={cx('single-countdown')}>
                    <span className={cx('single-countdown-time')}>00</span>
                    <span className={cx('single-countdown-text')}>Hours</span>
                  </div>
                  <div className={cx('single-countdown')}>
                    <span className={cx('single-countdown-time')}>00</span>
                    <span className={cx('single-countdown-text')}>Min</span>
                  </div>
                  <div className={cx('single-countdown')}>
                    <span className={cx('single-countdown-time')}>00</span>
                    <span className={cx('single-countdown-text')}>Sec</span>
                  </div>
                </div>
              </div>
            </div>
            {/* one col */}
          </div>
        </div>
      </div>
      {/* END SALE BANNER */}

      {/* SMALL BANNERS  */}
      <div className={cx('small-banner-area')}>
        <div className={cx('container')}>
          <div className={cx('row-small-banner')}>
            {/* one col */}
            <div className={cx('col-small-bannner')}>
              <div className={cx('img-small-banner')}>
                <Link to={'/product'}>
                  <img src={images.banner.smallBanner1} alt="Obrien's banner" />
                </Link>
              </div>
            </div>
            {/*end one col */}
            {/* one col */}
            <div className={cx('col-small-bannner')}>
              <div className={cx('img-small-banner')}>
                <Link to={'/product'}>
                  <img src={images.banner.smallBanner2} alt="Obrien's banner" />
                </Link>
              </div>
            </div>
            {/*end one col */}
            {/* one col */}
            <div className={cx('col-small-bannner')}>
              <div className={cx('img-small-banner')}>
                <Link to={'/product'}>
                  <img src={images.banner.smallBanner3} alt="Obrien's banner" />
                </Link>
              </div>
            </div>
            {/*end one col */}
          </div>
        </div>
      </div>
      {/* END SMALL BANNERS  */}

      {/* FPRODUCT */}
      <div className={cx('product-area')}>
        <div className={cx('container')}>
          <div className={cx('row')}>
            <div className={cx('wrap-sale-content')}>
              <div className={cx('section-sale')}>
                <h2 className={cx('sale-title')}>FEATURED PRODUCTS</h2>
                <div className={cx('sale-content')}>
                  <p>
                    All best seller product are now available for you and your can buy this product from here any time
                    any where so sop now
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className={cx('product-wrapper')}>
            {/* one product */}
            <div className={cx('wrap-col-product')}>
              <div className={cx('col-product')}>
                <div className={cx('product-image')}>
                  <Link to={'/product'}>
                    <img
                      src='https://res.cloudinary.com/phuong-fpoly/image/upload/v1685847062/Obrien%20Store/product/product-2_agdm10.webp'
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
                      <Link to={'/product'}>Fresh Pomegranate</Link>
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
                      src='https://res.cloudinary.com/phuong-fpoly/image/upload/v1685847062/Obrien%20Store/product/product-3_shyohn.webp'
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
                      <Link to={'/product'}>Vietnam Banana</Link>
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
                      src='https://res.cloudinary.com/phuong-fpoly/image/upload/v1685847062/Obrien%20Store/product/product-4_s6shfj.webp'
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
                      <Link to={'/product'}>Red Radish</Link>
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
                      src='https://res.cloudinary.com/phuong-fpoly/image/upload/v1685847062/Obrien%20Store/product/product-5_oxu8zx.webp'
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
                      <Link to={'/product'}>fresh coconut</Link>
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
          </div>
        </div>
      </div>
      {/* END FPRODUCT */}

      {/* NEWSLETTER */}
      <div className={cx('newsletter-area')}>
        <div className={cx('container')}>
          <div className={cx('newsletter-row')}>
            <div className={cx('newsletter-col')}>
              <div className={cx('newsletters-img')}>
                <img src={images.banner.newsletterBanner} alt="Obrien's banner" />
              </div>
            </div>

            <div className={cx('newsletter-col')}>
              <div className={cx('newsletter-context')}>
                <h4>
                  SPECIAL <span>OFFER</span> FOR SUBSCRIPTION
                </h4>
                <h2>GET INSTANT DISCOUNT FOR MEMBERSHIP</h2>
                <p>
                  Subscribe our newsletter and all latest news of our <br /> latest product, promotion and offers
                </p>
                <div className='newsletter-form-wrap'>
                  <form className={cx('mc-form')}>
                    <input type='text' placeholder='email@example.com' className={cx('form-control')} />
                    <Button primary className={cx('btn-subscribe')}>
                      Subscribe
                    </Button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* END NEWSLETTER */}

      {/* LATEST BLOG */}
      <div className={cx('latest-blog-area')}>
        <div className={cx('container')}>
          <div className={cx('row')}>
            <div className={cx('wrap-sale-content')}>
              <div className={cx('section-sale')}>
                <h2 className={cx('sale-title')}>LATEST BLOG</h2>
                <div className={cx('sale-content')}>
                  <p>If you want to know about the organic product then keep an eye on our blog.</p>
                </div>
              </div>
            </div>
          </div>
          <div className={cx('row-latest-blog')}>
            {/* one col */}
            <div className={cx('col-latest-log')}>
              <div className={cx('img-latest-blog')}>
                <Link to={'/product'}>
                  <img
                    src='https://res.cloudinary.com/phuong-fpoly/image/upload/v1685847598/Obrien%20Store/blog/blog-1_qdiuix.webp'
                    alt="Obrien's blog image"
                  />
                </Link>
              </div>
              <div className={cx('latest-blog-context')}>
                <div className={cx('post-date')}>
                  <span>14</span>
                  <span>01</span>
                </div>
                <div className={cx('post-meta')}>
                  <span>Author: Obrien Demo Admin</span>
                </div>
                <h2 className={cx('post-title')}>
                  <Link to={'/product'}>There Are Many Variation of Passages of Lorem Ipsum Available</Link>
                </h2>
                <p className={cx('desc-content')}>
                  "Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of
                  classical Latin literature from 45 BC, making..."
                </p>
              </div>
            </div>
            {/* one col */}

            {/* one col */}
            <div className={cx('col-latest-log')}>
              <div className={cx('img-latest-blog')}>
                <Link to={'/product'}>
                  <img
                    src='https://res.cloudinary.com/phuong-fpoly/image/upload/v1685847598/Obrien%20Store/blog/blog-2_sq2sve.webp'
                    alt="Obrien's blog image"
                  />
                </Link>
              </div>
              <div className={cx('latest-blog-context')}>
                <div className={cx('post-date')}>
                  <span>14</span>
                  <span>01</span>
                </div>
                <div className={cx('post-meta')}>
                  <span>Author: Obrien Demo Admin</span>
                </div>
                <h2 className={cx('post-title')}>
                  <Link to={'/product'}>There Are Many Variation of Passages of Lorem Ipsum Available</Link>
                </h2>
                <p className={cx('desc-content')}>
                  "Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of
                  classical Latin literature from 45 BC, making..."
                </p>
              </div>
            </div>
            {/* one col */}

            {/* one col */}
            <div className={cx('col-latest-log')}>
              <div className={cx('img-latest-blog')}>
                <Link to={'/product'}>
                  <img
                    src='https://res.cloudinary.com/phuong-fpoly/image/upload/v1685847598/Obrien%20Store/blog/blog-3_j2ppxy.webp'
                    alt="Obrien's blog image"
                  />
                </Link>
              </div>
              <div className={cx('latest-blog-context')}>
                <div className={cx('post-date')}>
                  <span>14</span>
                  <span>01</span>
                </div>
                <div className={cx('post-meta')}>
                  <span>Author: Obrien Demo Admin</span>
                </div>
                <h2 className={cx('post-title')}>
                  <Link to={'/product'}>There Are Many Variation of Passages of Lorem Ipsum Available</Link>
                </h2>
                <p className={cx('desc-content')}>
                  "Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of
                  classical Latin literature from 45 BC, making..."
                </p>
              </div>
            </div>
            {/* one col */}
          </div>
        </div>
      </div>
      {/* END LATEST BLOG */}
    </div>
  )
}

export default Home
