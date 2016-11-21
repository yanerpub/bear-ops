import Vue from 'vue'
// create a single api instance for all server-side requests
export const API_ROOT = 'http://localhost:8088'

export function listProduct(queryParams, callback) {
    Vue.http.get(API_ROOT + '/hotel/', {params: queryParams}).then(function ({body}) {
        callback(body);
    });
}

export function addProduct(supplier, callback) {
    Vue.http.post(API_ROOT + '/hotel/', supplier).then(function ({body}) {
        callback(body);
    });
}

export function detail(sid, callback) {
    Vue.http.get(API_ROOT + '/hotel/' + sid).then(function ({body}) {
        callback(body);
    });
}

export function updateProduct(supplier, callback) {
    Vue.http.put(API_ROOT + '/hotel/', supplier).then(function ({body}) {
        callback(body);
    });
}