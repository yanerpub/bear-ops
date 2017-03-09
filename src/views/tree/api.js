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

export function fetchNode(treeId, callback) {
  Vue.http.get('/tree/' + treeId + '/data').then(function ({body}) {
    callback(body);
  });
}
