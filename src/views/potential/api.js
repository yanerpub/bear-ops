import Vue from 'vue'

export function listPotential(queryParams, callback) {
  Vue.http.get('/potential/', {params: queryParams}).then(function ({body}) {
    callback(body);
  });
}

export function fetchPotentialEnums(callback) {
  Vue.http.get('/enums/potential').then(function ({body}) {
    callback(body);
  });
}

export function addPotential(potential, callback) {
  Vue.http.post('/potential/', potential).then(function ({body}) {
    callback(body);
  });
}

export function fetchPotential(id, callback) {
  Vue.http.get('/potential/' + id).then(function ({body}) {
    callback(body);
  });
}

export function updatePotential(potential, callback) {
  Vue.http.put('/potential/', potential).then(function ({body}) {
    callback(body);
  });
}

export function updatePotentialState(id, state, callback) {
  Vue.http.put('/potential/' + id + '/state', state).then(function ({body}) {
    callback(body);
  });
}

export function transfer(id, obj, callback) {
  Vue.http.post('/potential/' + id + '/transfer', obj).then(function ({body}) {
    callback(body);
  });
}