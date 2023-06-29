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
  const { productProvider } = useCombinedContext()
  // GET PRODUCTS
  const [products, setProducts] = useState<IProduct[]>([])
  useEffect(() => {
    setProducts(productProvider.products)
  }, [productProvider.products])

  // Xử lý để render số page theo thứ tự
  const renderPageNumbers = () => {
    const pageNumbers = []
    for (let i = 1; i <= productProvider.totalPages; i++) {
      pageNumbers.push(
        <button
          key={i}
          onClick={() => productProvider.onChangePage(i)}
          className={cx({ 'active-pag': i === productProvider.currentPage })}
        >
          {i}
        </button>
      )
    }
    return pageNumbers
  }

  // Get columns
  const columns = productColumns(productProvider)
  const onSearch = (value: string) => {
    productProvider.setKeywords(value)
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
          disabled={productProvider.currentPage === 1}
          onClick={() => productProvider.onChangePage(productProvider.currentPage - 1)}
        >
          &laquo;
        </button>
        {renderPageNumbers()}
        <button
          disabled={productProvider.currentPage === productProvider.totalPages}
          onClick={() => productProvider.onChangePage(productProvider.currentPage + 1)}
        >
          &raquo;
        </button>
      </div>
    </>
  )
}

export default ProductList
