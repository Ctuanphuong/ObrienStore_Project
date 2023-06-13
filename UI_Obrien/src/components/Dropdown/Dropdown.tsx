import styles from './Dropdown.module.scss'
import classNames from 'classnames/bind'

const cx = classNames.bind(styles)
const Dropdown = ({ children }: any) => {
  return <div className={cx('wrapper')}>{children}</div>
}

export default Dropdown
