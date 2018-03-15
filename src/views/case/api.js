import Vue from 'vue'

export function fetchEnums(resource, callback) {
  Vue.http.get('/enums/' + resource).then(function ({body}) {
    callback(body);
  });
}


export function fetchCase(courseId, callback) {
  Vue.http.get('/ops/case/' + courseId).then(function ({body}) {
    callback(body);
  });
}

export function listCase(queryParams, callback) {
  Vue.http.get('/ops/case/', {params: queryParams}).then(function ({body}) {
    callback(body);
  });
}

export function updateCase(teacher, callback) {
  Vue.http.put('/ops/case/', teacher).then(function ({body}) {
    callback(body);
  });
}

export function addCase(teacher, callback) {
  Vue.http.post('/ops/case/', teacher).then(function ({body}) {
    callback(body);
  });
}
