import { IProduct } from './IProduct'

export interface ICategory {
  _id: string
  name: string
  products?: IProduct[]
  createdAt: Date
  updatedAt: Date
}
