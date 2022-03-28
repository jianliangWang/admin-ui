/* eslint-disable prefer-regex-literals */
const Mock = require('mockjs')

const Random = Mock.Random

const Result = {
  code: 200,
  msg: '操作成功',
  data: null
}

const authority = [
  {
    id: '3',
    name: 'system',
    label: '系统管理',
    type: 'Menu',
    icon: 'el-icon-s-operation',
    code: 'admin-system',
    url: '',
    parentCode: 'admin',
    component: '',
    children: [
      {
        id: '4',
        name: 'user',
        label: '用户管理',
        type: 'Menu',
        icon: 'el-icon-s-custom',
        code: 'system-user',
        url: '/system/user',
        parentCode: 'admin-system',
        component: 'main/user/List',
        children: [
          {
            id: '5',
            name: '用户添加',
            type: 'Button',
            icon: '',
            code: 'system-user-add',
            url: '/system/user/add',
            parentCode: 'system-user',
            component: '',
            children: []
          },
          {
            id: '6',
            name: '用户修改',
            type: 'Button',
            icon: '',
            code: 'system-user-update',
            url: '/system/user/update',
            parentCode: 'system-user',
            component: '',
            children: []
          },
          {
            id: '7',
            name: '用户删除',
            type: 'Button',
            icon: '',
            code: 'system-user-delete',
            url: '/system/user/delete',
            parentCode: 'system-user',
            component: '',
            children: []
          },
          {
            id: '8',
            name: '用户查询',
            type: 'Button',
            icon: '',
            code: 'system-user-list',
            url: '/system/user/list',
            parentCode: 'system-user',
            component: '',
            children: []
          },
          {
            id: '9',
            name: '批量启用',
            type: 'Button',
            icon: '',
            code: 'system-user-batchEnable',
            url: '/system/user/batchEnable',
            parentCode: 'system-user',
            component: '',
            children: []
          },
          {
            id: '10',
            name: '批量禁用',
            type: 'Button',
            icon: '',
            code: 'system-user-batchDisable',
            url: '/system/user/batchDisable',
            parentCode: 'system-user',
            component: '',
            children: []
          },
          {
            id: '30',
            name: '批量删除',
            type: 'Button',
            icon: '',
            code: 'system-user-batchDelete',
            url: '/system/user/batchDelete',
            parentCode: 'system-user',
            component: '',
            children: []
          },
          {
            id: '31',
            name: '分配角色',
            type: 'Button',
            icon: '',
            code: 'system-user-setRole',
            url: '/system/user/setRole',
            parentCode: 'system-user',
            component: '',
            children: [
              {
                id: '32',
                name: '分配角色保存',
                type: 'Button',
                icon: '',
                code: 'system-user-setRole-save',
                url: '/system/user/setRole',
                parentCode: 'system-user',
                component: '',
                children: []
              }
            ]
          }
        ]
      },
      {
        id: '2',
        name: 'updatePassword',
        label: '修改密码',
        type: 'Button',
        icon: '',
        code: 'admin-home-user-updatePassword',
        url: '/home/updatePassword',
        parentCode: 'admin-home',
        component: 'main/user/UpdatePassword',
        children: []
      },
      {
        id: '11',
        name: 'role',
        label: '角色管理',
        type: 'Menu',
        icon: 'el-icon-view',
        code: 'system-role-list',
        url: '/system/role',
        parentCode: 'admin-system',
        component: 'main/role/List',
        children: [
          {
            id: '12',
            name: '添加',
            type: 'Button',
            icon: '',
            code: 'system-role-add',
            url: '/system/role/add',
            parentCode: 'system-role',
            component: '',
            children: []
          },
          {
            id: '13',
            name: '修改',
            type: 'Button',
            icon: '',
            code: 'system-role-update',
            url: '/system/role/update',
            parentCode: 'system-role',
            component: '',
            children: []
          },
          {
            id: '14',
            name: '删除',
            type: 'Button',
            icon: '',
            code: 'system-role-delete',
            url: '/system/role/delete',
            parentCode: 'system-role',
            component: '',
            children: []
          },
          {
            id: '15',
            name: '查询',
            type: 'Button',
            icon: '',
            code: 'system-role-list',
            url: '/system/role/list',
            parentCode: 'system-role',
            component: '',
            children: []
          },
          {
            id: '16',
            name: '批量启用',
            type: 'Button',
            icon: '',
            code: 'system-role-batchEnable',
            url: '/system/role/batchEnable',
            parentCode: 'system-role',
            component: '',
            children: []
          },
          {
            id: '17',
            name: '批量禁用',
            type: 'Button',
            icon: '',
            code: 'system-role-batchDisable',
            url: '/system/role/batchDisable',
            parentCode: 'system-role',
            component: '',
            children: []
          },
          {
            id: '18',
            name: '批量删除',
            type: 'Button',
            icon: '',
            code: 'system-role-batchDelete',
            url: '/system/role/batchDelete',
            parentCode: 'system-role',
            component: '',
            children: []
          },
          {
            id: '19',
            name: '分配权限',
            type: 'Button',
            icon: '',
            code: 'system-role-setAuth',
            url: '/system/role/setAuth',
            parentCode: 'system-role',
            component: '',
            children: []
          }
        ]
      },
      {
        id: '20',
        name: 'authorization',
        label: '权限管理',
        type: 'Menu',
        icon: 'el-icon-document',
        code: 'system-authorization',
        url: '/system/authorization',
        parentCode: 'admin-system',
        component: 'main/authorization/List',
        children: [
          {
            id: '21',
            name: '添加',
            type: 'Button',
            icon: '',
            code: 'system-authorization-add',
            url: '/system/authorization/add',
            parentCode: 'system-authorization',
            component: '',
            children: []
          },
          {
            id: '22',
            name: '修改',
            type: 'Button',
            icon: '',
            code: 'system-authorization-update',
            url: '/system/authorization/update',
            parentCode: 'system-authorization',
            component: '',
            children: []
          },
          {
            id: '23',
            name: '删除',
            type: 'Button',
            icon: '',
            code: 'system-authorization-delete',
            url: '/system/authorization/delete',
            parentCode: 'system-authorization',
            component: '',
            children: []
          },
          {
            id: '24',
            name: '查询',
            type: 'Button',
            icon: '',
            code: 'system-authorization',
            url: '/system/authorization/list',
            parentCode: 'system-authorization',
            component: '',
            children: []
          }
        ]
      }
    ]
  }
]

