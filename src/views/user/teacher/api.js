import Vue from 'vue'

export function fetchEnums(resource, callback) {
  Vue.http.get('/enums/' + resource).then(function ({body}) {
    callback(body);
  });
}
export function listTeacher(queryParams, callback) {
  Vue.http.get('/ops/teacher/', {params: queryParams}).then(function ({body}) {
    callback(body);
  });
}

export function fetchTeacher(id, callback) {
  Vue.http.get('/ops/teacher/' + id).then(function ({body}) {
    callback(body);
  });
}

export function addTeacher(teacher, callback) {
  Vue.http.post('/ops/teacher/', teacher).then(function ({body}) {
    callback(body);
  });
}

export function updateTeacher(teacher, callback) {
  Vue.http.put('/ops/teacher/', teacher).then(function ({body}) {
    callback(body);
  });
}

export function listTeacherCourse(userId, queryParams, callback) {
  Vue.http.get('/ops/teacher/' + userId + '/courses', {params: queryParams}).then(function ({body}) {
    callback(body);
  });
}

export function listTeacherStudent(userId, queryParams, callback) {
  Vue.http.get('/ops/teacher/' + userId + '/students', {params: queryParams}).then(function ({body}) {
    callback(body);
  });
}