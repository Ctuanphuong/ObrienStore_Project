export interface IBills {
  _id: string
  cartId: string
  userId: string
  orderNotes: string
  paymentMethod: string
  paymentStatus: string
  shippingAddress: string
  shippingFee: number
  status: string
  totalOrder: number
  totalPrice: number
  createdAt: Date
  updatedAt: Date
}

export interface IUpdateBill {
  billId: string
  status: string
  paymentStatus: string
}
