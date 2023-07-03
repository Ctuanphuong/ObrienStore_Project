import styles from './Button.module.scss'
import classNames from 'classnames/bind'
import { Link } from 'react-router-dom'

const cx = classNames.bind(styles)
const Button = ({
  to,
  href,
  regular = false,
  regularWhite = false,
  primary = false,
  secondary = false,
  dark = false,
  white = false,
  small = false,
  large,
  longerPink = false,
  longerDark = false,
  children,
  onClick,
  className,
  ...passProps
}: any) => {
  let Comp: any = 'button'

  const props = {
    onClick,
    ...passProps
  }

  if (to) {
    props.to = to
    Comp = Link
  }

  if (href) {
    props.to = href
    Comp = 'a'
  }

  const classes = cx('wrapper', {
    primary,
    secondary,
    dark,
    white,
    small,
    large,
    longerPink,
    longerDark,
    [className]: className,
    regular,
    regularWhite
  })

  return (
    <Comp className={classes} {...props}>
      <span>{children}</span>
    </Comp>
  )
}

export default Button
