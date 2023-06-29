import { Table } from 'antd'
import { Input, Space } from 'antd'
import styles from './Bill.module.scss'
import classNames from 'classnames/bind'
import { billColumns } from '~/data/columns'
import { useCombinedContext } from '~/providers/CombinedProvider'
import { useEffect, useState } from 'react'
import { IProduct } from '~/interfaces/IProduct'

const cx = classNames.bind(styles)

const { Search } = Input

const BillList = () => {
  const { billProvider } = useCombinedContext()
  // GET PRODUCTS
  const [bills, setBills] = useState<IProduct[]>([])

  useEffect(() => {
    setBills(billProvider.bills)
  }, [billProvider.bills])

  // Get columns
  const columns = billColumns(billProvider)

  return (
    <>
      <h3 className={cx('title-product')}>bill list management</h3>
      <div className={cx('row')}>
        <Space direction='vertical'>
          <Search placeholder='Enter bill code...' style={{ width: 200 }} allowClear />
        </Space>
      </div>
      <Table columns={columns} dataSource={bills} rowKey={(record) => record._id} pagination={{ pageSize: 5 }} />
    </>
  )
}

export default BillList
