import { createContext, useContext } from 'react'

const CombinedContext = createContext<any>({})
const CombinedProvider = ({ productCrud, categoryCrud, children }: any) => {
  const combinedContextValue = { productCrud, categoryCrud }
  return <CombinedContext.Provider value={combinedContextValue}>{children}</CombinedContext.Provider>
}

export default CombinedProvider
export const useCombinedContext = () => useContext(CombinedContext)
