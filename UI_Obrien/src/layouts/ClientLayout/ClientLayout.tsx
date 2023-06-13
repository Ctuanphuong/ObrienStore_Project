import styles from './ClientLayout.module.scss'
import classNames from 'classnames/bind'
import Header from '../components/Header'
import Footer from '../components/Footer'

const cx = classNames.bind(styles)
const ClientLayout = ({ children }: any) => {
  return (
    <>
      <Header />
      <article className={cx('container')}>{children}</article>
      <Footer />
    </>
  )
}

export default ClientLayout
