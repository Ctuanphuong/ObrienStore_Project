import { createContext, useContext } from 'react'

const CombinedContext = createContext<any>({})
const CombinedProvider = ({
  productProvider,
  categoryProvider,
  authProvider,
  cartProvider,
  billProvider,
  children
}: any) => {
  const combinedContextValue = { productProvider, categoryProvider, authProvider, cartProvider, billProvider }
  return <CombinedContext.Provider value={combinedContextValue}>{children}</CombinedContext.Provider>
}

export default CombinedProvider
export const useCombinedContext = () => useContext(CombinedContext)
