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


export function fetchCase(courseId, callback) {
  Vue.http.get('/ops/case/' + courseId).then(function ({body}) {
    if (body._code == '000000') {
      callback(body);
    } else {
      alert(body._msg);
    }
  });
}

export function listCase(queryParams, callback) {
  Vue.http.get('/ops/case/', {params: queryParams}).then(function ({body}) {
    if (body._code == '000000') {
      callback(body);
    } else {
      alert(body._msg);
    }
  });
}

export function updateCase(teacher, callback) {
  Vue.http.put('/ops/case/', teacher).then(function ({body}) {
    if (body._code == '000000') {
      callback(body);
    } else {
      alert(body._msg);
    }
  });
}

export function addCase(teacher, callback) {
  Vue.http.post('/ops/case/', teacher).then(function ({body}) {
    if (body._code == '000000') {
      callback(body);
    } else {
      alert(body._msg);
    }
  });
}

export function listIndustry(callback) {
  Vue.http.get('/ops/industry/').then(function ({body}) {
    if (body._code == '000000') {
      callback(body);
    } else {
      alert(body._msg);
    }
  });
}

export function addIndustry(industry, callback) {
  Vue.http.post('/ops/industry/', industry).then(function ({body}) {
    if (body._code == '000000') {
      callback(body);
    } else {
      alert(body._msg);
    }
  });
}

export function updateIndustry(industry, callback) {
  Vue.http.put('/ops/industry/', industry).then(function ({body}) {
    if (body._code == '000000') {
      callback(body);
    } else {
      alert(body._msg);
    }
  });
}

export function deleteIndustry(id, callback) {
  Vue.http.delete('/ops/industry/' + id).then(function ({body}) {
    if (body._code == '000000') {
      callback(body);
    } else {
      alert(body._msg);
    }
  });
}