import Vue from 'vue'

export function fetchEnums(resource, callback) {
  Vue.http.get('/enums/' + resource).then(function ({body}) {
    if (body._code == '000000') {
      callback(body);
    } else {
      alert(body._msg);
    }
  });
}

export function listOperator(queryParams, callback) {
  Vue.http.get('/ops/operator/', {params: queryParams}).then(function ({body}) {
    if (body._code == '000000') {
      callback(body);
    } else {
      alert(body._msg);
    }
  });
}

export function addOperator(teacher, callback) {
  Vue.http.post('/ops/operator/', teacher).then(function ({body}) {
    if (body._code == '000000') {
      callback(body);
    } else {
      alert(body._msg);
    }
  });
}

export function updateOperator(teacher, callback) {
  Vue.http.put('/ops/operator/', teacher).then(function ({body}) {
    if (body._code == '000000') {
      callback(body);
    } else {
      alert(body._msg);
    }
  });
}

export function fetchGroup(callback) {
  Vue.http.get('/ops/group/').then(function ({body}) {
    if (body._code == '000000') {
      callback(body);
    } else {
      alert(body._msg);
    }
  });
}

export function resetPassword(user, callback) {
  Vue.http.post('/ops/reset/', user).then(function ({body}) {
    if (body._code == '000000') {
      callback(body);
    } else {
      alert(body._msg);
    }
  });
}