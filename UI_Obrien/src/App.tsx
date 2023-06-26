import { Routes, Route } from 'react-router-dom'
import ClientLayout from './layouts/ClientLayout'
import { privateRoutes, publicRoutes } from './routes'
import AdminLayout from './layouts/AdminLayout/AdminLayout'
import PageNotFound from './pages/PageNotFound/PageNotFound'
import CombinedProvider from './providers/CombinedProvider.tsx'
import ProductCrud from './providers/ProductCrud.tsx'
import CategoryCrud from './providers/CategoryCrud.tsx'
import AuthProvider from './providers/AuthProvider.tsx'
import PageNotAuth from './pages/PageNotAuth/PageNotAuth.tsx'
import VerifyEmail from './pages/Verify/VerifyEmail.tsx'
import ResetPassword from './pages/User/Password/ResetPassword.tsx'
import ForgotPassword from './pages/User/Password/ForgotPassword.tsx'
import CartProvider from './providers/CartProvider.tsx'
function App() {
  return (
    <CombinedProvider
      productCrud={ProductCrud()}
      categoryCrud={CategoryCrud()}
      authProvider={AuthProvider()}
      cartProvider={CartProvider()}
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
        <Route path='/page-not-authorization' element={<PageNotAuth />} />
        <Route path='/forgot-password' element={<ForgotPassword />} />
        <Route path='/verify-email' element={<VerifyEmail />} />
        <Route path='/reset-password' element={<ResetPassword />} />
      </Routes>
    </CombinedProvider>
  )
}

export default App
