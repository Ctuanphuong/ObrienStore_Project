import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAngleDown } from '@fortawesome/free-solid-svg-icons'

const subMenuPage = [
  {
    id: 1,
    name: 'FAQ',
    to: '/faq'
  },
  {
    id: 2,
    name: 'My Account',
    to: '/my-account'
  },
  {
    id: 3,
    name: 'Login',
    to: '/login'
  },
  {
    id: 1,
    name: 'Register',
    to: '/register'
  }
]
export const menus = [
  { id: 1, title: 'Home', to: '/', icon: null, subMenu: false },
  { id: 2, title: 'Product', to: '/product' },
  { id: 3, title: 'Pages', to: '/pages', icon: <FontAwesomeIcon icon={faAngleDown} />, subMenu: subMenuPage },
  { id: 4, title: 'Blog', to: '/blog', icon: null, subMenu: false },
  { id: 5, title: 'About', to: '/about', icon: null, subMenu: false },
  { id: 6, title: 'Contact', to: '/contact', icon: null, subMenu: false }
]
