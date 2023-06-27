import { IAddToCart, ICheckOut, IDeleteCart, IDeleteOneProductCart } from '~/interfaces/ICart'
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

export const deleteOneProduct = (dataCart: IDeleteOneProductCart) => {
  return instance.post(`/cart/delete`, dataCart)
}

export const deleteAllProduct = (dataCart: IDeleteCart) => {
  return instance.post(`/cart/delete-all`, dataCart)
}

export const checkOut = (dataCart: ICheckOut) => {
  return instance.post('/cart/checkout', dataCart)
}
