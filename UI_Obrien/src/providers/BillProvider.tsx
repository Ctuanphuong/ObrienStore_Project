import { message } from 'antd'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { IBills, IUpdateBill } from '~/interfaces/IBill'
import { getBills, getUserBills, updateBill } from '~/services/api/bill'

const BillProvider = () => {
  const navigate = useNavigate()
  const [userBills, setUserBills] = useState<IBills[]>([])
  const [userId, setUserId] = useState('')
  const [bills, setBills] = useState<IBills[]>([])
  const [reloadBills, setReloadBills] = useState(false)

  useEffect(() => {
    ;(async () => {
      try {
        const { data } = await getBills()
        setBills(data.bills)
      } catch (error: any) {
        console.error(error)
      }
    })()
  }, [reloadBills])

  // GET ALL USER BILLS
  useEffect(() => {
    ;(async () => {
      try {
        if (userId && userId !== 'undefined') {
          const { data } = await getUserBills(userId)
          setUserBills(data.bills)
        }
      } catch (error) {
        console.log(error)
      }
    })()
  }, [userId])

  const getUserId = (userId: string) => {
    try {
      setUserId(userId)
    } catch (error) {
      console.log(error)
    }
  }

  const onUpdateBill = async (dataBill: IUpdateBill) => {
    try {
      const { data } = await updateBill(dataBill)
      message.success(`${data.message}`)
      await setReloadBills(!reloadBills)
      navigate('/admin/bills')
    } catch (error) {
      console.log(error)
    }
  }
  return { userBills, getUserId, bills, onUpdateBill }
}

export default BillProvider
