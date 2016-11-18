import Vue from 'vue'
// create a single api instance for all server-side requests
export const API_ROOT = 'http://localhost:8088'

export function listSupplier(queryParams, callback) {
    Vue.http.get(API_ROOT + '/supplier/', {params: queryParams}).then(function ({body}) {
        callback(body);
    });
}

export function addSupplier(supplier, callback) {
    Vue.http.post(API_ROOT + '/supplier/', supplier).then(function ({body}) {
        callback(body);
    });
}

export function detail(sid, callback) {
    Vue.http.get(API_ROOT + '/supplier/' + sid).then(function ({body}) {
        callback(body);
    });
}

export function updateSupplier(supplier, callback) {
    Vue.http.put(API_ROOT + '/supplier/', supplier).then(function ({body}) {
        callback(body);
    });
}