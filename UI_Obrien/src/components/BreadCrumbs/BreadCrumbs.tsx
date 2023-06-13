import { Link } from 'react-router-dom'
import styles from './BreadCrumbs.module.scss'
import classNames from 'classnames/bind'
import images from '~/assets/images'

interface BreadProps {
  title: string
  page: string
}
const cx = classNames.bind(styles)

const BreadCrumbs = ({ title, page }: BreadProps) => {
  return (
    <div className={cx('wrapper')}>
      <img src={images.banner.productBanner} alt="Obrien's Banner" />
      <div className={cx('bread-crumbs')}>
        <div className={cx('container')}>
          <div className={cx('content')}>
            <h2 className={cx('page')}>{title}</h2>
            <ul>
              <li className={cx('have-arrow')}>
                <Link to='/' className={cx('link-home')}>
                  Home
                </Link>
              </li>
              <li className={cx('item')}>{page}</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}

export default BreadCrumbs
