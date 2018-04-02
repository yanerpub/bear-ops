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
export function listTeacher(queryParams, callback) {
  Vue.http.get('/ops/teacher/', {params: queryParams}).then(function ({body}) {
    if (body._code == '000000') {
      callback(body);
    } else {
      alert(body._msg);
    }
  });
}

export function addTeacher(teacher, callback) {
  Vue.http.post('/ops/teacher/', teacher).then(function ({body}) {
    if (body._code == '000000') {
      callback(body);
    } else {
      alert(body._msg);
    }
  });
}

export function updateTeacher(teacher, callback) {
  Vue.http.put('/ops/teacher/', teacher).then(function ({body}) {
    if (body._code == '000000') {
      callback(body);
    } else {
      alert(body._msg);
    }
  });
}

export function listTeacherCourse(userId, queryParams, callback) {
  Vue.http.get('/ops/teacher/' + userId + '/courses', {params: queryParams}).then(function ({body}) {
    if (body._code == '000000') {
      callback(body);
    } else {
      alert(body._msg);
    }
  });
}

export function listTeacherStudent(userId, queryParams, callback) {
  Vue.http.get('/ops/teacher/' + userId + '/students', {params: queryParams}).then(function ({body}) {
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