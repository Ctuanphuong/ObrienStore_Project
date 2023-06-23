import { Table } from 'antd'
import { Input, Space } from 'antd'
import styles from './Product.module.scss'
import classNames from 'classnames/bind'
import { Link } from 'react-router-dom'
import { productColumns } from '~/data/columns'
import { useCombinedContext } from '~/providers/CombinedProvider'
import { useEffect, useState } from 'react'
import { IProduct } from '~/interfaces/IProduct'

const cx = classNames.bind(styles)

const { Search } = Input

const ProductList = () => {
  const { productCrud } = useCombinedContext()
  // GET PRODUCTS
  const [products, setProducts] = useState<IProduct[]>([])
  useEffect(() => {
    setProducts(productCrud.products)
  }, [productCrud.products])

  // Xử lý để render số page theo thứ tự
  const renderPageNumbers = () => {
    const pageNumbers = []
    for (let i = 1; i <= productCrud.totalPages; i++) {
      pageNumbers.push(
        <button
          key={i}
          onClick={() => productCrud.onChangePage(i)}
          className={cx({ 'active-pag': i === productCrud.currentPage })}
        >
          {i}
        </button>
      )
    }
    return pageNumbers
  }

  // Get columns
  const columns = productColumns(productCrud)
  const onSearch = (value: string) => {
    productCrud.setKeywords(value)
  }

  return (
    <>
      <h3 className={cx('title-product')}>product list management</h3>
      <div className={cx('row')}>
        <Link to={'/admin/products/create'} className={cx('btn-primary')}>
          Create New
        </Link>
        <Space direction='vertical'>
          <Search placeholder='Enter keywords...' onSearch={onSearch} style={{ width: 200 }} allowClear />
        </Space>
      </div>
      <Table columns={columns} dataSource={products} pagination={false} rowKey={(record) => record._id!} />
      <div className={cx('pagination')}>
        <button
          disabled={productCrud.currentPage === 1}
          onClick={() => productCrud.onChangePage(productCrud.currentPage - 1)}
        >
          &laquo;
        </button>
        {renderPageNumbers()}
        <button
          disabled={productCrud.currentPage === productCrud.totalPages}
          onClick={() => productCrud.onChangePage(productCrud.currentPage + 1)}
        >
          &raquo;
        </button>
      </div>
    </>
  )
}

export default ProductList
