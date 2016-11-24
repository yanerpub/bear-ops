import Vue from 'vue'
// create a single api instance for all server-side requests
export const API_ROOT = 'http://localhost:8088'

export function queryTree(callback) {
    Vue.http.get(API_ROOT + '/template/tree/').then(function ({body}) {
        callback(body);
    });
}

export function fetchTemplate(treeId, callback) {
    Vue.http.get(API_ROOT + '/template/' + treeId).then(function ({body}) {
        callback(body);
    });
}

export function listProduct(queryParams, callback) {
    Vue.http.get(API_ROOT + '/product/', {params: queryParams}).then(function ({body}) {
        callback(body);
    });
}

export function addProduct(product, callback) {
    Vue.http.post(API_ROOT + '/product/', product).then(function ({body}) {
        callback(body);
    });
}

export function fetchProduct(productId, callback) {
    Vue.http.get(API_ROOT + '/product/' + productId).then(function ({body}) {
        callback(body);
    });
}

export function updateProduct(product, callback) {
    Vue.http.put(API_ROOT + '/product/', product).then(function ({body}) {
        callback(body);
    });
}