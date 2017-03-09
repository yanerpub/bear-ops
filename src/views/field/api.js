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