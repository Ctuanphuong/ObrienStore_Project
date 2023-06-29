import { useState } from 'react'
import { Button, Form, Input, Radio } from 'antd'
import styles from './Category.module.scss'
import classNames from 'classnames/bind'
import { useCombinedContext } from '~/providers/CombinedProvider'

const cx = classNames.bind(styles)
type SizeType = Parameters<typeof Form>[0]['size']

const CategoryCreate = () => {
  const { categoryProvider } = useCombinedContext()

  // Submit form
  const onFinish = (values: any) => {
    delete values.size
    categoryProvider.onAdd(values)
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
      <h3 className={cx('title-category')}>create new category</h3>
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
          Create new
        </Button>
      </Form>
    </>
  )
}

export default CategoryCreate
