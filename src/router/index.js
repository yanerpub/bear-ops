import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

import index from '../views/index.vue';

import supplierIndex from '../views/supplier/index.vue';
import supplierAdd from '../views/supplier/add.vue';
import supplierView from '../views/supplier/view.vue';
import supplierEdit from '../views/supplier/edit.vue';

import productTree from '../views/tree/ptree.vue';


export default new Router({
    mode: 'hash',
    saveScrollPosition: true,
    routes: [
        {path: '/', component: index},
        {path: '/productTree', component: productTree},
        {path: '/supplier', component: supplierIndex},
        {path: '/supplier/add', component: supplierAdd},
        {path: '/supplier/:id', component: supplierView},
        {path: '/supplier/:id/edit', component: supplierEdit},
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
        },*/
        {path: '*', redirect: '/'}
    ]
})
