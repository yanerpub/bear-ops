import Vue from 'vue'

export function fetchEnums(resource, callback) {
  Vue.http.get('/enums/' + resource).then(function ({body}) {
    callback(body);
  });
}

export function listOperator(queryParams, callback) {
  Vue.http.get('/ops/operator/', {params: queryParams}).then(function ({body}) {
    callback(body);
  });
}

export function addOperator(teacher, callback) {
  Vue.http.post('/ops/operator/', teacher).then(function ({body}) {
    callback(body);
  });
}

export function updateOperator(teacher, callback) {
  Vue.http.put('/ops/operator/', teacher).then(function ({body}) {
    callback(body);
  });
}

export function fetchGroup(callback) {
  Vue.http.get('/ops/group/').then(function ({body}) {
    callback(body);
  });
}