import React from 'react'
import {
  DesktopOutlined,
  AppstoreOutlined,
  CodeSandboxOutlined,
  FileDoneOutlined,
  SettingOutlined
} from '@ant-design/icons'
import type { MenuProps } from 'antd'
import { Button, Popconfirm } from 'antd'
import { Link } from 'react-router-dom'
import styles from './data.module.scss'
import classNames from 'classnames/bind'
import { useCombinedContext } from '~/providers/CombinedProvider'
const cx = classNames.bind(styles)

type MenuItem = Required<MenuProps>['items'][number]

function getItem(label: React.ReactNode, key: React.Key, icon?: React.ReactNode, children?: MenuItem[]): MenuItem {
  return {
    key,
    icon,
    children,
    label
  } as MenuItem
}

export const items: MenuItem[] = [
  getItem(<Link to='/admin/dashboard'>Dashboard</Link>, '1', <DesktopOutlined />),
  getItem('Category', 'sub2', <AppstoreOutlined />, [
    getItem(<Link to={'/admin/categories'}>View List</Link>, '3'),
    getItem(<Link to={'/admin/categories/create'}>Create New</Link>, '4')
  ]),
  getItem('Product', 'sub1', <CodeSandboxOutlined />, [
    getItem(<Link to={'/admin/products'}>View List</Link>, '5'),
    getItem(<Link to={'/admin/products/create'}>Create New</Link>, '6')
  ]),
  getItem('Bill', 'sub3', <FileDoneOutlined />, [getItem(<Link to={'/admin/bills'}>View List</Link>, '7')])
]

export const settingSideItems = () => {
  const { authProvider } = useCombinedContext()
  const items2: MenuItem[] = [
    getItem('Settings', 'sub1', <SettingOutlined />, [
      getItem(<Link to={'/admin/my-account'}>My Account</Link>, '1'),
      getItem(<Link to={'/admin/setting'}>Setting</Link>, '2'),
      getItem(
        <Popconfirm
          title='Logout your account.'
          description='Are you sure want to logout?'
          okText='Yes'
          cancelText='No'
          okButtonProps={{ className: cx('ok-btn-delete') }}
          onConfirm={() => {
            authProvider.onLogout()
          }}
        >
          <Button type='primary' danger>
            Logout
          </Button>
        </Popconfirm>,
        '3'
      )
    ])
  ]
  return items2
}
