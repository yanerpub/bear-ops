import Vue from 'vue'
// create a single api instance for all server-side requests
export const API_ROOT = 'http://localhost:8088'

export function queryTree(callback) {
    Vue.http.get(API_ROOT + '/tree/').then(function ({body}) {
        callback(body);
    });
}