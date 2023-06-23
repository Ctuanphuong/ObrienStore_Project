import { useEffect, useState } from 'react'
import { Button, Form, Input, Radio, message } from 'antd'
import styles from './Category.module.scss'
import classNames from 'classnames/bind'
import { useParams } from 'react-router-dom'
import { ICategory } from '~/interfaces/ICategory'
import { useCombinedContext } from '~/providers/CombinedProvider'

const cx = classNames.bind(styles)
type SizeType = Parameters<typeof Form>[0]['size']

const CategoryUpdate = () => {
  const { categoryCrud } = useCombinedContext()
  const { id } = useParams()

  // Get category
  const [category, setCategory] = useState<ICategory>()
  const [form] = Form.useForm()

  useEffect(() => {
    setCategory(categoryCrud.categories.find((category: ICategory) => category._id === id))
  }, [categoryCrud.categories])

  // Khi category thay đổi giá trị thì gọi lại đoạn này để set giá trị cho form
  useEffect(() => {
    setFields()
  }, [category])

  // Set giá trị cũ cho category bằng cách gọi đến hàm set setFieldsValue dựa vào giá trị biến category lấy được
  const setFields = () => {
    form.setFieldsValue({
      _id: category?._id,
      name: category?.name,
      products: category?.products
    })
  }

  // Submit form
  const onFinish = (values: any) => {
    delete values.size
    if (values.name === 'Uncategorized') {
      return message.error(`Not allowed to update the "Uncategorized" category!`)
    }
    categoryCrud.onUpdate(values)
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
      <h3 className={cx('title-category')}>Update category</h3>
      <Form
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        labelCol={{ span: 4 }}
        wrapperCol={{ span: 14 }}
        layout='horizontal'
        initialValues={{ size: componentSize }}
        onValuesChange={onFormLayoutChange}
        size={componentSize as SizeType}
        className={cx('form-create')}
        form={form}
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
          label='Name'
          name={'name'}
          rules={[
            { required: true, message: 'Please enter a category name!' },
            { min: 3, message: 'Please enter category name more than 3 characters!' },
            { whitespace: true, message: 'No spaces allowed!' }
          ]}
        >
          <Input />
        </Form.Item>

        <Button htmlType='submit' className={cx('btn-submit')}>
          Update
        </Button>
      </Form>
    </>
  )
}

export default CategoryUpdate
