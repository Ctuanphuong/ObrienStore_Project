import { IProduct } from '~/interfaces/IProduct'
import instance from './instance'

export const getProducts = (currentPage: any, keywords: any) => {
  return instance.get(`/products?page=${currentPage}&keywords=${keywords}`)
}

export const getProduct = (id: string) => {
  return instance.get(`/products/${id}`)
}

export const addProduct = (product: IProduct) => {
  return instance.post(`/products`, product)
}

export const updateProduct = (product: IProduct) => {
  return instance.put(`/products/${product._id}`, product)
}

export const deleteProduct = (id: string) => {
  return instance.delete(`/products/${id}`)
}
