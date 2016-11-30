import Vue from 'vue'

export function queryTree(callback) {
  Vue.http.get('/template/tree/').then(function ({body}) {
    callback(body);
  });
}

export function fetchTemplate(treeId, callback) {
  Vue.http.get('/template/' + treeId).then(function ({body}) {
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