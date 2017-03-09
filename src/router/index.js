import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

import index from '../views/index.vue';

import potentialIndex from '../views/potential/index.vue';
import potentialAdd from '../views/potential/add.vue';
import potentialView from '../views/potential/view.vue';
import potentialEdit from '../views/potential/edit.vue';

import supplierIndex from '../views/supplier/index.vue';
import supplierAdd from '../views/supplier/add.vue';
import supplierView from '../views/supplier/view.vue';
import supplierEdit from '../views/supplier/edit.vue';
import supplierAptitude from '../views/supplier/aptitude.vue';
import supplierContact from '../views/supplier/contact.vue';
import supplierAccount from '../views/supplier/account.vue';
import supplierUser from '../views/supplier/user.vue';
import supplierBusiness from '../views/supplier/business.vue';

import fieldIndex from '../views/field/index.vue';

import hotelIndex from '../views/hotel/index.vue';
import hotelSupplier from '../views/hotel/supplier.vue';
import hotelProductAdd from '../views/hotel/add.vue';
import hotelProductView from '../views/hotel/view.vue';
import hotelProductEdit from '../views/hotel/edit.vue';

import treeIndex from '../views/tree/index.vue';

export default new Router({
  mode: 'hash',
  saveScrollPosition: true,
  routes: [
    {path: '/', name: 'home', component: index},
    {path: '/tree', name: 'tree', component: treeIndex},
    {path: '/potential', name: 'potentialIndex', component: potentialIndex},
    {path: '/potential/add', name: 'potentialAdd', component: potentialAdd},
    {path: '/potential/:id', name: 'potentialView', component: potentialView},
    {path: '/potential/:id/edit', name: 'potentialEdit', component: potentialEdit},
    {path: '/supplier', name: 'supplierIndex', component: supplierIndex},
    {path: '/supplier/add', name: 'supplierAdd', component: supplierAdd},
    {path: '/supplier/:sid', name: 'supplierView', component: supplierView},
    {path: '/supplier/:sid/edit', name: 'supplierEdit', component: supplierEdit},
    {path: '/supplier/:sid/aptitude', name: 'supplierAptitudeAdd', component: supplierAptitude},
    {path: '/supplier/:sid/aptitude/:id', name: 'supplierAptitudeEdit', component: supplierAptitude},
    {path: '/supplier/:sid/contact', name: 'supplierContactAdd', component: supplierContact},
    {path: '/supplier/:sid/contact/:id', name: 'supplierContactEdit', component: supplierContact},
    {path: '/supplier/:sid/account', name: 'supplierAccountAdd', component: supplierAccount},
    {path: '/supplier/:sid/account/:id', name: 'supplierAccountEdit', component: supplierAccount},
    {path: '/supplier/:sid/user', name: 'supplierUserAdd', component: supplierUser},
    {path: '/supplier/:sid/user/:id', name: 'supplierUserEdit', component: supplierUser},
    {path: '/supplier/:sid/business', name: 'supplierBusiness', component: supplierBusiness},
  
    {path: '/field', name: 'fieldIndex', component: fieldIndex},
    {path: '/hotel', name: 'hotelIndex', component: hotelIndex},
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
