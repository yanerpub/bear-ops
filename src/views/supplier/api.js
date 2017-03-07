import Vue from 'vue'

export function listSupplier(queryParams, callback) {
  Vue.http.get('/supplier/', {params: queryParams}).then(function ({body}) {
    callback(body);
  });
}

export function addSupplier(supplier, callback) {
  Vue.http.post('/supplier/', supplier).then(function ({body}) {
    callback(body);
  });
}

export function fetchSupplier(sid, callback) {
  Vue.http.get('/supplier/' + sid).then(function ({body}) {
    callback(body);
  });
}

export function updateSupplier(supplier, callback) {
  Vue.http.put('/supplier/', supplier).then(function ({body}) {
    callback(body);
  });
}

export function fetchAptitude(sid, callback) {
  Vue.http.get('/supplier/' + sid + '/aptitude').then(function ({body}) {
    callback(body);
  });
}

export function fetchAptitudeEnums(callback) {
  Vue.http.get('/aptitude/enums').then(function ({body}) {
    callback(body);
  });
}

export function updateAptitude(aptitude, callback) {
  Vue.http.post('/aptitude/', aptitude).then(function ({body}) {
    callback(body);
  });
}