import { Table } from 'antd'
import { Input, Space } from 'antd'
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
  const { categoryCrud } = useCombinedContext()

  // GET CATEGORIES
  const [categoryArr, setCategoryArr] = useState<ICategory[]>([])
  useEffect(() => {
    setCategoryArr(categoryCrud.categories)
  }, [categoryCrud.categories])

  // Xử lý để render số page theo thứ tự
  const renderPageNumbers = () => {
    const pageNumbers = []
    for (let i = 1; i <= categoryCrud.totalPages; i++) {
      pageNumbers.push(
        <button
          key={i}
          onClick={() => categoryCrud.onChangePage(i)}
          className={cx({ 'active-pag': i === categoryCrud.currentPage })}
        >
          {i}
        </button>
      )
    }
    return pageNumbers
  }

  //get columns
  const columns = CategoryColumns(categoryCrud)

  // Set lại keywords khi bấm nút search
  const onSearch = (value: string) => {
    categoryCrud.setKeywords(value)
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
          disabled={categoryCrud.currentPage === 1}
          onClick={() => categoryCrud.onChangePage(categoryCrud.currentPage - 1)}
        >
          &laquo;
        </button>
        {renderPageNumbers()}
        <button
          disabled={categoryCrud.currentPage === categoryCrud.totalPages}
          onClick={() => categoryCrud.onChangePage(categoryCrud.currentPage + 1)}
        >
          &raquo;
        </button>
      </div>
    </>
  )
}

export default CategoryList
