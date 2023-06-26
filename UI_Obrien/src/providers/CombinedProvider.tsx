import { createContext, useContext } from 'react'

const CombinedContext = createContext<any>({})
const CombinedProvider = ({ productCrud, categoryCrud, authProvider, cartProvider, children }: any) => {
  const combinedContextValue = { productCrud, categoryCrud, authProvider, cartProvider }
  return <CombinedContext.Provider value={combinedContextValue}>{children}</CombinedContext.Provider>
}

export default CombinedProvider
export const useCombinedContext = () => useContext(CombinedContext)
