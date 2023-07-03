import { Table, Input, Space } from 'antd'

import styles from '../Product/Product.module.scss'
import classNames from 'classnames/bind'
import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { CategoryColumns } from '~/data/columns'
import { ICategory } from '~/interfaces/ICategory'
import { useCombinedContext } from '~/providers/CombinedProvider'

const cx = classNames.bind(styles)

const { Search } = Input

const CategoryList = () => {
  const { categoryProvider } = useCombinedContext()

  // GET CATEGORIES
  const [categoryArr, setCategoryArr] = useState<ICategory[]>([])
  useEffect(() => {
    setCategoryArr(categoryProvider.categories)
  }, [categoryProvider.categories])

  // Xử lý để render số page theo thứ tự
  const renderPageNumbers = () => {
    const pageNumbers = []
    for (let i = 1; i <= categoryProvider.totalPages; i++) {
      pageNumbers.push(
        <button
          key={i}
          onClick={() => categoryProvider.onChangePage(i)}
          className={cx({ 'active-pag': i === categoryProvider.currentPage })}
        >
          {i}
        </button>
      )
    }
    return pageNumbers
  }

  //get columns
  const columns = CategoryColumns(categoryProvider)

  // Set lại keywords khi bấm nút search
  const onSearch = (value: string) => {
    categoryProvider.setKeywords(value)
  }

  return (
    <>
      <h3 className={cx('title-product')}>category list management</h3>
      <div className={cx('row')}>
        <Link to={'/admin/categories/create'} className={cx('btn-primary')}>
          Create New
        </Link>
        <Space direction='vertical'>
          <Search placeholder='Enter keywords...' onSearch={onSearch} style={{ width: 200 }} allowClear />
        </Space>
      </div>
      <Table columns={columns} dataSource={categoryArr} rowKey={(record) => record._id!} pagination={false} />
      <div className={cx('pagination')}>
        <button
          disabled={categoryProvider.currentPage === 1}
          onClick={() => categoryProvider.onChangePage(categoryProvider.currentPage - 1)}
        >
          &laquo;
        </button>
        {renderPageNumbers()}
        <button
          disabled={categoryProvider.currentPage === categoryProvider.totalPages}
          onClick={() => categoryProvider.onChangePage(categoryProvider.currentPage + 1)}
        >
          &raquo;
        </button>
      </div>
    </>
  )
}

export default CategoryList
