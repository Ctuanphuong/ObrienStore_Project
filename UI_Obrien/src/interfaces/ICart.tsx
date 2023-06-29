import { IProduct } from './IProduct'

export interface ICart {
  _id: string
  userId: string
  products: IProductCart[]
  shippingFee: number
  totalPrice: number
  totalOrder: number
  coupon: string
  createdAt: Date
  updatedAt: Date
}

export interface IAddToCart {
  userId: string
  productId: string
  quantity?: number
}

export interface IProductCart {
  productId: IProduct
  price: number
  quantity: number
  _id: string
}

export interface ICheckOut {
  name: string
  email: string
  phone: number
  userId: string
  shippingAdress: string
  paymentMethod: string
  orderNotes: string
}

export interface IDeleteCart {
  userId: string
}

export interface IDeleteOneProductCart extends IDeleteCart {
  productId: string
}
