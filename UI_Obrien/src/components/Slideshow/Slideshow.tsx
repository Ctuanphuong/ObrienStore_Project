import { useEffect, useState } from 'react'
import styles from './Slideshow.module.scss'
import classNames from 'classnames/bind'
import Button from '../Button'
import images from '~/assets/images'

const cx = classNames.bind(styles)

const SlideShow = ({ notice }: any) => {
  const [animate, setAnimate] = useState(true)

  useEffect(() => {
    const interval = setInterval(() => {
      setAnimate(true)
      setTimeout(() => setAnimate(false), 2000) // Chạy animation trong 2 giây, sau đó tắt animation
    }, 5000)

    return () => {
      clearInterval(interval)
    }
  }, [])

  const classes = cx('wrapper', { 'have-notice': notice })

  return (
    <div className={classes}>
      <div className={cx('banner')}>
        <img src={images.banner.sliderBanner1} alt="Obrien's banner" />
        <div className={cx('container')}>
          <div className={cx('content')}>
            <h4 className={cx('small-title', { animate: animate })}>Healthy life with</h4>
            <h2 className={cx('large-title', { 'animate-2': animate })}>Natural Organic</h2>
            <div>
              <Button to='/' dark className={cx('btn-shop', { 'animate-3': animate })}>
                Shop Now
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default SlideShow
