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

export function listCourse(queryParams, callback) {
  Vue.http.get('/ops/course/', {params: queryParams}).then(function ({body}) {
    if (body._code == '000000') {
      callback(body);
    } else {
      alert(body._msg);
    }
  });
}

export function fetchCourse(courseId, callback) {
  Vue.http.get('/ops/course/' + courseId).then(function ({body}) {
    if (body._code == '000000') {
      callback(body);
    } else {
      alert(body._msg);
    }
  });
}