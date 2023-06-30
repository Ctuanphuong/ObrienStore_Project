import { ICategory } from './ICategory'

export interface IProduct {
  _id: string
  name: string
  price: number
  quantity: number
  description: string
  images: imagesProduct[]
  categoryId?: ICategory
  createdAt: Date
  updatedAt: Date
}

interface imagesProduct {
  publicId: string
  url: string
  fileName?: string
}
