import { Routes, Route } from 'react-router-dom'
import ClientLayout from './layouts/ClientLayout'
import { privateRoutes, publicRoutes } from './routes'
import AdminLayout from './layouts/AdminLayout/AdminLayout'
import PageNotFound from './pages/PageNotFound/PageNotFound'
import CombinedProvider from './providers/CombinedProvider.tsx'
import ProductCrud from './providers/ProductCrud.tsx'
import CategoryCrud from './providers/CategoryCrud.tsx'

function App() {
  return (
    <CombinedProvider productCrud={ProductCrud()} categoryCrud={CategoryCrud()}>
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
      </Routes>
    </CombinedProvider>
  )
}

export default App
