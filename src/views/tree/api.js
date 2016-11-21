import Vue from 'vue'
// create a single api instance for all server-side requests
export const API_ROOT = 'http://localhost:8088'

export function listField(treeId, callback) {
    Vue.http.get(API_ROOT + '/field/' + treeId).then(function ({body}) {
        callback(body);
    });
}

export function addField(supplier, callback) {
    Vue.http.post(API_ROOT + '/supplier/', supplier).then(function ({body}) {
        callback(body);
    });
}

export function updateField(supplier, callback) {
    Vue.http.put(API_ROOT + '/supplier/', supplier).then(function ({body}) {
        callback(body);
    });
}