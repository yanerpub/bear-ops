import Vue from 'vue'

export function fetchEnums(resource, callback) {
  Vue.http.get('/enums/' + resource).then(function ({body}) {
    callback(body);
  });
}

export function listGroup(queryParams, callback) {
  Vue.http.get('/ops/group/', {params: queryParams}).then(function ({body}) {
    callback(body);
  });
}

export function addGroup(group, callback) {
  Vue.http.post('/ops/group/', group).then(function ({body}) {
    callback(body);
  });
}

export function updateGroup(group, callback) {
  Vue.http.put('/ops/group/', group).then(function ({body}) {
    callback(body);
  });
}

export function fetchResource(callback) {
  Vue.http.get('/ops/resource/').then(function ({body}) {
    callback(body);
  });
}