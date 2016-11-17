import Vue from 'vue'
// create a single api instance for all server-side requests
export const API_ROOT = 'http://localhost:8088'

export function listSupplier(queryParams) {
    Vue.http.get(API_ROOT + '/supplier/', {params: queryParams}).then(function ({body}) {
        return body.data.list;
    });
}

export function addSupplier(supplier) {
    Vue.http.post(API_ROOT + '/supplier/', supplier).then(function ({body}) {
        router.push('/');
    });
}
