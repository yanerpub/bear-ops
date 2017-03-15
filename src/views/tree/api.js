import Vue from 'vue'

export function fetchEnums(resource, callback) {
  Vue.http.get('/enums/' + resource).then(function ({body}) {
    callback(body);
  });
}

export function fetchTree(callback) {
  Vue.http.get('/tree/').then(function ({body}) {
    callback(body);
  });
}

export function fetchWorkflow(treeId, callback) {
  Vue.http.get('/tree/' + treeId + '/workflow').then(function ({body}) {
    callback(body);
  });
}

export function fetchContract(treeId, callback) {
  Vue.http.get('/tree/' + treeId + '/contract').then(function ({body}) {
    callback(body);
  });
}

export function listField(treeId, callback) {
  Vue.http.get('/tree/' + treeId + '/field/').then(function ({body}) {
    callback(body);
  });
}

export function addField(treeId, field, callback) {
  Vue.http.post('/tree/' + treeId + '/field/', field).then(function ({body}) {
    callback(body);
  });
}

export function updateField(treeId, field, callback) {
  Vue.http.put('/tree/' + treeId + '/field/', field).then(function ({body}) {
    callback(body);
  });
}