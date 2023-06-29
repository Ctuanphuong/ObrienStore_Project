import { Routes, Route } from 'react-router-dom'
import ClientLayout from './layouts/ClientLayout'
import { privateRoutes, publicRoutes } from './routes'
import AdminLayout from './layouts/AdminLayout/AdminLayout'
import PageNotFound from './pages/PageNotFound/PageNotFound'
import CombinedProvider from './providers/CombinedProvider.tsx'
import ProductProvider from './providers/ProductProvider.tsx'
import CategoryProvider from './providers/CategoryProvider.tsx'
import AuthProvider from './providers/AuthProvider.tsx'
import PageNotAuth from './pages/PageNotAuth/PageNotAuth.tsx'
import VerifyEmail from './pages/Verify/VerifyEmail.tsx'
import ResetPassword from './pages/User/Password/ResetPassword.tsx'
import ForgotPassword from './pages/User/Password/ForgotPassword.tsx'
import CartProvider from './providers/CartProvider.tsx'
import Results from './components/Results/Results.tsx'
import Bill from './pages/Bill/Bill.tsx'
import BillProvider from './providers/BillProvider.tsx'
function App() {
  return (
    <CombinedProvider
      productProvider={ProductProvider()}
      categoryProvider={CategoryProvider()}
      authProvider={AuthProvider()}
      cartProvider={CartProvider()}
      billProvider={BillProvider()}
    >
      <Routes>
        {/* Client Route */}
        {publicRoutes.map((route, index) => {
          const Page = route.component
          return (
            <Route
              key={index}
              path={route.path}
              element={
                <ClientLayout>
                  <Page />
                </ClientLayout>
              }
            ></Route>
          )
        })}

        {/* Admin Route */}
        {privateRoutes.map((route, index) => {
          const Page = route.component
          return (
            <Route
              key={index}
              path={route.path}
              element={
                <AdminLayout>
                  <Page />
                </AdminLayout>
              }
            ></Route>
          )
        })}

        <Route path='*' element={<PageNotFound />} />
        <Route path='/user/bill/:billId' element={<Bill />} />
        <Route path='/page-not-authorization' element={<PageNotAuth />} />
        <Route path='/forgot-password' element={<ForgotPassword />} />
        <Route path='/verify-email' element={<VerifyEmail />} />
        <Route path='/reset-password' element={<ResetPassword />} />
        <Route path='/order-success/:billId' element={<Results />} />
      </Routes>
    </CombinedProvider>
  )
}

export default App
