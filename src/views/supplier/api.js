/**
 * Created by yaneri on 16-11-17.
 */
import Vue from 'vue'
// create a single api instance for all server-side requests
const api = 'https://127.0.0.1:8080'

export function addSupplier(supplier) {
    Vue.http.post(api + '/supplier/', supplier).then(function ({body}) {
        router.push('/');
    });
}
