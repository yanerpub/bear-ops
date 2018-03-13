import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

import index from '../views/index.vue';

import resourceIndex from '../views/resource/index.vue';
import groupIndex from '../views/group/index.vue';
import operatorIndex from '../views/operator/index.vue';
import teacherApplyIndex from '../views/teacherApply/index.vue';


export default new Router({
  mode: 'hash',
  saveScrollPosition: true,
  routes: [
    {path: '/', name: 'home', component: index},
    {path: '/resource', name: 'resource', component: resourceIndex},
    {path: '/group', name: 'group', component: groupIndex},
    {path: '/operator', name: 'operator', component: operatorIndex},
    {path: '/teacherApply', name: 'teacherApply', component: teacherApplyIndex},
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
