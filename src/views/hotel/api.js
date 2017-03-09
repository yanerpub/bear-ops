import Vue from 'vue'

export function fetchTree(callback) {
  Vue.http.get('/tree/?tid=2').then(function ({body}) {
    callback(body);
  });
}

export function listField(tid, callback) {
  Vue.http.get('/field/?tid=' + tid).then(function ({body}) {
    callback(body);
  });
}

export function listSupplier(query, callback) {
  Vue.http.get('/supplier/', query).then(function ({body}) {
    callback(body);
  });
}

export function listProduct(queryParams, callback) {
  Vue.http.get('/product/', {params: queryParams}).then(function ({body}) {
    callback(body);
  });
}

export function addProduct(product, callback) {
  Vue.http.post('/product/', product).then(function ({body}) {
    callback(body);
  });
}

export function fetchProduct(productId, callback) {
  Vue.http.get('/product/' + productId).then(function ({body}) {
    callback(body);
  });
}

export function updateProduct(product, callback) {
  Vue.http.put('/product/', product).then(function ({body}) {
    callback(body);
  });
}