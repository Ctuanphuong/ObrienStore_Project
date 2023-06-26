import jwtDecode from 'jwt-decode'
import { useEffect, useState } from 'react'

const getDecodedUser = () => {
  const [user, setUser] = useState<any>()

  if (localStorage.getItem('accessToken')) {
    useEffect(() => {
      const accessToken = JSON.parse(localStorage.getItem('accessToken')!)
      const decoded: any = jwtDecode(accessToken)
      if (decoded) {
        setUser(decoded.payload)
      }
    }, [localStorage.getItem('accessToken')])
  }

  return user
}
export default getDecodedUser
