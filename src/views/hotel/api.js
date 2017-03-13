import Vue from 'vue'

export function fetchEnums(resource, callback) {
  Vue.http.get('/enums/' + resource).then(function ({body}) {
    callback(body);
  });
}

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

export function listContract(tid, callback) {
  Vue.http.get('/tree/' + tid + '/contract').then(function ({body}) {
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

export function listAccount(sid, callback) {
  Vue.http.get('/supplier/' + sid + '/account').then(function ({body}) {
    callback(body);
  });
}


export function addField(field, callback) {
  Vue.http.post('/field/', field).then(function ({body}) {
    callback(body);
  });
}

export function updateField(field, callback) {
  Vue.http.put('/field/', field).then(function ({body}) {
    callback(body);
  });
}


export function listStore(queryParams, callback) {
  Vue.http.get('/store/', {params: queryParams}).then(function ({body}) {
    callback(body);
  });
}

export function addStore(store, callback) {
  Vue.http.post('/store/', store).then(function ({body}) {
    callback(body);
  });
}

export function updateStore(store, callback) {
  Vue.http.put('/store/', store).then(function ({body}) {
    callback(body);
  });
}

export function listRoom(seq, callback) {
  Vue.http.get('/store/' + seq + '/room/').then(function ({body}) {
    callback(body);
  });
}

export function addRoom(seq, room, callback) {
  Vue.http.post('/store/' + seq + '/room/', room).then(function ({body}) {
    callback(body);
  });
}

export function updateRoom(seq, room, callback) {
  Vue.http.put('/store/' + seq + '/room/', room).then(function ({body}) {
    callback(body);
  });
}

export function listSku(id, callback) {
  Vue.http.get('/product/' + id + '/sku/').then(function ({body}) {
    callback(body);
  });
}

export function addSku(id, sku, callback) {
  Vue.http.post('/product/' + id + '/sku/', sku).then(function ({body}) {
    callback(body);
  });
}

export function updateSku(id, sku, callback) {
  Vue.http.put('/product/' + id + '/sku/', sku).then(function ({body}) {
    callback(body);
  });
}