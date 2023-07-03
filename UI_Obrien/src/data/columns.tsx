import { QuestionCircleOutlined } from '@ant-design/icons'
import { faDollar, faInfoCircle, faPencilAlt, faTrashCan } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Button, Popconfirm, Image, Space } from 'antd'
import { Link } from 'react-router-dom'
import styles from './data.module.scss'
import classNames from 'classnames/bind'
import { useCombinedContext } from '~/providers/CombinedProvider'
import { ICategory } from '~/interfaces/ICategory'

const cx = classNames.bind(styles)
// PRODUCT
interface ProductProps {
  onDelete: (id: string) => void
}
export const productColumns = (props: ProductProps) => {
  const onHandleDelete = (id: string) => {
    props.onDelete(id)
  }
  const { categoryProvider } = useCombinedContext()
  const columns: any = [
    {
      title: '#',
      key: 'index',
      render: (text: any, record: any, index: any) => {
        console.log(text)
        console.log(record)

        return index + 1
      }
    },
    {
      title: 'Image',
      dataIndex: 'images',
      key: 'images',
      render: (images: any): any => {
        return <Image src={images[0].url} className={cx('product-img')} width={60} height={60} />
      }
    },
    {
      title: 'Category',
      dataIndex: 'categoryId',
      key: 'categoryId',
      render: (categoryId: string) => {
        const categoryInfo = categoryProvider.categories.find((category: ICategory) => category._id === categoryId)
        return categoryInfo ? (
          <span className={cx('categoryInfo')}>{categoryInfo?.name.trim()}</span>
        ) : (
          <span className={cx('categoryInfo')}>Uncategorized</span>
        )
      }
    },
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      render: (name: string) => <span className={cx('product-name')}>{name.trim()}</span>,
      sorter: (ob1: any, ob2: any): any => {
        return ob1.name.localeCompare(ob2.name)
      }
    },
    {
      title: 'Price',
      dataIndex: 'price',
      key: 'price',
      render: (price: number) => {
        return (
          <span className={cx('product-price')}>
            <FontAwesomeIcon icon={faDollar} className={cx('dollar-icon')} />
            {price}
          </span>
        )
      },
      sorter: (a: any, b: any): any => {
        return a.price - b.price
      }
    },
    {
      title: 'Quantity',
      dataIndex: 'quantity',
      key: 'quantity',
      render: (quantity: number) => <span className={cx('product-quantity')}>{quantity}</span>,
      sorter: (a: any, b: any): any => {
        return a.quantity - b.quantity
      }
    },
    {
      title: 'Description',
      dataIndex: 'description',
      key: 'description',
      render: (description: string) => {
        return description.trim().slice(0, 50).concat('...')
      }
    },
    {
      title: 'Date Created',
      dataIndex: 'createdAt',
      key: 'createdAt',
      render: (createdAt: Date) => {
        return new Date(createdAt).toLocaleString('en-GB', {
          day: '2-digit',
          month: '2-digit',
          year: 'numeric',
          hour: '2-digit',
          minute: '2-digit',
          second: '2-digit'
        })
      }
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (record: any) => {
        return (
          <Space size={'middle'}>
            <Link to={`/admin/products/update/${record._id}`}>
              <Button className={cx('btn-actions', 'btn-edit')}>
                <FontAwesomeIcon icon={faPencilAlt} />
              </Button>
            </Link>
            <Popconfirm
              title='This action will delete your product.'
              description='Are you sure want to delete this product?'
              icon={<QuestionCircleOutlined style={{ color: 'red' }} />}
              okButtonProps={{
                className: cx('ok-btn-delete')
              }}
              onConfirm={() => onHandleDelete(record._id)}
            >
              <Button danger className={cx('btn-actions')}>
                <FontAwesomeIcon icon={faTrashCan} />
              </Button>
            </Popconfirm>
          </Space>
        )
      }
    }
  ]
  return columns
}

