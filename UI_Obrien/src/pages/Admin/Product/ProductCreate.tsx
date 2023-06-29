import { useEffect, useState } from 'react'
import { Button, Form, Input, InputNumber, Radio, Select, Upload } from 'antd'
import styles from '../Category/Category.module.scss'
import classNames from 'classnames/bind'
import { useCombinedContext } from '~/providers/CombinedProvider'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faDollar } from '@fortawesome/free-solid-svg-icons'
import { ICategory } from '~/interfaces/ICategory'
import { UploadOutlined } from '@ant-design/icons'

const cx = classNames.bind(styles)
type SizeType = Parameters<typeof Form>[0]['size']
const { TextArea } = Input
const { Option } = Select

const ProductCreate = () => {
  const { productProvider, categoryProvider } = useCombinedContext()

  const [categories, setCategories] = useState<ICategory[]>([])

  // Get all categories
  useEffect(() => {
    setCategories(categoryProvider.categories)
  }, [categoryProvider.categories])

  // Submit form
  const onFinish = (values: any) => {
    delete values.size
    const images = values.images.fileList.map((image: any) => image.response.image_urls[0])
    productProvider.onAdd({ ...values, images })
  }

  const onFinishFailed = (error: any) => {
    console.log('finish failed: ', error)
  }

  // validate than 0
  const validateGreaterThanZero = (_: any, value: number) => {
    if (value <= 0) {
      return Promise.reject('Please enter a number greater than 0!')
    }
    return Promise.resolve()
  }

  // SIZE CỦA FORM ANTD
  const [componentSize, setComponentSize] = useState<SizeType | 'default'>('default')

  const onFormLayoutChange = ({ size }: { size: SizeType }) => {
    setComponentSize(size)
  }
  return (
    <>
      <h3 className={cx('title-category')}>create new product</h3>
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
      >
        <Form.Item label='Form Size' name='size'>
          <Radio.Group>
            <Radio.Button value='small'>Small</Radio.Button>
            <Radio.Button value='default'>Default</Radio.Button>
            <Radio.Button value='large'>Large</Radio.Button>
          </Radio.Group>
        </Form.Item>

        <Form.Item
          label='Category'
          name='categoryId'
          rules={[{ required: true, message: 'Please select a category!' }]}
        >
          <Select placeholder='Select category' allowClear>
            {categories.map((category) => {
              return category.name !== 'Uncategorized' ? (
                <Option value={category._id} key={category._id}>
                  {category.name}
                </Option>
              ) : null
            })}
          </Select>
        </Form.Item>

        <Form.Item
          label='Name'
          name={'name'}
          rules={[
            { required: true, message: 'Please enter a product name!' },
            { min: 3, message: 'Please enter product name more than 3 characters!' },
            { whitespace: true, message: 'No spaces allowed!' }
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label='Price'
          name='price'
          rules={[
            {
              pattern: /^(?:\d*)$/,
              message: 'Product price must be number!'
            },
            { required: true, message: 'Please enter product price as number!' },
            {
              validator: validateGreaterThanZero
            }
          ]}
        >
          <InputNumber prefix={<FontAwesomeIcon icon={faDollar} className={cx('dollar-icon')} />} />
        </Form.Item>

        <Form.Item
          label='Quantity'
          name='quantity'
          rules={[
            {
              pattern: /^(?:\d*)$/,
              message: 'Product quantity must be number!'
            },
            { required: true, message: 'Please enter product quantity as number!' },
            {
              validator: validateGreaterThanZero
            }
          ]}
        >
          <InputNumber />
        </Form.Item>

        <Form.Item
          label='Description'
          name='description'
          rules={[
            { required: true, message: 'Please enter product description!' },
            { min: 10, message: 'Please enter product name more than 10 characters!' },
            { whitespace: true, message: 'No spaces allowed!' }
          ]}
        >
          <TextArea rows={4} />
        </Form.Item>

        <Form.Item
          label='Images'
          name='images'
          rules={[{ required: true, message: 'Please upload product illustrations!' }]}
        >
          <Upload action='http://localhost:8000/api/images/upload' listType='picture' name='images' multiple>
            <Button icon={<UploadOutlined />}>Choose images</Button>
          </Upload>
        </Form.Item>

        <Button htmlType='submit' className={cx('btn-submit')}>
          Create new
        </Button>
      </Form>
    </>
  )
}

export default ProductCreate
