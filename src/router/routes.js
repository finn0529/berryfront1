
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
      { path: 'Order', name: 'Order', component: () => import('pages/Order.vue'), meta: { login: true, title: '我的帳號' } }
    ]
  },
  {
    path: '/admin',
    name: 'Admin',
    component: () => import('layouts/AdminLayout.vue'),
    children: [
      { path: '', name: 'AdminHome', component: () => import('pages/AdminHome.vue'), meta: { login: true, admin: true } },
      { path: 'product', name: 'AdminProduct', component: () => import('pages/AdminProduct.vue'), meta: { login: true, admin: true } },
      { path: 'newProduct', name: 'AdminNewProduct', component: () => import('pages/AdminNewProduct.vue'), meta: { login: true, admin: true } },
      { path: 'newProduct/:id', name: 'AdminNewProductId', component: () => import('pages/AdminNewProduct.vue'), meta: { login: true, admin: true } },
      { path: 'order', name: 'AdminOrder', component: () => import('pages/AdminOrder.vue'), meta: { login: true, admin: true } },
      { path: 'customer', name: 'AdminCustomer', component: () => import('pages/AdminCustomer.vue'), meta: { login: true, admin: true } }
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
