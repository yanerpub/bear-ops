import Vue from 'vue'

export function fetchEnums(resource, callback) {
  Vue.http.get('/enums/' + resource).then(function ({body}) {
    callback(body);
  });
}
export function listNotice(queryParams, callback) {
  Vue.http.get('/ops/notice/', {params: queryParams}).then(function ({body}) {
    callback(body);
  });
}

export function addNotice(notice, callback) {
  Vue.http.post('/ops/notice/', notice).then(function ({body}) {
    callback(body);
  });
}

export function listUser(queryParams, callback) {
  Vue.http.get('/ops/user/', {params: queryParams}).then(function ({body}) {
    callback(body);
  });
}

export function fetchNotice(id, callback) {
  Vue.http.get('/ops/notice/' + id).then(function ({body}) {
    callback(body);
  });
}

export function fetchNoticeUser(id, queryParams, callback) {
  Vue.http.get('/ops/notice/' + id + '/user/', {params: queryParams}).then(function ({body}) {
    callback(body);
  });
}

export function deleteNotice(id, callback) {
  Vue.http.delete('/ops/notice/' + id).then(function ({body}) {
    callback(body);
  });
}