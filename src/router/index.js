import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

import index from '../views/index.vue';

import supplierIndex from '../views/supplier/index.vue';
import supplierAdd from '../views/supplier/add.vue';
import supplierView from '../views/supplier/view.vue';
import supplierEdit from '../views/supplier/edit.vue';

import tree from '../views/tree/index.vue';

import hotelIndex from '../views/hotel/index.vue';
import hotelSupplier from '../views/hotel/supplier.vue';
import hotelProductAdd from '../views/hotel/add.vue';
import hotelProductView from '../views/hotel/view.vue';
import hotelProductEdit from '../views/hotel/edit.vue';

export default new Router({
  mode: 'hash',
  saveScrollPosition: true,
  routes: [
    {path: '/', name: 'home', component: index},
    {path: '/tree', name: 'tree', component: tree},
    {path: '/supplier', name: 'supplier', component: supplierIndex},
    {path: '/supplier/add', name: 'supplierAdd', component: supplierAdd},
    {path: '/supplier/:id', name: 'supplierView', component: supplierView},
    {path: '/supplier/:id/edit', name: 'supplierEdit', component: supplierEdit},
    {path: '/hotel', name: 'hotel', component: hotelIndex},
    {path: '/hotel/:sid', name: 'hotelSupplier', component: hotelSupplier},
    {path: '/hotel/:sid/add', name: 'hotelProductAdd', component: hotelProductAdd},
    {path: '/hotel/:sid/:id', name: 'hotelProduct', component: hotelProductView},
    {path: '/hotel/:sid/:id/edit', name: 'hotelProductEdit', component: hotelProductEdit},
    /*{
      path: '/', component: index,
      children: [
        {
          path: 'supplier', component: supplierIndex,
          children: [
            {
              path: 'list', component: supplierList
            },
            {
              path: 'add', component: supplierAdd
            },
            {
              path: ':id', component: supplierDetail
            },
            {
              path: ':id/edit', component: supplierEdit
            }
          ]
        },
        {
          path: 'hotel', component: supplierIndex,
          children: [
            {
              path: 'list', component: supplierList
            },
            {
              path: 'add', component: supplierAdd
            },
            {
              path: ':id', component: supplierDetail
            },
            {
              path: ':id/edit', component: supplierEdit
            }
          ]
        }
      ]
    },*/
    {path: '*', redirect: '/'}
  ]
})
