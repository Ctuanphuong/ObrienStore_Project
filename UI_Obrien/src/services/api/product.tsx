import { IProduct } from '~/interfaces/IProduct'
import instance from './instance'

export const getProducts = (currentPage: any, keywords: any, sortInfo: any) => {
  const [sort, order] = sortInfo.split('-')
  return instance.get(`/products?page=${currentPage}&keywords=${keywords}&sort=${sort}&order=${order}`)
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
