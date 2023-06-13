import Login from '~/pages/Auth/Login'
import Register from '~/pages/Auth/Register'
import Cart from '~/pages/Cart'
import CheckOut from '~/pages/Cart/CheckOut'
import Home from '~/pages/Home'
import Product from '~/pages/Product'
import ProductDetail from '~/pages/ProductDetail'
export const publicRoutes = [
  {
    path: '/',
    component: Home
  },
  {
    path: '/pages',
    component: Home
  },
  {
    path: '/product',
    component: Product
  },
  {
    path: '/product/:id',
    component: ProductDetail
  },
  { path: '/cart', component: Cart },
  { path: '/checkout', component: CheckOut },
  { path: '/login', component: Login },
  { path: '/register', component: Register }
]
export const privateRoutes = [{
  path: '/admin'
}]
