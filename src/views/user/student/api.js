import Vue from 'vue'

export function fetchEnums(resource, callback) {
  Vue.http.get('/enums/' + resource).then(function ({body}) {
    callback(body);
  });
}
export function listStudent(queryParams, callback) {
  Vue.http.get('/ops/student/', {params: queryParams}).then(function ({body}) {
    callback(body);
  });
}

export function updateStudent(teacher, callback) {
  Vue.http.put('/ops/student/', teacher).then(function ({body}) {
    callback(body);
  });
}

export function listStudentCourse(userId, queryParams, callback) {
  Vue.http.get('/ops/student/' + userId + '/courses', {params: queryParams}).then(function ({body}) {
    callback(body);
  });
}