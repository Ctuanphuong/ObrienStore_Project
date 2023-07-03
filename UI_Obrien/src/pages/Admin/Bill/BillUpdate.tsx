import { useEffect, useState } from 'react'
import { Button, Form, Input, Radio, Select } from 'antd'
import styles from '../Category/Category.module.scss'
import classNames from 'classnames/bind'
import { useCombinedContext } from '~/providers/CombinedProvider'
import { useParams } from 'react-router-dom'
import { IBills } from '~/interfaces/IBill'
import getDecodedUser from '~/components/Auth/getDecodedUser'

const cx = classNames.bind(styles)
type SizeType = Parameters<typeof Form>[0]['size']
const { Option } = Select

const BillUpdate = () => {
  const { billId } = useParams()

  const { billProvider } = useCombinedContext()
  const user = getDecodedUser()

  const [bill, setBill] = useState<any>()
  const [userInfo, setUserInfo] = useState<any>('')
  const [productCart, setProductCart] = useState<any>([])
  const [form] = Form.useForm()

  // Gọi hàm getUserId để truyền vào User nhằm chạy lại useEffect call lại api lấy về danh sách bill
  useEffect(() => {
    if (user) {
      billProvider.getUserId(user._id)
    }
  }, [user])

  // Get bill
  useEffect(() => {
    setBill(billProvider.bills.find((bill: IBills) => bill._id === billId))
  }, [billProvider.bills])

  // Lấy mảng sản phẩm giỏ hàng
  useEffect(() => {
    setProductCart(bill?.products)
  }, [bill])

  //Lấy thông tin người đặt
  useEffect(() => {
    setUserInfo(bill?.userId)
  }, [bill])

  // gọi lại hàm này khi bill thay đổi
  useEffect(() => {
    setFields()
  }, [bill])

  // Set fields
  const setFields = () => {
    form.setFieldsValue({
      _id: bill?._id,
      status: bill?.status,
      paymentStatus: bill?.paymentStatus
    })
  }
  // Submit form
  const onFinish = (values: any) => {
    delete values.size
    billProvider.onUpdateBill({ ...values, billId: values._id })
  }

  const onFinishFailed = (error: any) => {
    console.log('finish failed: ', error)
  }

  // SIZE CỦA FORM ANTD
  const [componentSize, setComponentSize] = useState<SizeType | 'default'>('default')

  const onFormLayoutChange = ({ size }: { size: SizeType }) => {
    setComponentSize(size)
  }

  return (
    <>
      <h3 className={cx('title-category')}>update bill</h3>

      <div className={cx('wrapper')}>
        <div className={cx('container')}>
          <div className={cx('bill-details')}>
            <div className={cx('wrap-info-order')}>
              <div className={cx('info-customer')}>
                <p>
                  <strong>Name:</strong> {userInfo?.name}
                </p>
                <p>
                  <strong>Phone:</strong> {userInfo?.phone}
                </p>
                <p>
                  <strong>Email:</strong> {userInfo?.email}
                </p>
                <p>
                  <strong>Address:</strong> {bill?.shippingAddress}
                </p>
                <p>
                  <strong>Order Notes:</strong> {bill?.orderNotes}
                </p>
              </div>
              <div className={cx('code-status')}>
                <p className={cx('bill-code')}>
                  <strong> BILL:</strong> <span>#{billId}</span>
                </p>
                <p>
                  <strong>Products: {productCart?.map((product: any) => product.productId.name.concat(', '))} </strong>
                </p>
                <div className={cx('wrap-status')}>
                  <p className={cx('status-pay', 'payment')}>{bill?.paymentMethod}</p>
                  {bill?.paymentStatus === 'Unpaid' ? (
                    <p className={cx('status-pay', 'unpaid')}>{bill?.paymentStatus}</p>
                  ) : (
                    <p className={cx('status-pay', 'paid')}>{bill?.paymentStatus}</p>
                  )}
                  {bill?.status === 'Delivered' ? (
                    <p className={cx('status', 'delivered')}>{bill?.status}</p>
                  ) : (
                    <p className={cx('status', 'shipping')}>{bill?.status}</p>
                  )}
                </div>
                <div className={cx('order-no')}>
                  <p>
                    <strong>Order Date:</strong>{' '}
                    {new Date(bill?.createdAt).toLocaleString('en-GB', {
                      day: '2-digit',
                      month: '2-digit',
                      year: 'numeric',
                      hour: '2-digit',
                      minute: '2-digit',
                      second: '2-digit'
                    })}
                  </p>
                </div>
              </div>
            </div>
          </div>
          <hr />
        </div>
      </div>

      <Form
        form={form}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        labelCol={{ span: 4 }}
        wrapperCol={{ span: 14 }}
        layout='horizontal'
        initialValues={{ size: componentSize }}
        onValuesChange={onFormLayoutChange}
        size={componentSize as SizeType}
        className={cx('form-create')}
      >
        <Form.Item label='Form Size' name='size'>
          <Radio.Group>
            <Radio.Button value='small'>Small</Radio.Button>
            <Radio.Button value='default'>Default</Radio.Button>
            <Radio.Button value='large'>Large</Radio.Button>
          </Radio.Group>
        </Form.Item>

        <Form.Item name='_id' style={{ display: 'none' }}>
          <Input />
        </Form.Item>

        <Form.Item
          label='Payment '
          name='paymentStatus'
          rules={[{ required: true, message: 'Please select payment status!' }]}
        >
          <Select placeholder='Select Payment Status' allowClear>
            <Option value={'Unpaid'} key={'unpaid'}>
              Unpaid
            </Option>
            <Option value={'Paid'} key={'paid'}>
              Paid
            </Option>
          </Select>
        </Form.Item>

        <Form.Item
          label='Order Status'
          name='status'
          rules={[{ required: true, message: 'Please select order status!' }]}
        >
          <Select placeholder='Select Payment Status' allowClear>
            <Option value={'Pending'} key={'pending'}>
              Pending
            </Option>
            <Option value={'Confirmed'} key={'confirmed'}>
              Confirmed
            </Option>
            <Option value={'Delivering'} key={'delivering'}>
              Delivering
            </Option>
            <Option value={'Delivered'} key={'delivered'}>
              Delivered
            </Option>
          </Select>
        </Form.Item>

        <Button htmlType='submit' className={cx('btn-submit')}>
          Update
        </Button>
      </Form>
    </>
  )
}

export default BillUpdate