Mock.mock('/captcha', 'get', () => {
  console.log('get verify code')
  Result.data = {
    token: Random.string(32),
    captchaImg: Random.dataImage('100x40', Random.string(6))
  }
  return Result
})

Mock.mock('/login', 'post', () => {
  Result.data = authority
  return Result
})

Mock.mock('/logout', 'post', () => {
  return Result
})

Mock.mock('/system/menu/list', 'post', () => {
  Result.data = authority
  return Result
})
Mock.mock('/authorization/add', 'post', () => {
  return Result
})

Mock.mock('/authorization/update', 'post', () => {
  return Result
})

// eslint-disable-next-line prefer-regex-literals
Mock.mock(RegExp('/authorization/getInfo/*'), 'get', () => {
  const resData = {
    id: 1,
    name: '首页',
    code: '00',
    icon: 'home',
    type: 'Menu',
    url: '/Home',
    component: '/Home',
    parentCode: 'system',
    order: '1',
    status: 'normal'
  }
  Result.data = resData
  return Result
})

Mock.mock('/authorization/list', 'post', () => {
  Result.data = authority
  return Result
})

Mock.mock('/role/list', 'post', () => {
  const roleList = {
    records: [
      {
        id: 1,
        name: '普通用户',
        code: 'normal',
        status: 'normal',
        desc: '普通用户'
      },
      {
        id: 2,
        name: '系统管理员',
        code: 'admin',
        status: 'normal',
        desc: '普通用户'
      },
      {
        id: 3,
        name: '超级管理员',
        code: 'superadmin',
        status: 'disable',
        desc: '普通用户'
      }
    ],
    pageSize: 10,
    total: 3,
    pageCount: 1,
    currentPage: 1
  }

  Result.data = roleList
  return Result
})

Mock.mock('/role/add', 'post', option => {
  console.log(option.body)
  return Result
})

Mock.mock('/role/update', 'post', () => {
  return Result
})

Mock.mock(RegExp('/role/getInfo/*'), 'post', () => {
  const resData = {
    id: 1,
    name: '管理员',
    code: 'Admin',
    desc: '系统管理员',
    status: 'normal'
  }
  Result.data = resData
  return Result
})

Mock.mock('/role/updateStatus', 'post', option => {
  console.log(option.body)
  return Result
})

Mock.mock('/role/batchDelete', 'post', option => {
  console.log(option.body)
  return Result
})

Mock.mock('/user/list', 'post', () => {
  const userList = {
    records: [
      {
        id: 1,
        userName: 'admin',
        roleName: '管理员',
        status: 'normal',
        desc: '普通用户'
      },
      {
        id: 2,
        userName: 'test',
        roleName: '测试',
        status: 'normal',
        desc: '测试用户'
      },
      {
        id: 3,
        userName: 'guest',
        roleName: '访客',
        status: 'disable',
        desc: '临时用户'
      }
    ],
    pageSize: 10,
    total: 3,
    pageCount: 1,
    currentPage: 1
  }

  Result.data = userList
  return Result
})

Mock.mock('/user/add', 'post', option => {
  console.log(option.body)
  return Result
})

Mock.mock('/user/update', 'post', () => {
  return Result
})

Mock.mock(RegExp('/user/getInfo/*'), 'post', () => {
  const resData = {
    id: 1,
    name: '管理员',
    code: 'Admin',
    desc: '系统管理员',
    status: 'normal'
  }
  Result.data = resData
  return Result
})

Mock.mock('/user/updateStatus', 'post', option => {
  console.log(option.body)
  return Result
})

Mock.mock('/user/batchDelete', 'post', option => {
  console.log(option.body)
  return Result
})
