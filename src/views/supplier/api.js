import Vue from 'vue'

export function listSupplier(queryParams, callback) {
    Vue.http.get('/supplier/', {params: queryParams}).then(function ({body}) {
        callback(body);
    });
}

export function addSupplier(supplier, callback) {
    Vue.http.post('/supplier/', supplier).then(function ({body}) {
        callback(body);
    });
}

export function fetchSupplier(sid, callback) {
    Vue.http.get('/supplier/' + sid).then(function ({body}) {
        callback(body);
    });
}

export function updateSupplier(supplier, callback) {
    Vue.http.put('/supplier/', supplier).then(function ({body}) {
        callback(body);
    });
}