import { IAddToCart } from '~/interfaces/ICart'
import instance from './instance'

export const addToCart = (data: IAddToCart) => {
  return instance.post('/cart/add', data)
}

export const getCartUser = (userId: string) => {
  return instance.get(`/cart/${userId}`)
}

export const updateCart = (dataCart: IAddToCart) => {
  return instance.put(`/cart/update`, dataCart)
}
