import Vue from 'vue'
// create a single api instance for all server-side requests
export const API_ROOT = 'http://localhost:8088'

export function queryTree(callback) {
    Vue.http.get(API_ROOT + '/tree/').then(function ({body}) {
        callback(body);
    });
}

export function listField(treeId, callback) {
    Vue.http.get(API_ROOT + '/field/' + treeId).then(function ({body}) {
        callback(body);
    });
}

export function addField(field, callback) {
    Vue.http.post(API_ROOT + '/field/', field).then(function ({body}) {
        callback(body);
    });
}

export function updateField(field, callback) {
    Vue.http.put(API_ROOT + '/field/', field).then(function ({body}) {
        callback(body);
    });
}