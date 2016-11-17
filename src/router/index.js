import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

import index from '../views/index.vue';

import supplierIndex from '../views/supplier/index.vue';
import supplierAdd from '../views/supplier/add.vue';
import supplierDetail from '../views/supplier/detail.vue';
import supplierEdit from '../views/supplier/edit.vue';
import supplierList from '../views/supplier/list.vue';


export default new Router({
    mode: 'history',
    routes: [
        {
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
                    path: 'product', component: supplierIndex,
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
        },
        {path: '*', redirect: '/'}
    ]
})
