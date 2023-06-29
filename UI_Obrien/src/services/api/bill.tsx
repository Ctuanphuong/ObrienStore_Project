import { IUpdateBill } from '~/interfaces/IBill'
import instance from './instance'

export const getBills = () => {
  return instance.get(`/bills`)
}

export const getUserBills = (userId: string) => {
  return instance.get(`/bills/user/${userId}`)
}

export const getBill = (billId: string) => {
  return instance.get(`/bills/${billId}`)
}

export const updateBill = (dataBill: IUpdateBill) => {
  return instance.put(`/bills/update/${dataBill.billId}`, dataBill)
}
