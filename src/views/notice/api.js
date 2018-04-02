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
export function listNotice(queryParams, callback) {
  Vue.http.get('/ops/notice/', {params: queryParams}).then(function ({body}) {
    if (body._code == '000000') {
      callback(body);
    } else {
      alert(body._msg);
    }
  });
}

export function addNotice(notice, callback) {
  Vue.http.post('/ops/notice/', notice).then(function ({body}) {
    if (body._code == '000000') {
      callback(body);
    } else {
      alert(body._msg);
    }
  });
}

export function listUser(queryParams, callback) {
  Vue.http.get('/ops/user/', {params: queryParams}).then(function ({body}) {
    if (body._code == '000000') {
      callback(body);
    } else {
      alert(body._msg);
    }
  });
}

export function fetchNotice(id, callback) {
  Vue.http.get('/ops/notice/' + id).then(function ({body}) {
    if (body._code == '000000') {
      callback(body);
    } else {
      alert(body._msg);
    }
  });
}

export function fetchNoticeUser(id, queryParams, callback) {
  Vue.http.get('/ops/notice/' + id + '/user/', {params: queryParams}).then(function ({body}) {
    if (body._code == '000000') {
      callback(body);
    } else {
      alert(body._msg);
    }
  });
}

export function deleteNotice(id, callback) {
  Vue.http.delete('/ops/notice/' + id).then(function ({body}) {
    if (body._code == '000000') {
      callback(body);
    } else {
      alert(body._msg);
    }
  });
}