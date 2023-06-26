import { useEffect, useState } from 'react'
import { message } from 'antd'
import { IAddToCart } from '~/interfaces/ICart'
import { IProduct } from '~/interfaces/IProduct'
import { addToCart, getCartUser, updateCart } from '~/services/api/cart'

const CartProvider = () => {
  const [cart, setCart] = useState([])
  const [products, setProducts] = useState<IProduct[]>([])
  const [userId, setUserId] = useState('')
  const [reloadCart, setReloadCart] = useState(false)

  useEffect(() => {
    ;(async () => {
      try {
        if (userId) {
          const { data } = await getCartUser(userId)
          const { products } = data.cart
          setCart(data.cart)
          setProducts(products)
        }
      } catch (error) {
        console.log(error)
      }
    })()
  }, [reloadCart, userId])

  // ADD TO CART
  const onAddToCart = async (dataCart: IAddToCart) => {
    try {
      const { data } = await addToCart(dataCart)
      message.success(`${data.message}`)
    } catch (error) {
      message.error(`An error has occurred. Please try again`)
    }
  }

  // GET CART
  const getUserId = async (userId: string) => {
    try {
      setUserId(userId)
    } catch (error) {
      console.log(error)
    }
  }

  // UPDATE CART
  const onUpdateCart = async (dataCart: IAddToCart) => {
    try {
      await updateCart(dataCart)
      setReloadCart(!reloadCart)
    } catch (error) {
      console.log(error)
    }
  }

  return {
    onAddToCart,
    getUserId,
    onUpdateCart,
    setReloadCart,
    cart,
    products
  }
}

export default CartProvider
