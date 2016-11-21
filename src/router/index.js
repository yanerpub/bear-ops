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
        {path: '/', component: index},
        {path: '/tree', component: tree},
        {path: '/supplier', component: supplierIndex},
        {path: '/supplier/add', component: supplierAdd},
        {path: '/supplier/:id', component: supplierView},
        {path: '/supplier/:id/edit', component: supplierEdit},
        {path: '/hotel', component: hotelIndex},
        {path: '/hotel/:sid', component: hotelSupplier},
        {path: '/hotel/:sid/add', component: hotelProductAdd},
        {path: '/hotel/:sid/:id', component: hotelProductView},
        {path: '/hotel/:sid/:id/edit', component: hotelProductEdit},
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
