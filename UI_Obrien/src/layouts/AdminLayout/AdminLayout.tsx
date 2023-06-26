import { useState } from 'react'
import { Breadcrumb, Divider, Layout, Menu, theme } from 'antd'
import styles from './AdminLayout.module.scss'
import classNames from 'classnames/bind'
import { items, settingSideItems } from '~/data/itemsHeaderAdmin'
import { useNavigate } from 'react-router-dom'

import getDecodedUser from '~/components/Auth/getDecodedUser'
const cx = classNames.bind(styles)

const { Header, Content, Footer, Sider } = Layout

const AdminLayout = ({ children }: any): any => {
  const navigate = useNavigate()

  const user = getDecodedUser()

  //default table of ANTD
  const [collapsed, setCollapsed] = useState(false)
  const {
    token: { colorBgContainer }
  } = theme.useToken()

  if (!user || (user && user.role !== 'admin')) {
    // window.location.replace('/page-not-authorization')
    return navigate('/page-not-authorization')
  }

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Sider collapsible collapsed={collapsed} onCollapse={(value) => setCollapsed(value)}>
        <div className={cx('demo-logo-vertical')}>
          <h3>Obrien's Admin</h3>
        </div>
        <Menu theme='dark' defaultSelectedKeys={['1']} mode='inline' items={items} />
        <Divider className={cx('divider')} />
        <Menu theme='dark' mode='inline' items={settingSideItems()} />
      </Sider>
      <Layout>
        <Header style={{ padding: 0, background: colorBgContainer }} />
        <Content style={{ margin: '0 16px' }}>
          <Breadcrumb style={{ margin: '16px 0' }} items={[{ title: 'Obrien Store / Administrator System' }]} />
          <div style={{ padding: 24, minHeight: 360, background: colorBgContainer }}>{children}</div>
        </Content>
        <Footer style={{ textAlign: 'center' }}>Obrine's Administrator ©2023 Created by Ant UED</Footer>
      </Layout>
    </Layout>
  )
}

export default AdminLayout
