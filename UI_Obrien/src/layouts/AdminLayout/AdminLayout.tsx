import { useState } from 'react'
import { Breadcrumb, Divider, Layout, Menu, theme, Input, Space } from 'antd'
import styles from './AdminLayout.module.scss'
import classNames from 'classnames/bind'
import { items, items2 } from '~/data/itemsHeaderAdmin'
const cx = classNames.bind(styles)

const { Header, Content, Footer, Sider } = Layout
const { Search } = Input

const AdminLayout = ({ children }: any) => {
  //default table of ANTD
  const [collapsed, setCollapsed] = useState(false)
  const {
    token: { colorBgContainer }
  } = theme.useToken()

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Sider collapsible collapsed={collapsed} onCollapse={(value) => setCollapsed(value)}>
        <div className={cx('demo-logo-vertical')}>
          <h3>Obrien's Admin</h3>
        </div>
        <Menu theme='dark' defaultSelectedKeys={['1']} mode='inline' items={items} />
        <Divider className={cx('divider')} />
        <Menu theme='dark' mode='inline' items={items2} />
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
