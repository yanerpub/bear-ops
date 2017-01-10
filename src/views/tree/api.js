import Vue from 'vue'

export function queryTree(callback) {
  Vue.http.get('/tree/').then(function ({body}) {
    callback(body);
  });
}

export function getTemplate(treeId, callback) {
  Vue.http.get('/template/' + treeId).then(function ({body}) {
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