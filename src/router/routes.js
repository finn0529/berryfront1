
const routes = [
  {
    path: '/',
    name: 'MainLayout',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', name: 'Home', component: () => import('pages/index.vue'), meta: { title: '小莓波醬' } },
      { path: 'product', name: 'Product', component: () => import('pages/Product.vue'), meta: { title: '所有商品' } },
      { path: 'singleProduct/:id', name: 'singleProduct', component: () => import('pages/SingleProduct.vue') },
      { path: 'account', name: 'Account', component: () => import('pages/Account.vue'), meta: { login: true, title: '我的帳號' } },
      { path: 'cart', name: 'Cart', component: () => import('pages/Cart.vue'), meta: { login: true, title: '購物車' } },
      { path: 'check', name: 'Check', component: () => import('pages/Check.vue'), meta: { login: true, title: '結帳' } },
      { path: 'order', name: 'Order', component: () => import('pages/Order.vue'), meta: { login: true, title: '我的訂單' } },
      { path: 'order/:id', name: 'AdminOrderId', component: () => import('pages/SingleOrder.vue'), meta: { login: true, title: '我的訂單' } }
    ]
  },
  {
    path: '/admin',
    name: 'Admin',
    component: () => import('layouts/AdminLayout.vue'),
    children: [
      { path: '', name: 'AdminHome', component: () => import('pages/AdminHome.vue'), meta: { login: true, admin: true, title: '管理首頁' } },
      { path: 'product', name: 'AdminProduct', component: () => import('pages/AdminProduct.vue'), meta: { login: true, admin: true, title: '商品管理' } },
      { path: 'newProduct', name: 'AdminNewProduct', component: () => import('pages/AdminNewProduct.vue'), meta: { login: true, admin: true, title: '新增商品' } },
      { path: 'newProduct/:id', name: 'AdminNewProductId', component: () => import('pages/AdminNewProduct.vue'), meta: { login: true, admin: true, title: '編輯商品' } },
      { path: 'order', name: 'AdminOrder', component: () => import('pages/AdminOrder.vue'), meta: { login: true, admin: true, title: '訂單管理' } },
      { path: 'order/:id', name: 'AdminOrderId', component: () => import('pages/AdminSingleOrder.vue'), meta: { login: true, admin: true, title: '訂單管理' } },
      { path: 'customer', name: 'AdminCustomer', component: () => import('pages/AdminCustomer.vue'), meta: { login: true, admin: true, title: '客戶管理' } }
    ]
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '*',
    component: () => import('pages/Error404.vue')
  }
]

export default routes
