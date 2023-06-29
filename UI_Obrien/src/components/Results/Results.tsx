import { faCircleCheck } from '@fortawesome/free-regular-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { useCombinedContext } from '~/providers/CombinedProvider'
import styles from './Results.module.scss'
import classNames from 'classnames/bind'
import Button from '../Button'
import { faArrowAltCircleLeft } from '@fortawesome/free-solid-svg-icons'
const cx = classNames.bind(styles)

const Results = (): any => {
  const { billId } = useParams()

  const navigate = useNavigate()
  const { cartProvider } = useCombinedContext()

  return cartProvider.redirectResults ? (
    <div className={cx('wrapper')}>
      <div className={cx('tick-icon')}>
        <FontAwesomeIcon icon={faCircleCheck} />
      </div>
      <div className={cx('title')}>
        <h1>You have successfully placed an order!</h1>
        <p className={cx('content-success')}>
          We will make every effort to ship your items to you as soon as possible. If you have any questions regarding
          your order, please contact our customer care team. We will be happy to assist you. Thank you for shopping with
          us!
        </p>
      </div>
      <div className={cx('wrap-btn')}>
        <Button to={`/user/bill/${billId}`} regular className={cx('btn-actions')}>
          View Details
        </Button>
        <Button to={`/product`} regularWhite className={cx('btn-actions')}>
          Continue Shopping
        </Button>
      </div>
      <div className={cx('back-home')}>
        <Link to={'/'} className={cx('back-to-home')}>
          <FontAwesomeIcon icon={faArrowAltCircleLeft} className={cx('icon-back')} /> Back Home
        </Link>
      </div>
    </div>
  ) : (
    navigate('/')
  )
}

export default Results
