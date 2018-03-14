import Vue from 'vue'

export function fetchEnums(resource, callback) {
  Vue.http.get('/enums/' + resource).then(function ({body}) {
    callback(body);
  });
}

export function listApply(queryParams, callback) {
  Vue.http.get('/ops/teacherApply/', {params: queryParams}).then(function ({body}) {
    callback(body);
  });
}

export function handleApply(apply, callback) {
  Vue.http.put('/ops/teacherApply/', apply).then(function ({body}) {
    callback(body);
  });
}
