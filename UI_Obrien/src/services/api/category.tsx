import instance from './instance'
import { ICategory } from '~/interfaces/ICategory'

export const getCategories = (currentPage: number, keywords: string) => {
  return instance.get(`/categories?page=${currentPage}&keywords=${keywords}`)
}

export const getCategory = (id: string) => {
  return instance.get(`/categories/${id}`)
}

export const addCategory = (category: ICategory) => {
  return instance.post(`/categories`, category)
}

export const updateCategory = (category: ICategory) => {
  return instance.put(`/categories/${category._id}`, category)
}

export const deleteCategory = (id: string) => {
  return instance.delete(`/categories/${id}`)
}