// CATEGORY
interface CategoryProps {
  onDelete: (id: string) => void
}
export const CategoryColumns = (props: CategoryProps) => {
  const onHandleDelete = (id: string) => {
    props.onDelete(id)
  }

  const columns: any = [
    {
      title: '#',
      key: 'index',
      render: (_text: any, _record: any, index: any) => {
        return index + 1
      }
    },
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      render: (name: string) => <span className={cx('product-name')}>{name.trim()}</span>,
      sorter: (ob1: any, ob2: any): any => {
        return ob1.name.localeCompare(ob2.name)
      }
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (record: any) => {
        return (
          <Space size={'middle'}>
            {record.name === 'Uncategorized' ? (
              <Button className={cx('btn-actions-disable', 'btn-edit')}>
                <FontAwesomeIcon icon={faPencilAlt} />
              </Button>
            ) : (
              <Link to={`/admin/categories/update/${record._id}`}>
                <Button className={cx('btn-actions', 'btn-edit')}>
                  <FontAwesomeIcon icon={faPencilAlt} />
                </Button>
              </Link>
            )}

            <Popconfirm
              title='This action will delete your category.'
              description='Are you sure want to delete this category?'
              icon={<QuestionCircleOutlined style={{ color: 'red' }} />}
              okButtonProps={{
                className: cx('ok-btn-delete')
              }}
              onConfirm={() => onHandleDelete(record._id)}
            >
              {record.name === 'Uncategorized' ? (
                <Button danger className={cx('btn-actions-disable')}>
                  <FontAwesomeIcon icon={faTrashCan} />
                </Button>
              ) : (
                <Button danger className={cx('btn-actions')}>
                  <FontAwesomeIcon icon={faTrashCan} />
                </Button>
              )}
            </Popconfirm>
          </Space>
        )
      }
    }
  ]

  return columns
}

export const billColumns = (_props: any) => {
  const columns: any = [
    {
      title: '#',
      key: 'index',
      render: (_text: any, _record: any, index: any) => {
        return index + 1
      }
    },
    {
      title: 'ID',
      dataIndex: '_id',
      key: '_id'
    },
    {
      title: 'Customer',
      dataIndex: 'userId',
      key: 'userId',
      render: (user: any) => {
        return <span className={cx('product-name')}>{user.name}</span>
      }
    },
    {
      title: 'Products',
      dataIndex: 'products',
      key: 'products',
      render: (products: any) =>
        products.map((product: any) => {
          return (
            <p className={cx('product-name')} key={products._id}>
              {product.productId.name} × {product.quantity}{' '}
            </p>
          )
        })
    },
    {
      title: 'Total',
      dataIndex: 'totalOrder',
      key: 'totalOrder',
      render: (totalOrder: number) => {
        return (
          <span className={cx('product-price')}>
            <FontAwesomeIcon icon={faDollar} className={cx('dollar-icon')} />
            {totalOrder}
          </span>
        )
      }
    },
    {
      title: 'Payment Status',
      dataIndex: 'paymentStatus',
      key: 'paymentStatus',
      render: (paymentStatus: string) =>
        paymentStatus === 'Paid' ? (
          <p className={cx('status-order', 'done')}>{paymentStatus}</p>
        ) : (
          <p className={cx('status-order', 'doing')}>{paymentStatus}</p>
        )
    },
    {
      title: 'Order Status',
      dataIndex: 'status',
      key: 'status',
      render: (status: string) =>
        status === 'Delivered' ? (
          <p className={cx('status-order', 'done')}>{status}</p>
        ) : (
          <p className={cx('status-order', 'doing')}>{status}</p>
        )
    },
    {
      title: 'Order Date',
      dataIndex: 'createdAt',
      key: 'createdAt',
      render: (createdAt: Date) => {
        return new Date(createdAt).toLocaleString('en-GB', {
          day: '2-digit',
          month: '2-digit',
          year: 'numeric',
          hour: '2-digit',
          minute: '2-digit',
          second: '2-digit'
        })
      }
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (record: any) => {
        return (
          <Space size={'middle'}>
            <Link to={`/admin/bills/details/${record._id}`}>
              <Button className={cx('btn-actions', 'btn-info')}>
                <FontAwesomeIcon icon={faInfoCircle} />
              </Button>
            </Link>
            <Link to={`/admin/bills/update/${record._id}`}>
              <Button className={cx('btn-actions', 'btn-edit')}>
                <FontAwesomeIcon icon={faPencilAlt} />
              </Button>
            </Link>
            <Popconfirm
              disabled
              title='This action will delete your product.'
              description='Are you sure want to delete this product?'
              icon={<QuestionCircleOutlined style={{ color: 'red' }} />}
              okButtonProps={{
                className: cx('ok-btn-delete')
              }}
            >
              <Button danger className={cx('btn-actions')} disabled>
                <i className='bi bi-cart-x'></i>
              </Button>
            </Popconfirm>
          </Space>
        )
      }
    }
  ]
  return columns
}
