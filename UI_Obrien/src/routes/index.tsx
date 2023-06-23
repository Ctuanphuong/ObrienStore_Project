import CategoryCreate from '~/pages/Admin/Category/CategoryCreate'
import CategoryList from '~/pages/Admin/Category/CategoryList'
import CategoryUpdate from '~/pages/Admin/Category/CategoryUpdate'
import DashBoard from '~/pages/Admin/DashBoard'
import { ProductCreate, ProductList, ProductUpdate } from '~/pages/Admin/Product'
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
export const privateRoutes = [
  {
    path: '/admin',
    component: DashBoard
  },
  {
    path: '/admin/dashboard',
    component: DashBoard
  },

  // Product path
  {
    path: '/admin/products',
    component: ProductList
  },
  {
    path: '/admin/products/create',
    component: ProductCreate
  },
  {
    path: '/admin/products/update/:id',
    component: ProductUpdate
  },
  // End Product path

  // Category path
  {
    path: '/admin/categories',
    component: CategoryList
  },
  {
    path: '/admin/categories/create',
    component: CategoryCreate
  },
  {
    path: '/admin/categories/update/:id',
    component: CategoryUpdate
  }
  // End Category path
]
