import { Routes, Route } from 'react-router-dom'
import ClientLayout from './layouts/ClientLayout'
import { publicRoutes } from './routes'

function App() {
  return (
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
    </Routes>
  )
}

export default App
