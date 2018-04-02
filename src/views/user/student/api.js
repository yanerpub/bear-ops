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
export function listStudent(queryParams, callback) {
  Vue.http.get('/ops/student/', {params: queryParams}).then(function ({body}) {
    if (body._code == '000000') {
      callback(body);
    } else {
      alert(body._msg);
    }
  });
}

export function updateStudent(teacher, callback) {
  Vue.http.put('/ops/student/', teacher).then(function ({body}) {
    if (body._code == '000000') {
      callback(body);
    } else {
      alert(body._msg);
    }
  });
}

export function listStudentCourse(userId, queryParams, callback) {
  Vue.http.get('/ops/student/' + userId + '/courses', {params: queryParams}).then(function ({body}) {
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