import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

import index from '../views/index.vue';

import treeIndex from '../views/tree/index.vue';

import potential from '../views/potential/index.vue';
import potentialView from '../views/potential/view.vue';
import potentialInput from '../views/potential/input.vue';

import supplier from '../views/supplier/index.vue';
import supplierView from '../views/supplier/view.vue';
import supplierInput from '../views/supplier/input.vue';
import supplierAptitude from '../views/supplier/aptitude.vue';
import supplierContact from '../views/supplier/contact.vue';
import supplierAccount from '../views/supplier/account.vue';
import supplierUser from '../views/supplier/user.vue';
import supplierBusiness from '../views/supplier/business.vue';

import hotelIndex from '../views/hotel/index.vue';
import hotelField from '../views/hotel/field.vue';

import hotelStore from '../views/hotel/store.vue';
import hotelStoreRoom from '../views/hotel/room.vue';

import hotelSupplier from '../views/hotel/supplier.vue';
import hotelProductView from '../views/hotel/view.vue';
import hotelProductInput from '../views/hotel/input.vue';
import hotelProductSku from '../views/hotel/sku.vue';


export default new Router({
  mode: 'hash',
  saveScrollPosition: true,
  routes: [
    {path: '/', name: 'home', component: index},
    {path: '/tree', name: 'tree', component: treeIndex},
    
    {path: '/potential', name: 'potentialIndex', component: potential},
    {path: '/potential/add', name: 'potentialAdd', component: potentialInput},
    {path: '/potential/:id', name: 'potentialView', component: potentialView},
    {path: '/potential/:id/edit', name: 'potentialEdit', component: potentialInput},
    
    {path: '/supplier', name: 'supplierIndex', component: supplier},
    {path: '/supplier/add', name: 'supplierAdd', component: supplierInput},
    {path: '/supplier/:sid', name: 'supplierView', component: supplierView},
    {path: '/supplier/:sid/edit', name: 'supplierEdit', component: supplierInput},
    {path: '/supplier/:sid/aptitude', name: 'supplierAptitudeAdd', component: supplierAptitude},
    {path: '/supplier/:sid/aptitude/:id', name: 'supplierAptitudeEdit', component: supplierAptitude},
    {path: '/supplier/:sid/contact', name: 'supplierContactAdd', component: supplierContact},
    {path: '/supplier/:sid/contact/:id', name: 'supplierContactEdit', component: supplierContact},
    {path: '/supplier/:sid/account', name: 'supplierAccountAdd', component: supplierAccount},
    {path: '/supplier/:sid/account/:id', name: 'supplierAccountEdit', component: supplierAccount},
    {path: '/supplier/:sid/user', name: 'supplierUserAdd', component: supplierUser},
    {path: '/supplier/:sid/user/:id', name: 'supplierUserEdit', component: supplierUser},
    {path: '/supplier/:sid/business', name: 'supplierBusiness', component: supplierBusiness},
  
    {path: '/hotel', name: 'hotelIndex', component: hotelIndex},
    {path: '/hotel/field', name: 'hotelField', component: hotelField},
    
    {path: '/hotel/store', name: 'hotelStore', component: hotelStore},
    {path: '/hotel/store/:seq/room', name: 'hotelStoreRoom', component: hotelStoreRoom},
    
    {path: '/hotel/:sid', name: 'hotelSupplier', component: hotelSupplier},
    {path: '/hotel/:sid/add', name: 'hotelProductAdd', component: hotelProductInput},
    {path: '/hotel/:sid/:id', name: 'hotelProduct', component: hotelProductView},
    {path: '/hotel/:sid/:id/edit', name: 'hotelProductEdit', component: hotelProductInput},
    {path: '/hotel/:sid/:id/sku', name: 'hotelProductSku', component: hotelProductSku},
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
