import { useEffect, useState } from 'react'
import { message } from 'antd'
import { IAddToCart, ICheckOut, IDeleteCart, IDeleteOneProductCart } from '~/interfaces/ICart'
import { IProduct } from '~/interfaces/IProduct'
import { addToCart, checkOut, deleteAllProduct, deleteOneProduct, getCartUser, updateCart } from '~/services/api/cart'
import { useNavigate } from 'react-router-dom'
const CartProvider = () => {
  const navigate = useNavigate()
  const [cart, setCart] = useState({})
  const [products, setProducts] = useState<IProduct[]>([])
  const [userId, setUserId] = useState('')
  const [reloadCart, setReloadCart] = useState(false)
  const [redirectResults, setRedirectResults] = useState(false)
  const [redirectCheckOut, setRedirectCheckOut] = useState(false)

  const expiredTokenFail = 'Token has expired! Please login again.'

  useEffect(() => {
    ;(async () => {
      try {
        if (userId) {
          const { data } = await getCartUser(userId)
          const { products } = data.cart
          setCart(data.cart)
          setProducts(products)
        }
      } catch (error: any) {
        if (error.response.data.message && error.response.data.message === expiredTokenFail) {
          message.error(`Login session expired! Please login again to take this action.`)
        } else if (!userId || userId === 'undefined') {
          message.info(`Please login to view your shopping cart.`)
        } else {
          console.log(error)
        }
      }
    })()
  }, [reloadCart, userId])

  // ADD TO CART
  const onAddToCart = async (dataCart: IAddToCart) => {
    try {
      const { data } = await addToCart(dataCart)
      await setReloadCart(!reloadCart)
      message.success(`${data.message}`)
    } catch (error: any) {
      if (error.response.data.message && error.response.data.message === expiredTokenFail) {
        message.error(`Login session expired! Please login again to take this action.`)
      } else if (!userId) {
        message.info(`Please login to add product to cart.`)
      } else {
        message.error(`An error occurred while add product to cart! Please try again later.`)
      }
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
    } catch (error: any) {
      if (error.response.data.message && error.response.data.message === expiredTokenFail) {
        message.error(`Login session expired! Please login again to take this action.`)
      } else {
        message.error(`An error occurred while updating the cart! Please try again later.`)
      }
    }
  }

  // DELETE ONE PRODUCT IN CART
  const onDeleteOneProductCart = async (dataCart: IDeleteOneProductCart) => {
    try {
      const { data } = await deleteOneProduct(dataCart)
      await setReloadCart(!reloadCart)
      message.success(`${data.message}`)
    } catch (error: any) {
      if (error.response.data.message) {
        message.error(error.response.data.message)
      }
      message.error(error.message)
    }
  }

  // DELETE ALL PRODUCT IN CART
  const onDeleteCart = async (dataCart: IDeleteCart) => {
    try {
      const { data } = await deleteAllProduct(dataCart)
      await setReloadCart(!reloadCart)
      message.success(`${data.message}`)
    } catch (error: any) {
      if (error.response.data.message) {
        message.error(error.response.data.message)
      }
      message.error(error.message)
    }
  }

  // CHECK OUT
  const onCheckOut = async (dataCart: ICheckOut) => {
    try {
      const { data } = await checkOut(dataCart)
      await setReloadCart(!reloadCart)
      navigate(`/order-success/${data.bill._id}`)
      setRedirectResults(true)
    } catch (error) {
      message.error(`A server error has occurred! Please try again later.`)
    }
  }

  return {
    onAddToCart,
    getUserId,
    onUpdateCart,
    onCheckOut,
    onDeleteOneProductCart,
    onDeleteCart,
    setReloadCart,
    setRedirectCheckOut,
    redirectCheckOut,
    cart,
    products,
    redirectResults,
    reloadCart
  }
}

export default CartProvider
