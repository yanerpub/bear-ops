import Vue from 'vue'

export function fetchEnums(resource, callback) {
  Vue.http.get('/enums/' + resource).then(function ({body}) {
    callback(body);
  });
}

export function listCourse(queryParams, callback) {
  Vue.http.get('/ops/course/', {params: queryParams}).then(function ({body}) {
    callback(body);
  });
}

export function fetchCourse(courseId, callback) {
  Vue.http.get('/ops/course/' + courseId).then(function ({body}) {
    callback(body);
  });
}