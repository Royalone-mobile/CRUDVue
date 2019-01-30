import Vue from 'vue'
import Router from 'vue-router'
import List from '@/components/List'
import Product from '@/components/Product'
import AddProduct from '@/components/AddProduct'
import DeleteProduct from '@/components/DeleteProduct'
import UpdateProduct from '@/components/UpdateProduct'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      component: List
    },
    {
      path: '/product/:product_id',
      component: Product,
      name: 'product'
    },
    {
      path: '/add-product',
      component: AddProduct,
      name: 'AddProduct'
    },
    {
      path: '/product/:product_id/edit',
      component: UpdateProduct,
      name: 'product-edit'},

    {
      path: '/product/:product_id/delete',
      component: DeleteProduct,
      name: 'product-delete'
    }
  ]
})
